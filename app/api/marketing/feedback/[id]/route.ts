import { Feedback } from "@/services/backend/models/associations";
import { NextRequest } from "next/server";
import { handleServerError } from "@/lib/error";
import { NextResponse } from "next/server";



export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { description, category, opinionType, client } = await request.json();

        const feedback = await Feedback.findByPk(id);

        if (!feedback) throw new Error('Feedback no encontrado');

        if (description) feedback.description = description;
        if (category) feedback.category = category;
        if (opinionType) feedback.opinionType = opinionType;

        await feedback.save();

        return NextResponse.json({ ...feedback.toJSON(), client });
    } catch (error) {
        return handleServerError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const feedback = await Feedback.findByPk(id);

        if (!feedback) throw new Error('Feedback no encontrado');

        await feedback.destroy();

        return NextResponse.json(feedback);
    } catch (error) {
        return handleServerError(error);
    }
}