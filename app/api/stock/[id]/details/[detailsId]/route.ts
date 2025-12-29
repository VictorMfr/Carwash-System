import { StockDetails, State, Transaction, Account, Method, Brand } from "@/services/backend/models/associations";
import { NextRequest, NextResponse } from "next/server";
import { deleteUploadFile, storePicture } from "@/lib/pictures";
import { handleServerError } from "@/lib/error";

// Acepta fechas en formato dd-mm-aaaa o cualquier entrada válida para new Date
const parseInputDate = (value: any): Date | undefined => {
    if (!value) return undefined;
    const raw = `${value}`.trim();
    const ddMmYyyy = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = raw.match(ddMmYyyy);
    if (match) {
        const [, dd, mm, yyyy] = match;
        const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
        return Number.isNaN(date.getTime()) ? undefined : date;
    }
    const fallback = new Date(raw);
    return Number.isNaN(fallback.getTime()) ? undefined : fallback;
};

const formatDateDDMMYYYY = (value: any): string | undefined => {
    if (!value) return undefined;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return undefined;
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
};


// Actualizar un detalle de stock
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string, detailsId: string }> }) {
    try {
        // Obtener los datos del formulario
        const form = await request.formData();
        const quantity = Number(form.get('quantity'));
        const entry_date = form.get('entry_date');
        const state_id = form.get('state_id');
        const picture = form.get('picture');
        // Financiero (opcional)
        const dollar_rate = form.get('dollar_rate');
        const bol_charge = form.get('bol_charge');
        const dollar_charge = form.get('dollar_charge');
        const charge_account = form.get('charge_account');
        const method = form.get('method');

        // Obtener el id del detalle de stock
        const { detailsId } = await params;

        // encontrar detalle de stock por id
        const detail = await StockDetails.findByPk(detailsId);
        if (!detail) {
            return NextResponse.json({ error: 'Stock detail not found' }, { status: 404 });
        }

        let picturePath: string | undefined = undefined;
        // Solo manejar la imagen si se envió una nueva
        if (picture && picture instanceof File) {
            // Eliminar la imagen antigua primero (mejor esfuerzo)
            if (detail.picture) {
                await deleteUploadFile(detail.picture);
            }
            // Almacenar con un nombre nuevo; NO pasar la ruta pública antigua como nombre
            picturePath = await storePicture(picture as File, 'stockDetails');
        }

        const parsedEntryDate = parseInputDate(entry_date);

        // actualizar campos básicos del detalle de stock
        const updatedDetail = await detail.update({
            quantity,
            entry_date: parsedEntryDate ?? (detail as any).entry_date,
            ...(picturePath ? { picture: picturePath } : {})
        });

        // Opcionalmente actualizar la asociación de estado si se proporciona
        if (state_id) {
            const state = await State.findByPk(Number(state_id));
            if (state) {
                await detail.setState(state.id);
            }
        }

        // Actualizar/crear transacción vinculada si se proporcionan datos financieros
        try {
            const accountObj = charge_account ? JSON.parse(charge_account as string) : null;
            const methodObj = method ? JSON.parse(method as string) : null;
            const rateNum = dollar_rate ? Number(dollar_rate) : undefined;
            const bolNum = bol_charge ? Number(bol_charge) : undefined;
            const dollarNum = dollar_charge ? Number(dollar_charge) : undefined;

            const hasFinance =
                accountObj?.id && methodObj?.id && rateNum &&
                (Number.isFinite(bolNum) || Number.isFinite(dollarNum));

            if (hasFinance) {
                const amountBs = Number.isFinite(dollarNum) && dollarNum !== undefined && !Number.isNaN(dollarNum)
                    ? Number((dollarNum as number) * (rateNum as number))
                    : (bolNum as number);
                const amount = -Math.abs(Number(amountBs || 0));
                const date = parsedEntryDate ?? (detail as any).entry_date;

                const tx = await detail.getTransaction();
                if (tx) {
                    await tx.update({
                        date,
                        amount,
                        dollar_rate: rateNum ?? tx.dollar_rate,
                        // mantener la descripción como está
                    });
                    if (accountObj?.id) await tx.setAccount(accountObj.id);
                    if (methodObj?.id) await tx.setMethod(methodObj.id);
                } else {
                    const newTx = await detail.createTransaction({
                        date,
                        amount,
                        dollar_rate: rateNum ?? 0,
                        description: 'Actualización de inventario'
                    });
                    await newTx.setAccount(accountObj.id);
                    await newTx.setMethod(methodObj.id);
                }
            }
        } catch (e) {
            console.error('Error actualizando/creando transacción del StockDetail:', e);
            // No romper la actualización del detalle
        }
        
        // Construir respuesta incluyendo datos de la transacción actual
        try {
            const tx = await detail.getTransaction();
            const state = await detail.getState();
            const brand = await detail.getBrand();
            const response: any = updatedDetail.toJSON();
            response.entry_date = formatDateDDMMYYYY(updatedDetail.entry_date);
            response.state = state?.name;
            response.brand = brand?.name;
            if (tx) {
                response.bol_charge = Math.abs(Number(tx.amount));
                response.dollar_rate = tx.dollar_rate;
                response.dollar_charge = tx.dollar_rate ? Math.abs(Number(tx.amount)) / Number(tx.dollar_rate) : undefined;
                response.charge_account = (await tx.getAccount())?.name;
                response.method = (await tx.getMethod())?.name;
                response.transactionId = tx.id;
            }
            return NextResponse.json(response);
        } catch {
            return NextResponse.json(updatedDetail);
        }
        
    } catch (error) {
        return handleServerError(error);
    }
}

// Eliminar un detalle de stock
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string, detailsId: string }> }) {
    try {
        const { detailsId } = await params;

        // encontrar detalle de stock por id
        const detail = await StockDetails.findByPk(detailsId, {
            include: [
                { model: Transaction, as: 'Transaction' }
            ]
        });

        if (!detail) {
            return NextResponse.json({ error: 'Stock detail not found' }, { status: 404 });
        }

        // eliminar el detalle de stock
        await detail.destroy();

        // eliminar la transacción
        if (detail.Transaction) {
            await detail.Transaction.destroy();
        }

        // eliminar la imagen
        if (detail.picture) {
            await deleteUploadFile(detail.picture);
        }

        return NextResponse.json(detail);
    } catch (error) {
        return handleServerError(error);
    }
}