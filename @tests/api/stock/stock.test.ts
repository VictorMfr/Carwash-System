/** @jest-environment node */

/**
 * Este archivo contiene las pruebas para las rutas de stock
 */
import createModel from "@/lib/apiUtils/model/createModel";
import { Product, Stock, User } from "@/services/backend/models/associations";
import { StockObjectSchema } from "@/lib/definitions";
import { decrypt, getSession } from "@/lib/session";


const testStockOne = {
  json: async () => ({
    product: {
      id: 1,
    },
    minimum_quantity: 10,
  }),
} as any;

describe('Rutas de stock', () => {
  test('Crear stock', async () => {
    const response = await createModel({
      model: Stock,
      validationSchema: StockObjectSchema,
      request: testStockOne,
      preCreate: async (validatedData) => {
        const { product, minimum_quantity } = validatedData as any;

        if (!product || !minimum_quantity) {
          throw new Error('Product and minimum_quantity are required');
        }

        // Obtener usuario desde la sesión
        const session = await getSession();
        if (!session) {
          throw new Error('Session not found');
        }

        const decoded = await decrypt(session);
        if (!decoded) {
          throw new Error('User not found');
        }

        const user = await User.findByPk(decoded.userId);
        if (!user) {
          throw new Error('User not found');
        }

        // Evitar asociar un producto que ya tenga inventario
        const existing = await Stock.findOne({
          include: [{ model: Product, as: 'Product', where: { id: product.id } }]
        });
        if (existing) {
          throw new Error('Este inventario ya existe');
        }

        // Datos que realmente se guardan en la tabla `stocks`
        return {
          total_quantity: 0,
          minimum_quantity: Number(minimum_quantity),
        };
      },
      postCreate: async (validatedData, stock) => {
        const { product } = validatedData as any;

        // Asociar producto
        if (product?.id) {
          await stock.setProduct(product.id);
        }

        // Asociar usuario
        const session = await getSession();
        if (!session) {
          throw new Error('Session not found');
        }

        const decoded = await decrypt(session);
        if (!decoded) {
          throw new Error('User not found');
        }

        const user = await User.findByPk(decoded.userId);
        if (!user) {
          throw new Error('User not found');
        }

        await stock.setUser(user.id);

        // Formatear respuesta igual que antes
        const json: any = stock.toJSON();
        const formatted = {
          ...json,
          product: product.name,
          unit: product.unit,
        };

        return formatted;
      }
    });

    expect(response.status).toBe(200);

    await (await Stock.findByPk((await response.json()).id))?.destroy({ force: true });
  });
});