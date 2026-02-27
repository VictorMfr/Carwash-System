import { NextResponse } from "next/server";
import db from "@/services/backend/db";


export async function GET() {
    try {
        const query = await db.query('SELECT CONCAT(clients.name, " ", clients.lastname) as clientName, SUM(services.bol_charge) as totalSpent, COUNT(services.id) as totalServices FROM services JOIN vehicles ON services.VehicleId = vehicles.id JOIN clients ON vehicles.ClientId = clients.id GROUP BY clientName');
        
        const pieChartData = query[0].map((item: any, index: number) => ({
            id: index,
            value: item.totalSpent,
            label: item.clientName,
        }));

        const pieChartDataServices = query[0].map((item: any, index: number) => ({
            id: index,
            value: item.totalServices,
            label: item.clientName,
        }));

        const response = {
            spentByClient: [{ data: pieChartData }],
            totalServices: [{ data: pieChartDataServices }],
        };
        
        return NextResponse.json(response);

    } catch (e: any) {
        console.log(e);
        return NextResponse.json({ message: e?.message ?? 'Error generando estadísticas' }, { status: 500 });
    }
}


