/**
 * @jest-environment node
 */

/** 
 * Este archivo contiene las pruebas para el createModel, una 
 * funcion que se encarga de crear un modelo en la base de datos
 * de forma mas rapida
 */
import createModel from "@/lib/apiUtils/model/createModel";
import { UserObjectCreateSchema } from "@/lib/definitions";
import { NextRequest } from "next/server";
import { User } from "@/services/backend/models/associations";
import bcrypt from "bcryptjs";

export const testRequest: NextRequest = {
    json: async () => ({
        name: 'Test User',
        lastname: 'Test Lastname',
        phone: '1234567890',
        address: '123 Main St',
        email: 'test-simple@example.com',
        password: 'password123',
    }),
    headers: new Headers({
        'content-type': 'application/json',
    }),
} as any;

describe('Pruebas con createModel', () => {
    // PRUEBA #1
    test('Creacion de un modelo sencillo', async () => {
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
        });

        expect(response.status).toBe(200);

        const user = await response.json();
        await (await User.findByPk(user.id))?.destroy({ force: true });
    });

    // PRUEBA #2
    test('Creacion de un modelo, eliminarlo y restaurarlo por un campo unico', async () => {
        // Crear usuario
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
            uniqueField: 'email',
        });

        // Eliminar usuario
        const user = await response.json();
        await (await User.findByPk(user.id))?.destroy();

        // Restaurar usuario
        const responseRestore = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
            uniqueField: 'email',
        });

        expect(responseRestore.status).toBe(200);

        // Eliminar completamente
        const userToDelete = await responseRestore.json();
        await (await User.findByPk(userToDelete.id))?.destroy({ force: true });
    });

    // PRUEBA #3
    test('Creacion de un modelo, y ejecutar un preCreate', async () => {
        // Crear usuario
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
            preCreate: async (validatedData) => {
                const hashedPassword = await bcrypt.hash(validatedData.password, 10);
                validatedData.password = hashedPassword;
            }
        });

        expect(response.status).toBe(200);
        const user = await response.json();
        const hashedPassword = user.password;

        // Check hash - comparar el password original con el hash almacenado
        const isPasswordValid = await bcrypt.compare('password123', hashedPassword);
        expect(isPasswordValid).toBe(true);

        // Eliminar usuario
        await (await User.findByPk(user.id))?.destroy({ force: true });
    });

    // PRUEBA #4
    test('Creacion de un modelo, y ejecutar un postCreate', async () => {
        // Crear usuario
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testRequest,
            postCreate: async (validatedData, model) => { // model es el modelo creado
                const hashedPassword = await bcrypt.hash(validatedData.password, 10);
                await model.update({ password: hashedPassword });
                return model;
            }
        });

        expect(response.status).toBe(200);
        const user = await response.json();
        const hashedPassword = user.password;

        // Check hash - comparar el password original con el hash almacenado
        const isPasswordValid = await bcrypt.compare('password123', hashedPassword);
        expect(isPasswordValid).toBe(true);

        // Eliminar usuario
        await (await User.findByPk(user.id))?.destroy({ force: true });
    });
});