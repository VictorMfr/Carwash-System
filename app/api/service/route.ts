import { Service, Recipe, Operator, Vehicle, StockDetails, Client, Stock, Product, Account, Transaction } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { handleServerError } from "@/lib/error";
import RecipeStockDetails from "@/services/backend/models/service/recipeStockDetails";
import ServiceStockDetails from "@/services/backend/models/service/serviceStockDetails";
import db from "@/services/backend/db";
import { Op, Sequelize } from "sequelize";
import { getFinanceSettings } from "@/services/backend/config/settings";
import { client } from "@/components/Vehicle/config/vehicleDatagrid/columns/fields/client";

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

const reduceStockDetails = async (service: Service, body: any) => {
    /*
        - Los productos se encuentran en recipeName.products
        - La cantidad usada por producto se encuentra en recipeName.products[x].quantity
        - El producto como tal se encuentra en recipeName.products[x].product

        1. Obtener los productos de recipeName.products
        2. Actualizar el inventario de los stock details

    */

    // 1. Obtener los productos de recipeName.products
    const products = body.recipeName.products;

    /*
        - Cantidad usada esta en recipeName.products[x].quantity
        - Cantidad actual esta en recipeName.products[x].product.quantity
        - Se debe restar la cantidad usada a la cantidad actual
        - Se debe comprobar que haya suficiente cantidad en el inventario
           - Si hay suficiente cantidad, se debe restar la cantidad usada a la cantidad actual
           - Si no hay suficiente cantidad, se debe devolver un error
        2. Actualizar el inventario de los stock details
    */

    // - Comprobar que haya suficiente cantidad en el inventario
    for (const product of products) {
        const quantityUsed = product.quantity;
        const quantityActual = product.product.quantity;
        const quantityDifference = quantityActual - quantityUsed;

        if (quantityDifference < 0) {
            return NextResponse.json({ error: 'No hay suficiente cantidad en el inventario' }, { status: 400 });
        }
    }

    // 2. Actualizar el inventario de los stock details
    for (const product of products) {
        const quantityUsed = product.quantity;
        const quantityActual = product.product.quantity;
        const quantityDifference = quantityActual - quantityUsed;

        await StockDetails.update({
            quantity: quantityDifference
        }, {
            where: {
                id: product.product.id,
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

        console.log('ESTE ES EL BODY', body);

        /*
            1. Crear servicio
            2. Asociar receta, operadores y vehiculo
            3. Reducir inventario de los stock details
            4. Guardar los stock details en la receta para futuras referencias
            5. Guardar los stock details en el servicio
            6. Crear transaccion de pago
            7. Enviar respuesta al cliente
        */

        // 1. Crear servicio
        const service = await createService(body); // Si funciona

        // 2. Asociar receta, operadores y vehiculo
        await associateRecipe(service, body); // Si funciona
        await associateOperators(service, body); // Si funciona
        await associateVehicle(service, body); // Si funciona

        // 3. Reducir inventario de los stock details
        await reduceStockDetails(service, body);

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

        /*
            Se debe poder obtener los servicios con lo siguientes datos
            - id del servicio
            - fecha del servicio
            - operadores involucrados en el servicio
            - receta utilizada en el servicio
            - monto en dolares
            - monto en bolivares
            - tasa de cambio
            - estado del servicio (completado o pendiente)
            - metodo de pago (si esta pendiente)

            Detalles:
            - Los operadores, la receta, el vehiculo, tasas, monto en bolivares y estado del servicio se obtienen del modelo Service
            - El monto en dolares es calculado a partir de la tasa de cambio y el monto en bolivares
            - Las transacciones se obtienen del modelo Service a traves del modelo ServiceTransactions
        */

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
