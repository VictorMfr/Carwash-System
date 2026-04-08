import { Service, Recipe, Operator, Vehicle, StockDetails, Client, Stock, Product, Account, Transaction } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";
import RecipeStockDetails from "@/services/backend/models/service/recipeStockDetails";
import ServiceStockDetails from "@/services/backend/models/service/serviceStockDetails";

const createService = async (body: any) => {
    const { date, dollar_rate, bol_charge, dollar_charge } = body;

    /*
        1. Obtener el monto ya sea en bolivares o en dolares y almacenar en bol_charge
        2. Modificar la fecha dd/mm/yyyy a un formato valido para la Base de datos (debe ser tipo Date)
        3. Crear el servicio 
    */

    // 1. Obtener el monto ya sea en bolivares o en dolares y almacenar en bol_charge
    const bolCharge = dollar_charge ? Number(dollar_charge) * Number(dollar_rate) : Number(bol_charge);

    // 2. Modificar la fecha dd/mm/yyyy a un formato valido para la Base de datos (debe ser tipo Date)
    const [day, month, year] = (date as string).split('-');
    const formattedDate = new Date(Number(year), Number(month) - 1, Number(day));

    // 3. Crear el servicio
    const service = await Service.create({
        date: formattedDate,
        dollar_rate,
        bol_charge: bolCharge,
        status: 'Pendiente',
    });

    return service;
}

const mapServiceResponse = (service: Service) => {
    const recipeName = service.Recipe?.name ?? '';
    const products = service.StockDetails ?? [];
    const vehiclePlate = service.Vehicle?.license_plate ?? null;
    const dollarRate = service.dollar_rate ?? null;
    const bolCharge = service.bol_charge ?? null;
    const clientName = service.Vehicle?.Client ? `${service.Vehicle.Client.name} ${service.Vehicle.Client.lastname}` : null;

    return {
        id: service.id,
        date: service.date,
        operators: service.Operators ?? [],
        recipeName: { name: recipeName, products },
        dollar_rate: dollarRate,
        bol_charge: bolCharge,
        status: service.status,
        vehicleLicensePlate: vehiclePlate,
        dollar_charge: dollarRate ? Number(bolCharge) / Number(dollarRate) : null,
        client: clientName
    };
};

const associateRecipe = async (service: Service, body: any) => {
    /*
        1. Obtener la receta de body.recipeName.selectedRecipe
        2. Asociar la receta al servicio
    */

    // 1. Obtener la receta de body.recipeName.selectedRecipe
    const recipe = body.recipeName.selectedRecipe.id;

    // 2. Asociar la receta al servicio
    await service.setRecipe(recipe);

    console.log('RECEPTE ASOCIADA AL SERVICIO EXITOSAMENTE')
}

const associateOperators = async (service: Service, body: any) => {
    /*
        1. Obtener los operadores de body.operators
        2. Asociar los operadores al servicio
    */

    // 1. Obtener los operadores de body.operators
    const operators = body.operators.map((operator: any) => operator.id);

    // 2. Asociar los operadores al servicio
    await service.setOperators(operators);

    console.log('OPERADORES ASOCIADOS AL SERVICIO EXITOSAMENTE')
}

const associateVehicle = async (service: Service, body: any) => {
    /*
        1. Obtener el vehiculo de body.vehicleLicensePlate
        2. Asociar el vehiculo al servicio
    */

    // 1. Obtener el vehiculo de body.vehicleLicensePlate
    const vehicle = body.vehicleLicensePlate.id;

    // 2. Asociar el vehiculo al servicio
    await service.setVehicle(vehicle);

    console.log('VEHICULO ASOCIADO AL SERVICIO EXITOSAMENTE')
}

const reduceStockDetails = async (body: any) => {
    const items = body.recipeName.products;


    // - Comprobar que haya suficiente cantidad en el inventario
    for (const item of items) {

        const stockDetailsId = item.product.id;
        const stockId = (await StockDetails.findByPk(stockDetailsId))?.StockId;
        const quantityUsed = item.quantity;
        const quantityActual = await StockDetails.sum('quantity', { where: { StockId: stockId } });
        const quantityDifference = item.product.isTool? quantityActual: quantityActual - quantityUsed;

        console.log('ITEM EN CUESTION: ', item.product.name);
        console.log('CANTIDAD USADA', quantityUsed);
        console.log('CANTIDAD ACTUAL', quantityActual);
        console.log('CANTIDAD DIFERENCIA', quantityDifference);


        if (quantityDifference < 0) {
            return NextResponse.json({ error: 'No hay suficiente cantidad en el inventario' }, { status: 400 });
        }
    }

    console.log('HAY SUFICIENTE CANTIDAD EN EL INVENTARIO, PROCEDIENDO A REDUCIR INVENTARIO...');

    // 2. Actualizar el inventario de los stock details
    for (const item of items) {
        const stockDetailsId = item.product.id;
        const stockId = (await StockDetails.findByPk(stockDetailsId))?.StockId;
        const quantityUsed = item.quantity;
        const quantityActual = await StockDetails.sum('quantity', { where: { StockId: stockId } });
        const quantityDifference = item.product.isTool? quantityActual: quantityActual - quantityUsed;

        console.log('CANTIDAD USADA', quantityUsed);
        console.log('CANTIDAD ACTUAL', quantityActual);
        console.log('CANTIDAD DIFERENCIA', quantityDifference);
        console.log('ES UNA HERRAMIENTA', item.product.isTool);

        await StockDetails.update({
            quantity: quantityDifference
        }, {
            where: {
                id: item.product.id,
            }
        });
    }

    console.log('INVENTARIO REDUCIDO EXITOSAMENTE')
}

const saveStockDetailsInRecipe = async (service: Service, body: any) => {
    /*
        1. Obtener los productos de recipeName.products
        2. Verificar si el stock detail ya existe en la receta
        2.1. Se debe obtener los stock details de la receta
        2.2. Se debe comparar el stockDetails obtenidos desde el body con los stockDetails obtenidos en la receta
        2.2.1. Si el stockDetail ya existe en la receta, se debe actualizar la cantidad
        2.2.2. Si el stockDetail no existe en la receta, se debe crear
        3. Se debe guardar los stock details en la receta para futuras referencias
    */

    // 1. Obtener los productos de recipeName.products
    const products = body.recipeName.products;

    // 2. Guardar los stock details en la receta para futuras referencias
    // 2.1. Se debe obtener los stock details de la receta
    const recipe = body.recipeName.selectedRecipe;
    const recipeStockDetails = await RecipeStockDetails.findAll({ where: { recipeId: recipe.id } });

    // 2.2. Se debe comparar el stockDetails obtenidos desde el body con los stockDetails obtenidos en la receta
    const stockDetailsToAdd = [];
    const stockDetailsToUpdate = [];

    for (const product of products) {
        const stockDetail = product.product.id;
        const quantity = product.quantity;

        const existingStockDetail = recipeStockDetails.find((r: any) => r.stockDetailId === stockDetail);

        if (existingStockDetail) {
            stockDetailsToUpdate.push({ id: existingStockDetail.id, quantity: quantity });
        } else {
            stockDetailsToAdd.push({ stockDetailId: stockDetail, quantity: quantity });
        }
    }


    // 3. Se debe guardar los stock details en la receta para futuras referencias
    for (const stockDetail of stockDetailsToAdd) {
        await RecipeStockDetails.create({
            recipeId: recipe.id,
            stockDetailId: stockDetail.stockDetailId,
            quantity: stockDetail.quantity
        });
    }

    for (const stockDetail of stockDetailsToUpdate) {
        await RecipeStockDetails.update({ quantity: stockDetail.quantity }, { where: { id: stockDetail.id } });
    }

    console.log('STOCK DETAILS GUARDADOS EN LA RECEPTE EXITOSAMENTE')
}

const saveStockDetailsInService = async (service: Service, body: any) => {
    /*
        1. Obtener los productos de recipeName.products
        2. Guardar los stock details en el servicio
    */

    // 1. Obtener los productos de recipeName.products
    const products = body.recipeName.products;


    // 2. Guardar los stock details en el servicio
    for (const product of products) {
        await ServiceStockDetails.create({
            serviceId: service.id,
            stockDetailId: product.product.id,
            quantity: product.quantity
        });
    }

    console.log('STOCK DETAILS GUARDADOS EN EL SERVICIO EXITOSAMENTE')
}

// Crear servicio
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Crear servicio
        const service = await createService(body); // Si funciona

        // 2. Asociar receta, operadores y vehiculo
        await associateRecipe(service, body); // Si funciona
        await associateOperators(service, body); // Si funciona
        await associateVehicle(service, body); // Si funciona

        // 3. Reducir inventario de los stock details
        await reduceStockDetails(body);

        // 4. Guardar los stock details en la receta para futuras referencias
        await saveStockDetailsInRecipe(service, body);

        // 5. Guardar los stock details en el servicio
        await saveStockDetailsInService(service, body);

        const createdService = await Service.findByPk(service.id, {
            include: [
                { model: Recipe, as: 'Recipe' },
                { model: Vehicle, as: 'Vehicle' },
                { model: Operator, as: 'Operators' },
                { model: StockDetails, as: 'StockDetails' },
                { model: Transaction, as: 'Transactions' },
            ],
        });

        if (!createdService) {
            return NextResponse.json({ error: 'Service not found after creation' }, { status: 500 });
        }

        return NextResponse.json(mapServiceResponse(createdService));

    } catch (error) {
        console.log('ERROR AL CREAR EL SERVICIO', error);
        handleServerError(error);
    }
}

// Obtener servicios
export async function GET() {
    try {
        const services = await Service.findAll({
            include: [
                { model: Recipe, as: 'Recipe' },
                { model: Vehicle, as: 'Vehicle', include: [{ model: Client, as: 'Client' }] },
                { model: Operator, as: 'Operators' },
                { model: StockDetails, as: 'StockDetails' },
                { model: Transaction, as: 'Transactions' },
            ],
        });

        const customServices = services.map(mapServiceResponse);

        return NextResponse.json(customServices);
    } catch (error) {
        return handleServerError(error);
    }
}
