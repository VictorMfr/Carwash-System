import {
    Account,
    Method,
    Transaction,
    User,
    Product,
    Brand,
    State,
    Client,
    VehicleBrand,
    VehicleModel,
    Operator,
    Recipe,
    Stock,
    StockDetails,
    Vehicle,
    Service,
} from "../models/associations";
import RecipeStockDetails from "../models/service/recipeStockDetails";
import ServiceStockDetails from "../models/service/serviceStockDetails";
import ServiceOperator from "../models/service/serviceOperator";
import db from "../db";

// ==================== FUNCIONES AUXILIARES ====================

const FIRST_NAMES = [
    "Juan", "María", "Carlos", "Ana", "Luis", "Laura", "Pedro", "Carmen",
    "José", "Isabel", "Miguel", "Patricia", "Francisco", "Lucía", "Antonio",
    "Sofía", "Manuel", "Elena", "Javier", "Marta", "Diego", "Cristina",
    "Roberto", "Andrea", "Fernando", "Natalia", "Ricardo", "Paula"
];

const LAST_NAMES = [
    "García", "Rodríguez", "González", "Fernández", "López", "Martínez",
    "Sánchez", "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández",
    "Díaz", "Moreno", "Álvarez", "Muñoz", "Romero", "Alonso", "Gutiérrez",
    "Navarro", "Torres", "Domínguez", "Vázquez", "Ramos", "Gil", "Ramírez"
];

const PRODUCT_NAMES = [
    "Aceite Motor 5W-30", "Filtro de Aire", "Bujías", "Pastillas de Freno",
    "Líquido de Frenos", "Refrigerante", "Batería 12V", "Amortiguadores",
    "Neumáticos", "Correa de Distribución", "Bomba de Agua", "Radiador",
    "Alternador", "Motor de Arranque", "Llave de Torque", "Gato Hidráulico"
];

const STOCK_BRANDS = [
    "Bosch", "Mann Filter", "NGK", "Brembo", "Castrol", "Mobil", "ACDelco", "Valeo"
];

const STATES = ["Nuevo", "Usado", "Reparado", "Refabricado", "OEM"];

const VEHICLE_BRANDS = [
    "Toyota", "Ford", "Chevrolet", "Nissan", "Honda", "Volkswagen", "Hyundai", "Mazda"
];

const VEHICLE_MODELS = [
    { brand: "Toyota", models: ["Corolla", "Camry", "RAV4", "Hilux"] },
    { brand: "Ford", models: ["Fiesta", "Focus", "Explorer", "Ranger"] },
    { brand: "Chevrolet", models: ["Spark", "Cruze", "Equinox", "Silverado"] },
    { brand: "Nissan", models: ["Versa", "Sentra", "Rogue", "Frontier"] },
    { brand: "Honda", models: ["Civic", "Accord", "CR-V", "Pilot"] },
    { brand: "Volkswagen", models: ["Gol", "Jetta", "Tiguan", "Amarok"] },
    { brand: "Hyundai", models: ["Accent", "Elantra", "Tucson", "Santa Fe"] },
    { brand: "Mazda", models: ["Mazda2", "Mazda3", "CX-5", "BT-50"] }
];

const RECIPE_NAMES = [
    "Cambio de Aceite Completo", "Revisión General", "Frenos y Suspensión",
    "Sistema Eléctrico", "Aire Acondicionado", "Transmisión", "Motor Completo",
    "Pintura y Carrocería", "Limpieza Profunda", "Diagnóstico Completo"
];

const SERVICE_STATUSES = ["Pendiente", "En proceso", "Completado", "Cancelado"];

const ACCOUNT_NAMES = [
    "Cuenta Principal", "Cuenta de Ahorros", "Cuenta Corriente",
    "Cuenta de Inversión", "Cuenta de Gastos"
];

const METHOD_NAMES = [
    "Efectivo", "Transferencia Bancaria", "Tarjeta de Débito",
    "Tarjeta de Crédito", "Zelle", "PayPal"
];

const DESCRIPTION_TAGS = [
    "Ingreso por servicio",
    "Compra de repuestos",
    "Pago de operador",
    "Costo logístico",
    "Bonificación cliente",
    "Campaña de marketing",
    "Renovación de herramientas",
    "Gasto administrativo",
];

// Funciones auxiliares
const randomElement = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const randomFloat = (min: number, max: number): number =>
    Math.random() * (max - min) + min;

const randomDate = (startMonthsAgo: number = 12, endMonthsAgo: number = 0): Date => {
    const now = new Date();
    const start = new Date(now);
    start.setMonth(start.getMonth() - startMonthsAgo);
    const end = new Date(now);
    end.setMonth(end.getMonth() - endMonthsAgo);
    const timeDiff = end.getTime() - start.getTime();
    const randomTime = start.getTime() + Math.random() * timeDiff;
    return new Date(randomTime);
};

const generatePhone = (): string => {
    const area = randomInt(200, 299);
    const number = randomInt(1000000, 9999999);
    return `0${area}-${number}`;
};

const generateLicensePlate = (): string => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letter1 = randomElement(letters.split(""));
    const letter2 = randomElement(letters.split(""));
    const numbers = randomInt(100, 999);
    const letter3 = randomElement(letters.split(""));
    return `${letter1}${letter2}-${numbers}${letter3}`;
};

const clampDay = (value: number) => Math.min(28, value);

const pickTag = (index: number) => DESCRIPTION_TAGS[index % DESCRIPTION_TAGS.length];

// ==================== FUNCION PRINCIPAL DE SEED ====================

export async function seedComprehensiveTestData() {
    const transaction = await db.transaction();

    try {
        console.log("[seedComprehensiveTestData] Iniciando generación de datos de prueba...");

        // Verificar si ya existen datos
        const existingServices = await Service.count({ transaction });
        if (existingServices >= 100) {
            console.info(
                "[seedComprehensiveTestData] Ya existen servicios en la base de datos. Omitiendo generación."
            );
            await transaction.rollback();
            return;
        }

        // 1. Buscar o crear usuario admin
        let admin = await User.findOne({ where: { email: "admin@admin.com" }, transaction });
        if (!admin) {
            console.warn(
                "[seedComprehensiveTestData] No se encontró el usuario admin. Se requiere un usuario admin existente."
            );
            await transaction.rollback();
            return;
        }

        // 2. Crear entidades base
        console.log("[seedComprehensiveTestData] Creando entidades base...");

        // Productos
        const products: Product[] = [];
        for (const name of PRODUCT_NAMES) {
            const [product] = await Product.findOrCreate({
                where: { name },
                defaults: {
                    name,
                    unit: name.includes("Aceite") || name.includes("Líquido") || name.includes("Refrigerante")
                        ? "Litro"
                        : name.includes("Neumáticos")
                        ? "Unidad"
                        : "Unidad",
                    isTool: name.includes("Llave") || name.includes("Gato"),
                },
                transaction,
            });
            products.push(product);
        }

        // Marcas de stock
        const brands: Brand[] = [];
        for (const name of STOCK_BRANDS) {
            const [brand] = await Brand.findOrCreate({
                where: { name },
                defaults: { name },
                transaction,
            });
            brands.push(brand);
        }

        // Estados
        const states: State[] = [];
        for (const name of STATES) {
            const [state] = await State.findOrCreate({
                where: { name },
                defaults: { name },
                transaction,
            });
            states.push(state);
        }

        // Clientes
        const clients: Client[] = [];
        for (let i = 0; i < 20; i++) {
            const name = randomElement(FIRST_NAMES);
            const lastname = randomElement(LAST_NAMES);
            const phone = generatePhone();
            const [client] = await Client.findOrCreate({
                where: { phone },
                defaults: { name, lastname, phone },
                transaction,
            });
            clients.push(client);
        }

        // Marcas de vehículos
        const vehicleBrands: VehicleBrand[] = [];
        for (const name of VEHICLE_BRANDS) {
            const [brand] = await VehicleBrand.findOrCreate({
                where: { name },
                defaults: { name },
                transaction,
            });
            vehicleBrands.push(brand);
        }

        // Modelos de vehículos
        const vehicleModels: VehicleModel[] = [];
        for (const brandData of VEHICLE_MODELS) {
            const brand = vehicleBrands.find((b) => b.name === brandData.brand);
            if (brand) {
                for (const modelName of brandData.models) {
                    const [model] = await VehicleModel.findOrCreate({
                        where: { name: modelName },
                        defaults: { name: modelName },
                        transaction,
                    });
                    vehicleModels.push(model);
                }
            }
        }

        // Operadores
        const operators: Operator[] = [];
        for (let i = 0; i < 15; i++) {
            const name = randomElement(FIRST_NAMES);
            const lastname = randomElement(LAST_NAMES);
            const phone = generatePhone();
            const address = `Calle ${randomInt(1, 200)}, Sector ${randomElement(["Centro", "Norte", "Sur", "Este", "Oeste"])}`;
            const [operator] = await Operator.findOrCreate({
                where: { phone },
                defaults: { name, lastname, phone, address, avatar: null },
                transaction,
            });
            operators.push(operator);
        }

        // Recetas
        const recipes: Recipe[] = [];
        for (const name of RECIPE_NAMES) {
            const [recipe] = await Recipe.findOrCreate({
                where: { name },
                defaults: { name },
                transaction,
            });
            recipes.push(recipe);
        }

        // Cuentas
        const accounts: Account[] = [];
        for (const name of ACCOUNT_NAMES) {
            const [account] = await Account.findOrCreate({
                where: { name },
                defaults: {
                    name,
                    description: `Cuenta para ${name.toLowerCase()}`,
                },
                transaction,
            });
            accounts.push(account);
        }

        // Métodos
        const methods: Method[] = [];
        for (const name of METHOD_NAMES) {
            const [method] = await Method.findOrCreate({
                where: { name },
                defaults: { name },
                transaction,
            });
            methods.push(method);
        }

        // 3. Crear stocks y detalles de stock
        console.log("[seedComprehensiveTestData] Creando stocks y detalles de stock...");

        const stocks: Array<{ stock: Stock; productName: string }> = [];
        for (const product of products) {
            // Verificar si ya existe stock para este producto
            let stock = await Stock.findOne({
                include: [{ model: Product, as: 'Product', where: { id: product.id } }],
                transaction,
            });

            if (!stock) {
                stock = await Stock.create(
                    {
                        total_quantity: 0,
                        minimum_quantity: randomInt(5, 20),
                    },
                    { transaction }
                );
                await stock.setProduct(product.id, { transaction });
                await stock.setUser(admin.id, { transaction });
            } else {
                // Asegurar que el usuario esté configurado
                await stock.setUser(admin.id, { transaction });
            }

            stocks.push({ stock, productName: product.name });
        }

        const stockDetails: StockDetails[] = [];
        for (let i = 0; i < 50; i++) {
            const stockData = randomElement(stocks);
            const stock = stockData.stock;
            const brand = randomElement(brands);
            const state = randomElement(states);
            const quantity = randomInt(10, 100);
            const entryDate = randomDate(18, 0);

            const stockDetail = await StockDetails.create(
                {
                    quantity,
                    entry_date: entryDate,
                    picture: null,
                },
                { transaction }
            );

            await stockDetail.setStock(stock.id, { transaction });
            await stockDetail.setBrand(brand.id, { transaction });
            await stockDetail.setState(state.id, { transaction });

            // Actualizar total_quantity del stock
            stock.total_quantity = (stock.total_quantity || 0) + quantity;
            await stock.save({ transaction });

            // Algunos StockDetails tienen asociadas transacciones
            if (Math.random() > 0.5) {
                const amount = -Math.abs(randomInt(5000, 50000));
                const dollarRate = randomInt(35, 42);
                const transactionRecord = await Transaction.create(
                    {
                        date: entryDate,
                        amount,
                        description: `Compra inventario: ${stockData.productName} - ${brand.name}`.trim(),
                        dollar_rate: dollarRate,
                    },
                    { transaction }
                );

                await transactionRecord.setAccount(randomElement(accounts).id, { transaction });
                await transactionRecord.setMethod(randomElement(methods).id, { transaction });
                await transactionRecord.setUser(admin.id, { transaction });
                await stockDetail.setTransaction(transactionRecord.id, { transaction });
            }

            stockDetails.push(stockDetail);
        }

        // 4. Crear vehículos
        console.log("[seedComprehensiveTestData] Creando vehículos...");

        const vehicles: Vehicle[] = [];
        for (let i = 0; i < 30; i++) {
            const client = randomElement(clients);
            const brand = randomElement(vehicleBrands);
            const model = randomElement(vehicleModels);
            const licensePlate = generateLicensePlate();

            const [vehicle] = await Vehicle.findOrCreate({
                where: { license_plate: licensePlate },
                defaults: { license_plate: licensePlate },
                transaction,
            });

            await vehicle.setClient(client.id, { transaction });
            await vehicle.setVehicleBrand(brand.id, { transaction });
            await vehicle.setVehicleModel(model.id, { transaction });

            vehicles.push(vehicle);
        }

        // 5. Crear asociaciones receta-detalles de stock
        console.log("[seedComprehensiveTestData] Creando asociaciones receta-detalles de stock...");

        for (const recipe of recipes) {
            const numStockDetails = randomInt(2, 5);
            const selectedStockDetails = stockDetails
                .sort(() => Math.random() - 0.5)
                .slice(0, numStockDetails);

            for (const stockDetail of selectedStockDetails) {
                await RecipeStockDetails.findOrCreate({
                    where: {
                        recipeId: recipe.id,
                        stockDetailId: stockDetail.id,
                    },
                    defaults: {
                        recipeId: recipe.id,
                        stockDetailId: stockDetail.id,
                        quantity: randomInt(1, 5),
                    },
                    transaction,
                });
            }
        }

        // 6. Crear 100 servicios
        console.log("[seedComprehensiveTestData] Creando 100 servicios...");

        const services: Service[] = [];
        for (let i = 0; i < 100; i++) {
            const date = randomDate(12, 0);
            const dollarRate = randomFloat(35, 42);
            const bolCharge = randomInt(50000, 500000);
            const status = randomElement(SERVICE_STATUSES);
            const recipe = randomElement(recipes);
            const vehicle = randomElement(vehicles);

            const service = await Service.create(
                {
                    date,
                    dollar_rate: dollarRate,
                    bol_charge: bolCharge,
                    status,
                },
                { transaction }
            );

            await service.setRecipe(recipe.id, { transaction });
            await service.setVehicle(vehicle.id, { transaction });

            // Agregar 1-3 operadores
            const numOperators = randomInt(1, 3);
            const selectedOperators = operators
                .sort(() => Math.random() - 0.5)
                .slice(0, numOperators);

            for (const operator of selectedOperators) {
                await ServiceOperator.findOrCreate({
                    where: {
                        serviceId: service.id,
                        operatorId: operator.id,
                    },
                    defaults: {
                        serviceId: service.id,
                        operatorId: operator.id,
                        isPaid: Math.random() > 0.6,
                        paidAt: Math.random() > 0.6 ? date : null,
                        paidAmount: Math.random() > 0.6 ? randomInt(10000, 50000) : null,
                    },
                    transaction,
                });
            }

            // Agregar 1-5 detalles de stock
            const numStockDetails = randomInt(1, 5);
            const availableStockDetails = stockDetails.filter(
                (sd) => (sd.quantity || 0) > 0
            );
            const selectedStockDetails = availableStockDetails
                .sort(() => Math.random() - 0.5)
                .slice(0, numStockDetails);

            for (const stockDetail of selectedStockDetails) {
                const quantity = randomInt(1, Math.min(5, stockDetail.quantity || 1));
                await ServiceStockDetails.create(
                    {
                        serviceId: service.id,
                        stockDetailId: stockDetail.id,
                        quantity,
                    },
                    { transaction }
                );

                // Actualizar cantidad del detalle de stock (deducir)
                stockDetail.quantity = (stockDetail.quantity || 0) - quantity;
                await stockDetail.save({ transaction });
            }

            services.push(service);
        }

        // 7. Crear transacciones adicionales
        console.log("[seedComprehensiveTestData] Creando transacciones adicionales...");

        const baseYear = new Date().getFullYear() - 1;
        for (let i = 0; i < 60; i++) {
            const month = i % 12;
            const year = baseYear + Math.floor(i / 12);
            const day = clampDay((i % 28) + 1);
            const date = new Date(Date.UTC(year, month, day));
            const weight = (i % 5) + 1;
            const isIncome = Math.random() > 0.4;
            const amount = isIncome
                ? randomInt(20000, 200000)
                : -randomInt(10000, 100000);

            const transactionRecord = await Transaction.create(
                {
                    date,
                    amount,
                    description: `${pickTag(i)} #${i + 1}`,
                    dollar_rate: randomInt(35, 42),
                },
                { transaction }
            );

            await transactionRecord.setAccount(randomElement(accounts).id, { transaction });
            await transactionRecord.setMethod(randomElement(methods).id, { transaction });
            await transactionRecord.setUser(admin.id, { transaction });

            // Algunas transacciones están asociadas a detalles de stock
            if (Math.random() > 0.7 && stockDetails.length > 0) {
                const stockDetail = randomElement(stockDetails);
                await stockDetail.setTransaction(transactionRecord.id, { transaction });
            }
        }

        await transaction.commit();
        console.log("[seedComprehensiveTestData] Datos de prueba generados exitosamente!");
    } catch (error) {
        await transaction.rollback();
        console.error("[seedComprehensiveTestData] Error generando datos de prueba:", error);
        throw error;
    }
}

// Mantener función existente para compatibilidad con versiones anteriores
export async function seedFinanceTestData() {
    const admin = await User.findOne({ where: { email: "admin@admin.com" } });

    if (!admin) {
        console.warn(
            "[seedFinanceTestData] Se omitió la carga porque no se encontró el usuario admin"
        );
        return;
    }

    const [account] = await Account.findOrCreate({
        where: { name: "Cuenta General de Prueba" },
        defaults: {
            name: "Cuenta General de Prueba",
            description: "Cuenta utilizada para datos ficticios generados automáticamente",
        },
    });

    const [method] = await Method.findOrCreate({
        where: { name: "Transferencia bancaria (test)" },
        defaults: {
            name: "Transferencia bancaria (test)",
        },
    });

    const existingTransactions = await Transaction.count();
    if (existingTransactions >= 100) {
        console.info(
            "[seedFinanceTestData] Se detectaron transacciones previas, no se generaron nuevos datos."
        );
        return;
    }

    const baseYear = new Date().getFullYear() - 1;

    const transactions = Array.from({ length: 100 }, (_, index) => {
        const month = index % 12;
        const year = baseYear + Math.floor(index / 12);
        const day = clampDay((index % 28) + 1);
        const date = new Date(Date.UTC(year, month, day));
        const weight = (index % 5) + 1;

        return {
            date,
            amount: 15000 + weight * 2500 + Math.round(Math.random() * 1500),
            description: `${pickTag(index)} #${index + 1}`,
            dollar_rate: 35 + (index % 6),
            accountId: account.id,
            methodId: method.id,
            userId: admin.id,
            created_at: date,
            updated_at: date,
        };
    });

    await Transaction.bulkCreate(transactions);
}
