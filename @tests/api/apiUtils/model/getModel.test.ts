/**
 * @jest-environment node
 */

/** 
 * Este archivo contiene las pruebas para el getModel, una 
 * funcion que se encarga de obtener un modelo en la base de datos
 * de forma mas rapida
 */

import getModel from "@/lib/apiUtils/model/getModel";
import { User } from "@/services/backend/models/associations";
import { testRequest } from "./createModel.test";
import { UserObjectCreateSchema } from "@/lib/definitions";
import createModel from "@/lib/apiUtils/model/createModel";

describe('Pruebas con getModel', () => {
    test('Obtener un modelo sencillo por ID', async () => {
        // Crear usuario
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
        });

        expect(response.status).toBe(200);
        const user = await response.json();
        expect(user).not.toBeNull();
        expect(user.id).toBeDefined();

        // Obtener usuario
        const responseGet = await getModel(User, Promise.resolve({ id: user.id }));

        expect(responseGet.status).toBe(200);
        const retrievedUser = await responseGet.json();
        expect(retrievedUser).not.toBeNull();
        expect(retrievedUser.id).toBe(user.id);
        expect(retrievedUser.email).toBe(user.email);

        // Eliminar usuario
        await (await User.findByPk(user.id))?.destroy({ force: true });
    });

    test('Obtener un modelo que no existe', async () => {
        // Intentar obtener un usuario con ID inexistente
        const responseGet = await getModel(User, Promise.resolve({ id: '99999999-9999-9999-9999-999999999999' }));

        expect(responseGet.status).toBe(200);
        const result = await responseGet.json();
        expect(result).toBeNull();
    });

    test('Obtener un modelo con afterFind callback', async () => {
        // Crear usuario
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
        });

        expect(response.status).toBe(200);
        const user = await response.json();
        expect(user).not.toBeNull();
        expect(user.id).toBeDefined();

        // Obtener usuario con afterFind
        const responseGet = await getModel(
            User,
            Promise.resolve({ id: user.id }),
            async (model) => {
                return {
                    id: model?.id,
                    email: model?.email,
                    fullName: `${model?.name} ${model?.lastname}`,
                };
            }
        );

        expect(responseGet.status).toBe(200);
        const result = await responseGet.json();
        expect(result).not.toBeNull();
        expect(result.id).toBe(user.id);
        expect(result.email).toBe(user.email);
        expect(result.fullName).toBe(`${user.name} ${user.lastname}`);

        // Eliminar usuario
        await (await User.findByPk(user.id))?.destroy({ force: true });
    });
});

