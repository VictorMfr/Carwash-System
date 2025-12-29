import { NextResponse } from "next/server";
import { Feedback, Client, Category, OpinionType } from "@/services/backend/models/associations";

type PieEntry = { id: number; value: number; label: string };

export async function GET() {
    try {
        const feedbacks = await Feedback.findAll({
            include: [
                { model: Client, as: 'Client', attributes: ['id', 'name', 'lastname'] },
                { model: Category, as: 'Category', attributes: ['id', 'name'] },
                { model: OpinionType, as: 'OpinionType', attributes: ['id', 'name'] },
            ],
        });

        const byOpinion: Record<string, number> = {};
        const byCategory: Record<string, number> = {};
        const byClient: Record<string, number> = {};

        feedbacks.forEach((fb: any) => {
            const opinion = fb?.OpinionType?.name ?? 'Sin tipo';
            const category = fb?.Category?.name ?? 'Sin categoría';
            const clientName = `${fb?.Client?.name ?? 'N/A'} ${fb?.Client?.lastname ?? ''}`.trim();

            byOpinion[opinion] = (byOpinion[opinion] ?? 0) + 1;
            byCategory[category] = (byCategory[category] ?? 0) + 1;
            byClient[clientName] = (byClient[clientName] ?? 0) + 1;
        });

        const toPie = (map: Record<string, number>, limit?: number): PieEntry[] => {
            const entries = Object.entries(map)
                .sort((a, b) => b[1] - a[1]);
            const limited = typeof limit === 'number' ? entries.slice(0, limit) : entries;
            return limited.map(([label, value], idx) => ({ id: idx, label, value }));
        };

        const feedbacksByOpinionType = toPie(byOpinion);
        const feedbacksByCategory = toPie(byCategory);
        const feedbacksByClient = toPie(byClient, 20);

        return NextResponse.json({
            feedbacksByOpinionType,
            feedbacksByCategory,
            feedbacksByClient,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error obteniendo estadísticas de feedback' }, { status: 500 });
    }
}
