/** @jest-environment node */

/**
 * Este archivo contiene las pruebas para las rutas de estadísticas de stock
 */
import { GET as GETStockStatistics } from "@/app/api/stock/statistics/route";

// Simple test to ensure endpoint responds
describe('Estadísticas de stock', () => {
  test('Obtener estadísticas de stock', async () => {
    const res = await GETStockStatistics();
    expect(res.status).toBe(200);
  });
});
