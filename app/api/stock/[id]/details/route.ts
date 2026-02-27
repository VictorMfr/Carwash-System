import { handleServerError } from "@/lib/error";
import { storeAndGetPicturePath } from "@/lib/pictures";
import { Brand, State, Stock, StockDetails, Transaction, Account, Method } from "@/services/backend/models/associations";
import { decrypt, getSession } from "@/lib/session";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import getModel from "@/lib/apiUtils/model/getModel";
import createModel from "@/lib/apiUtils/model/createModel";
import { StockDetailsObjectSchema } from "@/lib/definitions";

// Obtener todos los detalles de stock
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return getModel(Stock, params, async (stock) => {
        if (!stock) {
            // Mantener el comportamiento previo: 404 si no existe el stock
            throw new Error("STOCK_NOT_FOUND");
        }

        const records: any[] = [];
        const details = (stock as any).StockDetails ?? [];

        details.forEach((stockDetail: any) => {
            const entryDate = dayjs(stockDetail.entry_date).format("DD-MM-YYYY");
            const tx = stockDetail.Transaction;

            const brandObj = stockDetail.Brand
                ? { id: stockDetail.Brand.id, name: stockDetail.Brand.name }
                : null;
            const stateObj = stockDetail.State
                ? { id: stockDetail.State.id, name: stockDetail.State.name }
                : null;
            const accountObj = tx?.Account
                ? { id: tx.Account.id, name: tx.Account.name }
                : null;
            const methodObj = tx?.Method
                ? { id: tx.Method.id, name: tx.Method.name }
                : null;

            records.push({
                ...stockDetail.toJSON(),
                entry_date: entryDate,
                brand: stockDetail.Brand?.name,
                state: stockDetail.State?.name,
                brandObj,
                stateObj,
                bol_charge: tx ? Math.abs(Number(tx.amount)) : undefined,
                dollar_rate: tx?.dollar_rate,
                dollar_charge:
                    tx && tx.dollar_rate
                        ? Math.abs(Number(tx.amount)) / Number(tx.dollar_rate)
                        : undefined,
                charge_account: tx?.Account?.name,
                method: tx?.Method?.name,
                charge_accountObj: accountObj,
                methodObj,
            });
        });

        return records;
    }, {
        findOptions: {
            include: {
                model: StockDetails,
                as: "StockDetails",
                include: [
                    { model: Brand, as: "Brand" },
                    { model: State, as: "State" },
                    {
                        model: Transaction,
                        as: "Transaction",
                        include: [
                            { model: Account, as: "Account" },
                            { model: Method, as: "Method" },
                        ],
                    },
                ],
            },
        },
    });
}

// Crear un detalle de stock
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // encontrar stock por id
        const stock = await Stock.findByPk(id);
        if (!stock) {
            return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
        }      
        
        const validationSchema = StockDetailsObjectSchema;

        return await createModel({
            model: StockDetails,
            validationSchema: validationSchema,
            request,
            preValidate: async (data) => {
                const pictureFile = data.picture as FormDataEntryValue | null;

                if (!(pictureFile instanceof File)) {
                    throw new Error('La imagen es requerida');
                }

                const picturePath = await storeAndGetPicturePath(pictureFile, 'stockDetails');

                // Asegurar que la fecha se mantenga como Date
                let entryDate = data.entry_date;
                if (!(entryDate instanceof Date)) {
                    entryDate = new Date(entryDate as any);
                }

                return {
                    ...data,
                    entry_date: entryDate,
                    picture: picturePath,
                };
            },
            preCreate: async (validatedData) => {
                return {
                    ...validatedData,
                    StockId: stock.id,
                };
            },
            postCreate: async (validatedData, detail) => {
                const v: any = validatedData;

                const brandDetail = v.brand;
                const stateDetail = v.state;

                if (brandDetail?.id) {
                    await detail.setBrand(brandDetail.id);
                }
                if (stateDetail?.id) {
                    await detail.setState(stateDetail.id);
                }

                let tx = null;
                try {
                    const accountObj = v.charge_account ?? null;
                    const methodObj = v.method ?? null;
                    const rateNum = typeof v.dollar_rate === 'number' ? v.dollar_rate : undefined;
                    const bolNum = typeof v.bol_charge === 'number' ? v.bol_charge : undefined;
                    const dollarNum = typeof v.dollar_charge === 'number' ? v.dollar_charge : undefined;

                    if (
                        accountObj?.id &&
                        methodObj?.id &&
                        typeof rateNum === 'number' &&
                        (Number.isFinite(bolNum) || Number.isFinite(dollarNum))
                    ) {
                        const amountBs =
                            Number.isFinite(dollarNum) && dollarNum !== undefined && !Number.isNaN(dollarNum)
                                ? Number(dollarNum * rateNum)
                                : (bolNum as number);

                        const amount = -Math.abs(Number(amountBs || 0));

                        tx = await detail.createTransaction({
                            date: v.entry_date,
                            amount,
                            description: `Compra de inventario (${brandDetail?.name ?? 'N/A'})`,
                            dollar_rate: rateNum,
                        });

                        await tx.setAccount(accountObj.id);
                        await tx.setMethod(methodObj.id);

                        try {
                            const session = await getSession();
                            if (session) {
                                const decoded = await decrypt(session);
                                if (decoded?.userId) {
                                    await tx.setUser(Number(decoded.userId));
                                }
                            }
                        } catch { }
                    }
                } catch (financeError) {
                   console.error('Error creando transacción financiera para StockDetail:', financeError);
                }

                const response: any = {
                    ...detail.toJSON(),
                    brand: brandDetail?.name,
                    state: stateDetail?.name,
                };

                if (tx) {
                    response.bol_charge = Math.abs(Number(tx.amount));
                    response.dollar_rate = tx.dollar_rate;
                    response.dollar_charge = tx.dollar_rate
                        ? Math.abs(Number(tx.amount)) / Number(tx.dollar_rate)
                        : undefined;
                    response.charge_account = (await tx.getAccount())?.name;
                    response.method = (await tx.getMethod())?.name;
                    response.transactionId = tx.id;
                } else {
                    const accountObj = v.charge_account ?? null;
                    const methodObj = v.method ?? null;
                    const rateNum = typeof v.dollar_rate === 'number' ? v.dollar_rate : undefined;
                    const bolNum = typeof v.bol_charge === 'number' ? v.bol_charge : undefined;
                    const dollarNum = typeof v.dollar_charge === 'number' ? v.dollar_charge : undefined;

                    const amountBs =
                        Number.isFinite(dollarNum) && dollarNum !== undefined && !Number.isNaN(dollarNum)
                            ? Number(dollarNum * (rateNum ?? 0))
                            : (bolNum as number);

                    response.bol_charge = Math.abs(Number(amountBs || 0));
                    response.dollar_rate = rateNum;
                    response.dollar_charge = rateNum
                        ? Math.abs(Number(response.bol_charge)) / Number(rateNum)
                        : undefined;
                    response.charge_account =
                        accountObj?.name ?? accountObj?.label ?? accountObj?.value ?? accountObj;
                    response.method = methodObj?.name ?? methodObj;
                }

                return response;
            },
        });
    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}

// Update a stock detail
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        const { id } = await params;
        const url = new URL(request.url)        ;
        const detailId = url.pathname.split('/').pop();

        // Validate the request
        const form = await request.formData();
        const quantity = form.get('quantity');
        const price = form.get('price');
        const picture = form.get('picture');
        const entry_date = form.get('entry_date');
        const brandId = form.get('brandId');
        const stateId = form.get('stateId');

        // Store the picture in the uploads folder if provided
        const picturePath = picture ? await storeAndGetPicturePath(picture, 'stockDetails') : null;

        // find stock detail by id
        const stockDetail = await StockDetails.findByPk(detailId);
        if (!stockDetail) {
            return NextResponse.json({ error: 'Stock detail not found' }, { status: 404 });
        }

        // update stock detail (FKs are set via association setters)
        const updateData: any = {
            quantity: Number(quantity),
            price: Number(price),
            entry_date: new Date(entry_date as string)
        };

        // Only update picture if a new one was provided
        if (picturePath) {
            updateData.picture = picturePath;
        }

        await stockDetail.update(updateData);
        if (brandId) await stockDetail.setBrand(Number(brandId));
        if (stateId) await stockDetail.setState(Number(stateId));

        return NextResponse.json(stockDetail);
    } catch (error) {
        return handleServerError(error);
    }
}