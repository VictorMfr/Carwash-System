/**
 * @jest-environment node
 */

/** 
 * Este archivo contiene las pruebas para el deleteModels, una 
 * funcion que se encarga de eliminar multiples modelos en la base de datos
 * de forma mas rapida
 */

import deleteModels from "@/lib/apiUtils/model/deleteModels";
import { User } from "@/services/backend/models/associations";
import { testRequest } from "./createModel.test";
import { UserObjectCreateSchema } from "@/lib/definitions";
import createModel from "@/lib/apiUtils/model/createModel";
import { NextRequest } from "next/server";

describe('Pruebas con deleteModels', () => {
    test('Eliminar multiples modelos sencillos', async () => {
        // Crear usuarios
        const responseOne = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
        });
        const responseTwo = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
        });

        expect(responseOne.status).toBe(200);
        expect(responseTwo.status).toBe(200);
        const userOne = await responseOne.json();
        const userTwo = await responseTwo.json();
        expect(userOne).not.toBeNull();
        expect(userTwo).not.toBeNull();
        expect(userOne.id).toBeDefined();
        expect(userTwo.id).toBeDefined();

        // Crear request con los IDs a eliminar
        const deleteRequest: NextRequest = {
            json: async () => ({
                ids: [userOne.id, userTwo.id],
            }),
            headers: new Headers({
                'content-type': 'application/json',
            }),
        } as any;

        // Eliminar usuarios
        const responseDelete = await deleteModels(User, deleteRequest);

        expect(responseDelete.status).toBe(200);
        const result = await responseDelete.json();
        expect(result.message).toBe('Models deleted successfully');

        // Verificar que los usuarios fueron eliminados (soft delete)
        const deletedUserOne = await User.findByPk(userOne.id, { paranoid: false });
        const deletedUserTwo = await User.findByPk(userTwo.id, { paranoid: false });
        expect(deletedUserOne).not.toBeNull();
        expect(deletedUserTwo).not.toBeNull();
        expect((deletedUserOne as any)?.deletedAt).not.toBeNull();
        expect((deletedUserTwo as any)?.deletedAt).not.toBeNull();

        // Eliminar completamente
        await deletedUserOne?.destroy({ force: true });
        await deletedUserTwo?.destroy({ force: true });
    });
});