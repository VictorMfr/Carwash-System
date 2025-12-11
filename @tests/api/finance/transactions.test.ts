/** @jest-environment node */

/**
 * Este archivo contiene las pruebas para las rutas de transacciones
 */

import { GET as GETTransactions, POST as POSTTransaction } from "@/app/api/finance/route";

// Only test GET and that POST without session yields error
describe('Transacciones', () => {
  test('Obtener transacciones', async () => {
    const res = await GETTransactions({ url: 'http://localhost' } as any);
    expect(res.status).toBe(200);
  });

  test('POST transaction sin sesión debe retornar error (400/500)', async () => {
    const req = {
      json: async () => ({
        date: '01-01-2025',
        amount: 100,
        description: 'Test',
        dollar_rate: 40,
        account: { id: 1, name: 'Acc' },
        method: { id: 1, name: 'Met' }
      })
    } as any;
    const res = await POSTTransaction(req);
    expect([400, 500]).toContain(res.status);
  });
});
