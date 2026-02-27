import { ModuleStackCardsData } from "@/types/stackcards/stackcards";
import dayjs from "dayjs";

const FinanceStackCards: ModuleStackCardsData = {
    url: 'https://ve.dolarapi.com/v1/dolares',
    description: 'Aquí puedes ver las finanzas de tu empresa.',
    config: {
        cardWidth: 12,
        cardHeight: 160,
    },
    data: [
        {
            id: '1',
            fetchCard: {
                dataDisplayDirection: 'row',
                caption: 'Tasa de dolar',
                mapper: (data) => {
                    return data.map((item: any) => {
                        return {
                            [item.nombre]: `${item.promedio}bs`,
                            Fecha: dayjs(item.fechaActualizacion).format('DD/MM/YYYY'),
                        }
                    });
                },
            },
            size: { xs: 12, md: 6 },
        },
        {
            id: '2',
            textCard: {
                caption: 'Total de finanzas',
                title: 'Total de finanzas',
                description: 'Aquí puedes ver el total de finanzas de tu empresa.',
            },
            size: { xs: 12, md: 6 },
        }
    ]
}

export default FinanceStackCards;