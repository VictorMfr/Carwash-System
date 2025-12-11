/**
 * @jest-environment node
 */

/** 
 * Este archivo contiene las pruebas para el getModels, una 
 * funcion que se encarga de obtener todos las filas de un mismo 
 * modelo en la base de datos de forma mas rapida
 */

import getModels from "@/lib/apiUtils/model/getModels";
import { User } from "@/services/backend/models/associations";
import { testRequest } from "./createModel.test";
import { UserObjectCreateSchema } from "@/lib/definitions";
import createModel from "@/lib/apiUtils/model/createModel";

describe('Pruebas con getModels', () => {
    test('Obtener todos los modelos', async () => {
        // Obtener usuarios existentes
        const responseGet = await getModels(User);

        expect(responseGet.status).toBe(200);
        const users = await responseGet.json();
        expect(Array.isArray(users)).toBe(true);
    });

    test('Obtener todos los modelos después de crear uno nuevo', async () => {
        // Crear usuario
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
        });

        expect(response.status).toBe(200);
        const newUser = await response.json();
        expect(newUser).not.toBeNull();
        expect(newUser.id).toBeDefined();

        // Obtener todos los usuarios
        const responseGet = await getModels(User);
        expect(responseGet.status).toBe(200);
        const users = await responseGet.json();
        expect(Array.isArray(users)).toBe(true);
        
        // Verificar que el usuario creado está en la lista
        const foundUser = users.find((u: any) => u.id === newUser.id);
        expect(foundUser).toBeDefined();
        expect(foundUser?.email).toBe(newUser.email);

        // Eliminar usuario
        await (await User.findByPk(newUser.id))?.destroy({ force: true });
    });
});

