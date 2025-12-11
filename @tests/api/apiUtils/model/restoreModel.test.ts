/**
 * @jest-environment node
 */

/** 
 * Este archivo contiene las pruebas para el restoreModel, una 
 * funcion que se encarga de restaurar un modelo en la base de datos
 * de forma mas rapida, considerando que el modelo tiene un campo unico
 * y que existe un soft delete
 */

import restoreModel from "@/lib/apiUtils/model/restoreModel";
import { User } from "@/services/backend/models/associations";
import { testRequest } from "./createModel.test";
import { UserObjectCreateSchema } from "@/lib/definitions";
import createModel from "@/lib/apiUtils/model/createModel";

describe('Pruebas con restoreModel', () => {
    test('Restaurar un modelo eliminado (soft delete)', async () => {
        // Crear usuario
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
            uniqueField: 'email',
        });

        expect(response.status).toBe(200);
        const user = await response.json();
        expect(user).not.toBeNull();
        expect(user.id).toBeDefined();

        // Eliminar usuario (soft delete)
        await (await User.findByPk(user.id))?.destroy();

        // Restaurar usuario usando restoreModel directamente
        const validatedData = await testRequest.json();
        const responseRestore = await restoreModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
            uniqueField: 'email',
            validatedData,
        });

        expect(responseRestore.status).toBe(200);
        const restoredUser = await responseRestore.json();
        expect(restoredUser).not.toBeNull();
        expect(restoredUser.id).toBe(user.id);
        expect(restoredUser.email).toBe(user.email);

        // Verificar que el usuario está restaurado (no tiene deletedAt o es null)
        const verifyUser = await User.findByPk(user.id);
        expect(verifyUser).not.toBeNull();
        expect((verifyUser as any)?.deletedAt).toBeFalsy();

        // Eliminar completamente
        await (await User.findByPk(user.id))?.destroy({ force: true });
    });

    test('Restaurar un modelo que no existe (debe crearlo)', async () => {
        // Crear datos únicos para este test
        const uniqueTestRequest: typeof testRequest = {
            json: async () => ({
                name: 'Restore Test User',
                lastname: 'Restore Test Lastname',
                phone: '1111111111',
                address: 'Restore Test St',
                email: 'restore-test-unique@example.com',
                password: 'password123',
            }),
            headers: new Headers({
                'content-type': 'application/json',
            }),
        } as any;

        // Intentar restaurar un usuario que no existe (debe crearlo)
        const validatedData = await uniqueTestRequest.json();
        const responseRestore = await restoreModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: uniqueTestRequest,
            uniqueField: 'email',
            validatedData,
        });

        expect(responseRestore.status).toBe(200);
        const createdUser = await responseRestore.json();
        expect(createdUser.email).toBe('restore-test-unique@example.com');

        // Eliminar completamente
        await (await User.findByPk(createdUser.id))?.destroy({ force: true });
    });

    test('Restaurar un modelo que ya existe y no está eliminado', async () => {
        // Crear usuario
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
            uniqueField: 'email',
        });

        expect(response.status).toBe(200);
        const user = await response.json();
        expect(user).not.toBeNull();
        expect(user.id).toBeDefined();

        // Intentar restaurar un usuario que ya existe y no está eliminado
        const validatedData = await testRequest.json();
        const responseRestore = await restoreModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
            uniqueField: 'email',
            validatedData,
        });

        expect(responseRestore.status).toBe(200);
        const existingUser = await responseRestore.json();
        expect(existingUser).not.toBeNull();
        expect(existingUser.id).toBe(user.id);
        expect(existingUser.email).toBe(user.email);

        // Eliminar completamente
        await (await User.findByPk(user.id))?.destroy({ force: true });
    });
});

