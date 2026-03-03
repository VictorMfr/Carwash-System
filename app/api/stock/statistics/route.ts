import { NextResponse } from "next/server";
import { StockDetails, Brand, Stock, Product, State, Transaction } from "@/services/backend/models/associations";

export async function GET() {
    try {

        /*
        statisticas:
        - productos por marca (Pie Chart)
        - productos por estado (Pie Chart)
        - entrada por mes (Line Chart)
        - costo por mes (Line Chart)
        */

        // ordenado por fecha de entrada
        const stockDetails = await StockDetails.findAll({
            include: [
                {
                    model: Stock,
                    as: 'Stock',
                    include: [
                        {
                            model: Product,
                            as: 'Product',
                            attributes: ['name'],
                        }
                    ]
                },
                {
                    model: Brand,
                    as: 'Brand',
                    attributes: ['name'],
                },
                {
                    model: State,
                    as: 'State',
                    attributes: ['name'],
                },
                {
                    model: Transaction,
                    as: 'Transaction',
                    required: false,
                    attributes: ['amount'],
                },
            ],
            order: [['entry_date', 'DESC']]
        });

        if (!stockDetails) {
            return NextResponse.json({ error: "Stock details not found" }, { status: 404 });
        }

        // Productos por marca (Pie Chart)
        let productsByBrand = [];
        let productsByBrandMap: any = {};

        stockDetails.forEach((details: any) => {
            const brandName = details.Brand?.name ?? 'Sin marca';
            if (!productsByBrandMap[brandName]) {
                productsByBrandMap[brandName] = 0;
            }
            productsByBrandMap[brandName]++;
        })

        productsByBrand = Object.entries(productsByBrandMap).map(([brand, count], idx) => ({
            id: idx,
            value: count,
            label: brand,
        }));

        // Productos por estado (Pie Chart)
        let productsByState = [];
        let productsByStateMap: any = {};

        stockDetails.forEach((details: any) => {
            const stateName = details.State?.name ?? 'Sin estado';
            if (!productsByStateMap[stateName]) {
                productsByStateMap[stateName] = 0;
            }
            productsByStateMap[stateName]++;
        })

        productsByState = Object.entries(productsByStateMap).map(([state, count], idx) => ({
            id: idx,
            value: count,
            label: state,
        }));


        // Costos agregados por mes para el gráfico de líneas (Line Chart)
        const monthlyCostMap: Record<string, number> = {};
        stockDetails.forEach((details: any) => {
            const date = new Date(details.entry_date);
            const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const txAmount = Number(details.Transaction?.amount ?? 0);
            monthlyCostMap[month] = (monthlyCostMap[month] || 0) + txAmount;
        });

        const costData = Object.keys(monthlyCostMap)
            .sort()
            .map(month => ({ month, cost: monthlyCostMap[month] }))
            .slice(-6); // last 6 months

        const consumptionData: any[] = [];

        // Entry by month (Line Chart)
        const entryByMonthMap: Record<string, number> = {};
        stockDetails.forEach(details => {
            const date = new Date(details.entry_date);
            const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            entryByMonthMap[month] = (entryByMonthMap[month] || 0) + 1;
        });
        
        const entryData = Object.keys(entryByMonthMap)
            .sort()
            .map(month => ({ month, entry: entryByMonthMap[month] }))
            .slice(-6); // last 6 months

        return NextResponse.json({ productsByBrand, productsByState, consumptionData, costData, entryData });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error getting stock statistics" }, { status: 500 });
    }
}


