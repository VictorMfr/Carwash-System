/** @jest-environment node */

import Failure from "@/services/backend/models/stock/failure";
import { GET, POST } from "@/app/api/stock/failures/route";
import { PUT as PUTFailure, GET as GETFailure, DELETE as DELETEFailure } from "@/app/api/stock/failures/[id]/route";

/**
 * Este archivo contiene las pruebas para las rutas de fallas
 */

const testFailureOne = {
    json: async () => ({
        description: 'Test Failure One',
        resolved: false, stockDetailId: 1
    }),
} as any;

describe('Rutas de fallas', () => {

    // Crear falla
    test('Crear falla', async () => {
        const response = await POST(testFailureOne as any);
        const failure = await response.json();
        expect(response.status).toBe(200);
        await (await Failure.findByPk(failure.id))?.destroy({ force: true });
    });

    // Obtener fallas
    test('Obtener fallas', async () => {
        const failures = await GET(null as any);
        expect(failures.status).toBe(200);
    });

    // Visualizar falla
    test('Visualizar falla', async () => {
        const failure = await GETFailure(null as any, { params: Promise.resolve({ id: '1' }) });
        expect(failure.status).toBe(200);
    });


    // Actualizar falla
    test('Actualizar falla', async () => {
        const failure = await Failure.create(await testFailureOne.json());
        const testData = {
            json: async () => await testFailureOne.json()
        } as any;

        const response = await PUTFailure(testData, { params: Promise.resolve({ id: failure.id.toString() }) });
        expect(response.status).toBe(200);
        await failure.destroy({ force: true });
    });

    // Eliminar falla
    test('Eliminar falla', async () => {
        const failure = await Failure.create(await testFailureOne.json());
        const response = await DELETEFailure(null as any, { params: Promise.resolve({ id: failure.id.toString() }) });
        expect(response.status).toBe(200);
        await failure.destroy({ force: true });
    });
});