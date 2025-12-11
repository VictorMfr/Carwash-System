import { Service, Recipe, Operator, Vehicle, StockDetails, Client, Stock, Product } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";
import RecipeStockDetails from "@/services/backend/models/service/recipeStockDetails";
import ServiceStockDetails from "@/services/backend/models/service/serviceStockDetails";
import db from "@/services/backend/db";

const createService = async (body: any, options?: any): Promise<Service> => {
    const formmatedDated = body.date.split('-');
    const formattedDate = new Date(Number(formmatedDated[2]), Number(formmatedDated[1]) - 1, Number(formmatedDated[0]));

    const service = await Service.create({
        date: formattedDate,
        bol_charge: body.bol_charge ? body.bol_charge : body.dollar_charge * body.dollar_rate,
        dollar_rate: body.dollar_rate,
        status: body.status
    }, options) as Service;

    return service;
}

// Extrae IDs de operadores desde distintos formatos de entrada
const extractOperatorIds = (raw: any): number[] => {
    if (!Array.isArray(raw)) return [];

    return raw
        .map((op: any) => {
            if (op == null) return undefined;

            // Si ya viene como número
            if (typeof op === "number" && Number.isFinite(op)) return op;

            // Si viene como string numérico
            if (typeof op === "string" && op.trim() !== "" && !Number.isNaN(Number(op))) {
                return Number(op);
            }

            // Si viene como objeto { id } o { value }
            if (typeof op === "object") {
                if (typeof op.id === "number" && Number.isFinite(op.id)) return op.id;
                if (typeof op.value === "number" && Number.isFinite(op.value)) return op.value;
                if (typeof op.value === "string" && op.value.trim() !== "" && !Number.isNaN(Number(op.value))) {
                    return Number(op.value);
                }
            }

            return undefined;
        })
        .filter((id): id is number => typeof id === "number" && Number.isFinite(id));
};

const setServiceAssociations = async (service: Service, body: any, options?: any): Promise<Service> => {
    await service.setRecipe(body.recipeName.id, options);

    const operatorIds = extractOperatorIds(body.operators);
    await service.setOperators(operatorIds, options);

    await service.setVehicle(body.vehicleLicensePlate.id, options);

    return service;
}

// app/api/service/route.ts
const setRecipeStockDetails = async (service: Service, body: any, options?: any): Promise<Recipe> => {
	const recipe = await Recipe.findByPk(body.recipeName.id, options);
	const cart = body.recipeName.cart || [];

	if (!recipe) {
		throw new Error('Recipe not found');
	}

	// Elimina TODAS las filas actuales del puente (paranoid => force: true)
	await RecipeStockDetails.destroy({ where: { recipeId: recipe.id }, force: true, ...options });

	// Recrea todo con IDs y cantidades normalizados
	if (cart.length) {
		const payload = cart.map((item: any) => {
			const stockDetailId =
				item?.product?.id ??     // formato desde /api/stock/details
				item?.StockDetails?.id ??// formato desde la última config de receta
				item?.stockDetailId;     // fallback

			const quantity = Number(
				item?.quantity ??         // formato del carrito
				item?.through?.quantity   // por si vino embebido
			);

			return {
				recipeId: recipe.id,
				stockDetailId,
				quantity
			};
		})
		// valida datos
		.filter((r: any) => r.stockDetailId && Number.isFinite(r.quantity) && r.quantity > 0);

		if (payload.length) {
			await RecipeStockDetails.bulkCreate(payload, options);
		}
	}

	return recipe;
}

const setOperators = async (service: Service, body: any, options?: any): Promise<Service> => {
    const operatorIds = extractOperatorIds(body.operators);
    await service.setOperators(operatorIds, options);
    return service;
}

// Normaliza el carrito a { stockDetailId, quantity }
const normalizeCart = (body: any) => {
	const cart = Array.isArray(body?.recipeName?.cart) ? body.recipeName.cart : [];
	return cart
		.map((item: any) => {
			const stockDetailId =
				item?.product?.id ??
				item?.StockDetails?.id ??
				item?.stockDetailId ??
				item?.id;
			const quantity = Number(
				item?.product?.quantity ??
				item?.quantity ??
				item?.through?.quantity
			);
			return { stockDetailId, quantity };
		})
		.filter((r: any) => r.stockDetailId && Number.isFinite(r.quantity) && r.quantity > 0);
}

// Valida y descuenta inventario de StockDetails, dentro de una transacción y con bloqueo de fila
const validateAndDeductStock = async (normalizedCart: Array<{ stockDetailId: number, quantity: number }>, options: { transaction: any }) => {
	if (!normalizedCart.length) return;

	// Agrupa por stockDetailId sumando cantidades solicitadas
	const aggregated = normalizedCart.reduce((acc: Record<number, number>, item) => {
		acc[item.stockDetailId] = (acc[item.stockDetailId] || 0) + item.quantity;
		return acc;
	}, {});

	const ids = Object.keys(aggregated).map(id => Number(id));

	// Bloquea filas para actualización durante la transacción
	const stockRows = await StockDetails.findAll({
		where: { id: ids },
		transaction: options.transaction,
		lock: true
	});

	// Verifica disponibilidad
	for (const row of stockRows) {
		const requested = aggregated[row.id] || 0;
		if (requested > row.quantity) {
			throw new Error(`Cantidad insuficiente en inventario para el detalle de stock #${row.id}. Disponible: ${row.quantity}, solicitado: ${requested}.`);
		}
	}

	// Descuenta cantidades
	for (const row of stockRows) {
		const requested = aggregated[row.id] || 0;
		if (requested > 0) {
			row.quantity = row.quantity - requested;
			await row.save({ transaction: options.transaction });
		}
	}
}

const createServiceStockLinks = async (service: Service, normalizedCart: Array<{ stockDetailId: number, quantity: number }>, options?: any) => {
	if (!normalizedCart.length) return;
	const payload = normalizedCart.map(item => ({
		serviceId: service.id,
		stockDetailId: item.stockDetailId,
		quantity: item.quantity
	}));
	await ServiceStockDetails.bulkCreate(payload, options);
	return service;
}

// Crear servicio
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validación adicional del backend: asegurar al menos un operador válido
        const operatorIds = extractOperatorIds(body?.operators);
        if (!operatorIds.length) {
            return NextResponse.json(
                { error: 'Los operadores son requeridos para crear un servicio' },
                { status: 400 }
            );
        }

        // Transacción para asegurar atomicidad en validación/descuento/creación
        const transaction = await db.transaction();
        try {
            // 1) Normaliza y valida/descuenta inventario primero (bloquea el proceso si no hay stock)
            const normalizedCart = normalizeCart(body);
            await validateAndDeductStock(normalizedCart, { transaction });

            // 2) Crea el servicio y asocia entidades dentro de la misma transacción
            const service = await createService(body, { transaction });
            await setServiceAssociations(service, body, { transaction });
            await setRecipeStockDetails(service, body, { transaction });
            await setOperators(service, body, { transaction });
            await createServiceStockLinks(service, normalizedCart, { transaction });

            await transaction.commit();

            const dollarCharge = service.dollar_rate ? Number(service.bol_charge) / Number(service.dollar_rate) : null;
            const client = await Client.findByPk(body.vehicleLicensePlate.clientId);
            
            const reponse = {
                ...service.toJSON(),
                dollar_charge: dollarCharge,
                recipeName: body.recipeName.name,
                client: `${client?.name} ${client?.lastname}`,
                vehicleLicensePlate: body.vehicleLicensePlate.license_plate,
                operators: body.operators,
            }

            return NextResponse.json(reponse);
        } catch (innerError: any) {
            await (transaction?.rollback?.() ?? Promise.resolve());
            // Propaga para manejo común
            throw innerError;
        }

    } catch (error) {
        console.log(error);
        // Devuelve 400 si es un error de validación de inventario
        const message = (error as any)?.message || 'Error creating service';
        const isStockError = typeof message === 'string' && message.toLowerCase().includes('insuficiente');
        if (isStockError) {
            return NextResponse.json({ error: message }, { status: 400 });
        }
        return handleServerError(error);
    }
}

// Obtener servicios
export async function GET() {
    try {
        const services = await Service.findAll({
            include: [
                { model: Recipe, as: 'Recipe' },
                { model: Operator, as: 'Operators' },
                { model: Vehicle, as: 'Vehicle', include: [{ model: Client, as: 'Client' }] },
                {
                    model: StockDetails,
                    as: 'StockDetails',
                    include: [
                        {
                            model: Stock,
                            as: 'Stock',
                            include: [{ model: Product, as: 'Product' }]
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        });

        // Transformar los datos para incluir campos directos
        const transformedServices = services.map(service => {
            const json = service.toJSON() as any;
            const extras = (json.StockDetails ?? []).map((sd: any) => ({
                id: sd.id,
                productId: sd.Stock?.Product?.id ?? null,
                product: sd.Stock?.Product?.name ?? null,
                quantity: sd.quantity,
                entry_date: sd.entry_date
            }));

            return {
                ...json,
                recipeName: service.Recipe?.name,
                dollar_rate: service.dollar_rate,
                bol_charge: service.bol_charge,
                // Derivar dollar_charge para el cliente (solo lectura)
                dollar_charge: service.dollar_rate ? Number(service.bol_charge) / Number(service.dollar_rate) : null,
                status: service.status,
                vehicleLicensePlate: service.Vehicle?.license_plate,
                client: `${service.Vehicle?.Client?.name} ${service.Vehicle?.Client?.lastname}`,
                operators: service.Operators?.map(op => ({
                    id: op.id,
                    name: op.name,
                    lastname: op.lastname,
                    phoneNumber: op.phone,
                    address: op.address,
                })) || [],
                extras
            };
        });

        return NextResponse.json(transformedServices);
    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}
