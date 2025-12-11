/** @jest-environment node */

/**
 * Este archivo contiene las pruebas para las rutas de usuario
 */
import createModel from "@/lib/apiUtils/model/createModel";
import deleteModel from "@/lib/apiUtils/model/deleteModel";
import deleteModels from "@/lib/apiUtils/model/deleteModels";
import getModel from "@/lib/apiUtils/model/getModel";
import updateModel from "@/lib/apiUtils/model/updateModel";
import { UserObjectCreateSchema, UserObjectUpdateSchema } from "@/lib/definitions";
import { User } from "@/services/backend/models/associations";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

const objOne = {
    name: 'Test User',
    lastname: 'Test Lastname',
    phone: '1234567890',
    address: '123 Main St',
    email: 'test-simple@example.com',
    password: 'password123'
}

const objTwo = {
    name: 'Test User Two',
    lastname: 'Test Lastname Two',
    phone: '1234567890',
    address: '123 Main St',
    email: 'test-simple@example.com',
    password: 'password123'
}

const testUser: NextRequest = {
    json: async () => objOne
} as any;

describe('Rutas de usuario', () => {
    test('Crear usuario', async () => {
        let modela;
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testUser,
            uniqueField: 'email',
            preCreate: async (validatedData) => {
                const hashedPassword = await bcrypt.hash(validatedData.password, 10);
                validatedData.password = hashedPassword;
                return validatedData;
            },
            postCreate: async (validatedData, model) => {
                modela = model;
                return model;
            }
        });

        expect(modela).toBeDefined();
        expect((modela as any).id).toBeDefined();
        expect(response.status).toBe(200);
        const user = await response.json();
        expect(user).not.toBeNull();
        expect(user.password).not.toBe((await testUser.json()).password);

        await (await User.findOne({ where: { email: 'test-simple@example.com' } }))?.destroy({ force: true });
    });

    test('Restaurar un usuario', async () => {
        // Crear usuario primero
        const response = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: testUser,
            uniqueField: 'email',
        });

        // Eliminar usuario
        await (await User.findOne({ where: { email: 'test-simple@example.com' } }))?.destroy();

        // Restaurar usuario
        const responseTwo = await createModel({
            model: User,
            validationSchema: UserObjectCreateSchema,
            request: { json: async () => objTwo } as any,
            uniqueField: 'email',
        });

        expect(responseTwo.status).toBe(200);
        const user = await responseTwo.json();
        expect(user).not.toBeNull();
        expect(user.email).toBe(objTwo.email);

        // Eliminar completamente
        await (await User.findOne({ where: { email: 'test-simple@example.com' } }))?.destroy({ force: true });
    });

    test('Visualizar un usuario', async () => {
        const response = await getModel(User, Promise.resolve({ id: '1' }));
        expect(response.status).toBe(200);
        const user = await response.json();
        expect(user).not.toBeNull();
        expect(user.id).toBeDefined();
    });

    test('Actualizar un usuario', async () => {
        const updateResponse = await updateModel({
            model: User,
            params: Promise.resolve({ id: '1' }),
            request: { json: async () => ({
                name: 'Admin Test',
                lastname: 'Admin',
                phone: '1234567890',
                address: '1234567890',
                email: 'admin@admin.com'
            })} as any,
            validationSchema: UserObjectUpdateSchema,
        });

        expect(updateResponse.status).toBe(200);
        const user = await updateResponse.json();
        expect(user).not.toBeNull();
        expect(user.name).toBe('Admin Test');

        // Cambiarlo de vuelta a Admin
        const updateResponseTwo = await updateModel({
            model: User,
            params: Promise.resolve({ id: '1' }),
            request: { json: async () => ({
                name: 'Admin',
                lastname: 'Admin',
                phone: '1234567890',
                address: '1234567890',
                email: 'admin@admin.com'
            })} as any,
            validationSchema: UserObjectUpdateSchema,
        });
        
        expect(updateResponseTwo.status).toBe(200);
    });

    test('Eliminar un usuario (soft delete)', async () => {
        const response = await deleteModel(User, Promise.resolve({ id: '1' }));
        expect(response.status).toBe(200);
        
        // Verificar que el usuario está eliminado (soft delete)
        const verifyUser = await User.findByPk(1, { paranoid: false });
        expect(verifyUser).not.toBeNull();
        expect((verifyUser as any).deletedAt).not.toBeNull();

        // Restaurar usuario
        const restoredUser = await verifyUser?.restore();
        expect(restoredUser).not.toBeNull();
        
        const verifyUserTwo = await User.findByPk(1);
        expect(verifyUserTwo).not.toBeNull();
    });

    test('Eliminar varios usuarios (soft delete)', async () => {
    // Crear los dos usuarios
    const createResponse1 = await createModel({
        model: User,
        request: { json: async () => ({
            name: 'User One',
            lastname: 'Test1',
            phone: '1111111111',
            address: 'Address 1',
            email: 'user1@example.com',
            password: 'password123'
        })} as any,
        validationSchema: UserObjectCreateSchema,
    });
    expect(createResponse1.status).toBe(200);
    const createdUser1 = await createResponse1.json();
    expect(createdUser1).not.toBeNull();
    expect(createdUser1.email).toBe('user1@example.com');

    const createResponse2 = await createModel({
        model: User,
        request: { json: async () => ({
            name: 'User Two',
            lastname: 'Test2',
            phone: '2222222222',
            address: 'Address 2',
            email: 'user2@example.com',
            password: 'password123'
        })} as any,
        validationSchema: UserObjectCreateSchema,
    });
    expect(createResponse2.status).toBe(200);
    const createdUser2 = await createResponse2.json();
    expect(createdUser2).not.toBeNull();
    expect(createdUser2.email).toBe('user2@example.com');

    // Eliminar ambos usuarios (soft delete)

    const userOne = await User.findOne({ where: { email: 'user1@example.com' } });
    const userTwo = await User.findOne({ where: { email: 'user2@example.com' } });

    const deleteResponse = await deleteModels(User, { json: async () => ({ ids: [userOne?.id, userTwo?.id] }) } as any);
    expect(deleteResponse.status).toBe(200);
    
    // Eliminar completamente
    await userOne?.destroy({ force: true });
    await userTwo?.destroy({ force: true });
    });
});