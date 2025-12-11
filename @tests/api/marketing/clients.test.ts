/** @jest-environment node */

/**
 * Este archivo contiene las pruebas para las rutas de clientes marketing
 */
import { GET as GETClients } from "@/app/api/marketing/clients/route";

describe('Clientes marketing', () => {
  test('Obtener clientes marketing', async () => {
    const res = await GETClients();
    expect(res.status).toBe(200);
  });
});
