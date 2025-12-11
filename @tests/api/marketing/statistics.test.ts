/** @jest-environment node */

/**
 * Este archivo contiene las pruebas para las rutas de estadísticas de marketing
 */
import { GET as GETStats } from "@/app/api/marketing/statistics/route";

describe('Estadísticas de marketing', () => {
  test('Obtener estadísticas de marketing', async () => {
    const res = await GETStats();
    expect(res.status).toBe(200);
  });
});
