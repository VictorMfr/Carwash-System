/** @jest-environment node */

/**
 * Este archivo contiene las pruebas para las rutas de rol
 */
import { GET as GETRoles } from "@/app/api/role/route";
import { PUT as PUTRole } from "@/app/api/role/[id]/route";
import { Role } from "@/services/backend/models/associations";

describe('Roles', () => {
  test('Obtener roles', async () => {
    const res = await GETRoles();
    expect(res.status).toBe(200);
  });

  test('Actualizar rol', async () => {
    const role = await (Role as any).create({ name: 'Temp Role' });
    const req = { json: async () => ({ name: 'Updated Role' }) } as any;
    const res = await PUTRole(req, { params: Promise.resolve({ id: String(role.id) }) });
    expect(res.status).toBe(200);
    await (role as any).destroy({ force: true });
  });
});
