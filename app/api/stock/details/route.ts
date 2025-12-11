import { handleServerError } from "@/lib/error";
import { Stock, Brand, State, StockDetails, Product, Transaction, Account, Method } from "@/services/backend/models/associations";
import { NextRequest, NextResponse } from "next/server";
import { storeAndGetPicturePath } from "@/lib/pictures";
import db from "@/services/backend/db";

// Crear un detalle de stock dado un id de stock
export async function POST(request: NextRequest) {
    try {
        const form = await request.formData();
        const stock = form.get('stock') as any;
        const state = form.get('state') as any;
        const brand = form.get('brand') as any;
        const quantity = form.get('quantity');
        const entry_date = form.get('entry_date');
        const picture = form.get('picture');
        const bol_charge = form.get('bol_charge');
        const dollar_charge = form.get('dollar_charge');
        const dollar_rate = form.get('dollar_rate');
        const charge_account = form.get('charge_account') as any;
        const method = form.get('method') as any;

        console.log('VALOR DE form', form);

        if (!stock || !state || !brand || !quantity || !entry_date || !picture) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // parsear el stock, estado, marca a objetos
        const stockObj = JSON.parse(stock as string);
        const stateObj = JSON.parse(state as string);
        const brandObj = JSON.parse(brand as string);
        const chargeAccountObj = charge_account ? JSON.parse(charge_account as string) : undefined;
        const methodObj = method ? JSON.parse(method as string) : undefined;

        const picturePath = await storeAndGetPicturePath(picture, 'stockDetails');

        const DBStock = await Stock.findByPk(stockObj.id, { include: [{ model: Product, as: 'Product' }] }	);
        if (!DBStock) {
            return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
        }

        const [day, month, year] = (entry_date as string).split('-');
        const entryDate = new Date(Number(year), Number(month) - 1, Number(day));

        // Calcular monto en bolívares (si viene en dólares, convertir con tasa)
        const rateNumber = dollar_rate ? Number(dollar_rate) : undefined;
        let amountBolivares: number | undefined = undefined;
        if (bol_charge) {
            amountBolivares = Number(bol_charge);
        } else if (dollar_charge && rateNumber) {
            amountBolivares = Number(dollar_charge) * rateNumber;
        }

        // Ejecutar todo en transacción
        const result = await db.transaction(async (t) => {
            // Crear detalle de stock
            const stockDetail = await DBStock.createStockDetail({
                quantity: Number(quantity),
                entry_date: entryDate,
                picture: picturePath,
            }, { transaction: t });

            await stockDetail.setBrand(brandObj.id, { transaction: t });
            await stockDetail.setState(stateObj.id, { transaction: t });

            // Si hay datos financieros, crea la transacción y enlaza
            let createdTx: Transaction | undefined;
            if (typeof amountBolivares === 'number' && Number.isFinite(amountBolivares) && amountBolivares > 0) {
                const tx = await Transaction.create({
                    date: entryDate,
                    // Almacena como egreso (negativo)
                    amount: -Math.abs(amountBolivares),
                    description: `Compra inventario: ${DBStock.Product?.name ?? ''} - ${brandObj?.name ?? ''}`.trim(),
                    dollar_rate: rateNumber ?? undefined as any
                }, { transaction: t });

                if (chargeAccountObj?.id) {
                    await tx.setAccount(chargeAccountObj.id, { transaction: t });
                }
                if (methodObj?.id) {
                    await tx.setMethod(methodObj.id, { transaction: t });
                }

                await stockDetail.setTransaction(tx.id, { transaction: t });
                createdTx = tx;
            }

            return { stockDetail, createdTx };
        });

        const { stockDetail, createdTx } = result;

        const formatted = {
            ...stockDetail.toJSON(),
            name: `${DBStock.Product.name}/${brandObj.name}`,
            bol_charge: amountBolivares ? Math.abs(Number(amountBolivares)) : undefined,
            dollar_rate: rateNumber,
            dollar_charge: amountBolivares && rateNumber ? Math.abs(Number(amountBolivares)) / rateNumber : undefined,
            charge_account: chargeAccountObj?.name,
            method: methodObj?.name,
            transactionId: createdTx?.id
        }

        return NextResponse.json(formatted);

    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}

// Get all stock details
export async function GET(request: NextRequest) {
    try {
        const stockDetails = await StockDetails.findAll({
            include: [
                { model: Stock, as: 'Stock', include: [{ model: Product, as: 'Product' }] },
                { model: Brand, as: 'Brand' },
                { model: State, as: 'State' },
                {
                    model: Transaction,
                    as: 'Transaction',
                    include: [
                        { model: Account, as: 'Account' },
                        { model: Method, as: 'Method' }
                    ]
                }
            ]
        });

        const formatted = stockDetails.map((stockDetail) => {
            const tx = (stockDetail as any).Transaction;
            return {
                ...stockDetail.toJSON(),
                name: `${stockDetail.Stock.Product.name}/${stockDetail.Brand.name}/Dips. ${stockDetail.quantity}`,
                brand: stockDetail.Brand?.name,
                state: stockDetail.State?.name,
                bol_charge: tx ? Math.abs(Number(tx.amount)) : undefined,
                dollar_rate: tx?.dollar_rate,
                dollar_charge: tx && tx.dollar_rate ? Math.abs(Number(tx.amount)) / Number(tx.dollar_rate) : undefined,
                charge_account: tx?.Account?.name,
                method: tx?.Method?.name,
                transactionId: tx?.id
            }
        });

        if (!stockDetails) {
            return NextResponse.json({ error: 'Stock details not found' }, { status: 404 });
        }

        return NextResponse.json(formatted);
    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}