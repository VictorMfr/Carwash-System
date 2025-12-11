// Get database metadata
import db from "@/services/backend/db";
import { NextResponse } from "next/server";

/** Esta ruta se usa para obtener los metadatos de la base de datos, dentro
 * del sistema se usa para obtener el tamaño de la base de datos, para luego ser
 * comparado con el tamaño máximo permitido por el proveedor, el cual esta definido.
 */
export async function GET() {
    try {
        const [result] = await db.query(`
            SELECT 
              table_schema AS nombre_base,
              ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS tamaño_mb
            FROM 
              information_schema.tables
            WHERE 
              table_schema = DATABASE()
            GROUP BY 
              table_schema;
          `);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error getting database metadata:', error);
        return NextResponse.json({ error: 'Error getting database metadata' }, { status: 500 });
    }
}