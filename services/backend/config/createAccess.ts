import bcrypt from "bcryptjs";
import { User } from "../models/associations";


export const defaultRoles = [
    {
        name: 'Administrador'
    },
    {
        name: 'Auditor Inventario'
    },
    {
        name: 'Auditor Finanzas'
    },
    {
        name: 'Soporte cliente'
    },
    {
        name: 'Auditor Marketing'
    },
    {
        name: 'Auditor RRHH'
    }
] 

export default async function createAccess() {

    const hashedPassword = await bcrypt.hash('admin', 10);

    await User.create({
        name: 'Admin',
        lastname: 'Admin',
        email: 'admin@admin.com',
        phone: '1234567890',
        address: '1234567890',
        password: hashedPassword,
        role: 'Administrador'
    })
}