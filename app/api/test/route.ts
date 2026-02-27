import { NextRequest, NextResponse } from "next/server";
import { Stock, StockDetails } from "@/services/backend/models/associations";

export async function POST(request: NextRequest) {
    
}

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: 'Hello, world!' });
}

export async function PUT(request: NextRequest) {
    const { id, name } = await request.json();
    return NextResponse.json({ message: 'Hello, ' + name + '!' });
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    return NextResponse.json({ message: 'Hello, ' + id + '!' });
}
