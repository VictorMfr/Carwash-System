/** @jest-environment node */

/**
 * Este archivo contiene las pruebas para las rutas de balance de cuenta
 */
import { GET as GETAccountBalance } from "@/app/api/finance/account/balance/route";

describe('Balance de cuenta', () => {
  test('Obtener balance de cuenta', async () => {
    const res = await GETAccountBalance();
    expect(res.status).toBe(200);
  });
});
