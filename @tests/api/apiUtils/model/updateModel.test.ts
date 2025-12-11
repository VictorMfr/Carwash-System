/**
 * @jest-environment node
 */

/** 
 * Este archivo contiene las pruebas para el updateModel, una 
 * funcion que se encarga de actualizar un modelo en la base de datos
 * de forma mas rapida
 */

import updateModel from "@/lib/apiUtils/model/updateModel";
import { User } from "@/services/backend/models/associations";
import { testRequest } from "./createModel.test";
import { UserObjectCreateSchema, UserObjectUpdateSchema } from "@/lib/definitions";
import createModel from "@/lib/apiUtils/model/createModel";
import { NextRequest } from "next/server";

describe('Pruebas con updateModel', () => {
    test('Actualizar un modelo sencillo', async () => {
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

        // Crear request de actualización
        const updateRequest: NextRequest = {
            json: async () => ({
                name: 'Updated Name',
                lastname: 'Updated Lastname',
                phone: '9876543210',
                address: '456 Updated St',
                email: user.email, // Mantener el mismo email
            }),
            headers: new Headers({
                'content-type': 'application/json',
            }),
        } as any;

        // Actualizar usuario
        const responseUpdate = await updateModel({
            model: User,
            params: Promise.resolve({ id: user.id }),
            request: updateRequest,
            validationSchema: UserObjectUpdateSchema,
        });

        expect(responseUpdate.status).toBe(200);
        const updatedUser = await responseUpdate.json();
        expect(updatedUser).not.toBeNull();
        expect(updatedUser.id).toBe(user.id);
        expect(updatedUser.name).toBe('Updated Name');
        expect(updatedUser.lastname).toBe('Updated Lastname');
        expect(updatedUser.phone).toBe('9876543210');
        expect(updatedUser.address).toBe('456 Updated St');

        // Eliminar usuario
        await (await User.findByPk(user.id))?.destroy({ force: true });
    });

    test('Actualizar un modelo que no existe', async () => {
        // Crear request de actualización
        const updateRequest: NextRequest = {
            json: async () => ({
                name: 'Updated Name',
                lastname: 'Updated Lastname',
                phone: '9876543210',
                address: '456 Updated St',
                email: 'nonexistent@example.com',
            }),
            headers: new Headers({
                'content-type': 'application/json',
            }),
        } as any;

        // Intentar actualizar un usuario inexistente
        const responseUpdate = await updateModel({
            model: User,
            params: Promise.resolve({ id: '99999999-9999-9999-9999-999999999999' }),
            request: updateRequest,
            validationSchema: UserObjectUpdateSchema,
        });

        expect(responseUpdate.status).toBe(404);
        const error = await responseUpdate.json();
        expect(error.error).toBe('Not found');
    });

    test('Actualizar un modelo con datos inválidos', async () => {
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

        // Crear request con datos inválidos (email inválido)
        const updateRequest: NextRequest = {
            json: async () => ({
                name: 'Updated Name',
                lastname: 'Updated Lastname',
                phone: '9876543210',
                address: '456 Updated St',
                email: 'invalid-email', // Email inválido
            }),
            headers: new Headers({
                'content-type': 'application/json',
            }),
        } as any;

        // Intentar actualizar con datos inválidos
        const responseUpdate = await updateModel({
            model: User,
            params: Promise.resolve({ id: user.id }),
            request: updateRequest,
            validationSchema: UserObjectUpdateSchema,
        });

        // Debe retornar un error de validación
        expect(responseUpdate.status).toBe(500);

        // Eliminar usuario
        await (await User.findByPk(user.id))?.destroy({ force: true });
    });
});

