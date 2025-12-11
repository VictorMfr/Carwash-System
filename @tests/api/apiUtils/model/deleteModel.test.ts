/**
 * @jest-environment node
 */

/** 
 * Este archivo contiene las pruebas para el deleteModel, una 
 * funcion que se encarga de eliminar un modelo en la base de datos
 * de forma mas rapida
 */

import deleteModel from "@/lib/apiUtils/model/deleteModel";
import { User } from "@/services/backend/models/associations";
import { testRequest } from "./createModel.test";
import { UserObjectCreateSchema } from "@/lib/definitions";
import createModel from "@/lib/apiUtils/model/createModel";

describe('Pruebas con deleteModel', () => {
    test('Eliminar un modelo sencillo', async () => {
        // Crear usuario
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
        });

        const user = await response.json();

        // Eliminar usuario
        const responseDelete = await deleteModel(User, Promise.resolve({ id: user.id }));

        expect(responseDelete.status).toBe(200);

        // Eliminarlo completamente considerando que tiene delete_at
        await (await User.findByPk(user.id, { paranoid: false }))?.destroy({ force: true });
    });
});