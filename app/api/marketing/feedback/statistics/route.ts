import db from "@/services/backend/db";
import { Client, Feedback } from "@/services/backend/models/associations";
import { NextResponse } from "next/server";
import { col, fn, literal } from "sequelize";

export async function GET() {
    try {
        /*
            Tipos de graficos:
            - Numero de feedbacks por tipo de opinion
            - Numero de feedbacks por categoria
            - Numero de feedbacks por cliente
            - Numero de feedbacks por mes
        */

        // Numero de feedbacks por tipo de opinion (PieChart)
        const feedbacksByOpinionType = await Feedback.findAndCountAll({
            attributes: ['opinionType'],
            group: ['opinionType'],
        });

        const pieChartData = feedbacksByOpinionType.count.map((item, index) => ({
            id: index,
            value: item.count,
            label: item.opinionType,
        }));

        // Numero de feedbacks por categoria (PieChart)
        const feedbacksByCategory = await Feedback.findAndCountAll({
            attributes: ['category'],
            group: ['category'],
        });

        const pieChartDataCategory = feedbacksByCategory.count.map((item, index) => ({
            id: index,
            value: item.count,
            label: item.category,
        }));


        // Numero de feedbacks por cliente (PieChart)
        const feedbacksByClient = await Feedback.findAll({
            include: [{ model: Client, as: "Client", attributes: [] }],
            attributes: [
                [col("Client.id"), "clientId"],
                [fn("CONCAT", col("Client.name"), literal("' '"), col("Client.lastname")), "clientName"],
                [fn("COUNT", col("Feedback.id")), "total"],
            ],
            group: ["Client.id", "Client.name", "Client.lastname"],
            order: [[fn("COUNT", col("Feedback.id")), "DESC"]],
        });

        const pieChartDataClient = feedbacksByClient.map((item: any, index) => ({
            id: index,
            value: item.toJSON().total,
            label: item.toJSON().clientName,
        }));

        const response = {
            feedbacksByOpinionType: [{ data: pieChartData }],
            feedbacksByCategory: [{ data: pieChartDataCategory }],
            feedbacksByClient: [{ data: pieChartDataClient }],
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error obteniendo estadísticas de feedback' }, { status: 500 });
    }
}
