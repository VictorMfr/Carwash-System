/** @jest-environment node */

/**
 * Este archivo contiene las pruebas para la conexión a la base de datos
 */ 

import { DB_CONNECTION_MESSAGES, testConnection } from "../../services/initDatabase";

// Connects to database
test('Conexion a la base de datos exitosa', async () => {
    expect(await testConnection()).toBe(DB_CONNECTION_MESSAGES.SUCCESS);
});