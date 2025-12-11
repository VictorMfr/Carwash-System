import StockDetailsPage from "@/components/StockDetails/StockDetailsPage";
import { Stock } from "@/services/backend/models/associations";


// Componente de servidor
export default async function StockDetailsPageServer({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Obtener stock y su producto para obtener la unidad para adornar
    const stock = await Stock.findByPk(id);
    const product = stock ? await stock.getProduct() : null;

    return <StockDetailsPage stockId={id} product={product ? product.toJSON() : null} />
}

