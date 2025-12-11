// Convert to object [{ field: 'email', value: 'john.doe@example.com' }] to { email: 'john.doe@example.com' }

/**
 * Este archivo contiene las utilidades para transformar datos,
 * se usa en:
 * @tests\api\service\recipe.test.ts
 * @tests\unit\util.test.ts (usa ambas funciones)
 * @tests\api\stock\state.test.ts
 * @tests\api\stock\product.test.ts
 * @tests\api\stock\brand.test.ts
 * @tests\api\service\vehicleModel.test.ts
 * @tests\api\service\vehicleBrand.test.ts
 * @tests\api\service\vehicle.test.ts
 * @tests\api\service\operator.test.ts
 * @tests\api\service\client.test.ts
 * @tests\api\finance\method.test.ts
 * @tests\api\finance\account.test.ts
 */
export const toObject = (data: any) => {
    return data.reduce((acc: any, item: any) => {
        acc[item.field] = item.value;
        return acc;
    }, {});
}

export const toFormData = (data: any) => {
    return Object.entries(data).map(([key, value]) => ({ field: key, value }));
}