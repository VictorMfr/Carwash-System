import { ModuleStatsData } from "@/types/stats/stats";
import { BarChart } from "@mui/icons-material";

const MarketingStatsModule: ModuleStatsData = {
    url: '/api/marketing/statistics',
    loadingType: 'spinner',
    size: 'small',
    label: 'Estadísticas de Clientes',
    description: 'Fidelidad, morosidad y frecuencia',
    icon: BarChart,
    tabs: [
        {
            label: 'Clientes',
            description: 'Top 10 por categoría',
            useMenu: true,
            graphs: [
                { id: 1, label: 'Clientes más fieles', type: 'pie', expectsFillArray: 'loyalClients' },
                { id: 2, label: 'Clientes más morosos', type: 'pie', expectsFillArray: 'delinquentClients' },
                { id: 3, label: 'Clientes más frecuentes', type: 'pie', expectsFillArray: 'frequentClients' },
            ],
        },
    ],
};

export default MarketingStatsModule;