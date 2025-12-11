import { ModuleStatsData } from "@/types/stats/stats";
import { BarChart } from "@mui/icons-material";


const FinanceStatsModule: ModuleStatsData = {
    url: '/api/finance/statistics',
    loadingType: 'spinner',
    size: 'small',
    label: 'Estadísticas de Finanzas',
    description: 'Ingresos, costos y tasa de dólar por mes.',
    icon: BarChart,
    tabs: [
        {
            label: 'Finanzas',
            description: 'Series mensuales',
            useMenu: true,
            graphs: [
                {
                    id: 1,
                    label: 'Ingresos por mes',
                    type: 'line',
                    expectsFillArray: 'incomeData',
                    axis: { x: 'month', y: 'income' }
                },
                {
                    id: 2,
                    label: 'Costos por mes',
                    type: 'line',
                    expectsFillArray: 'costData',
                    axis: { x: 'month', y: 'cost' }
                },
                {
                    id: 3,
                    label: 'Tasa dólar promedio por mes',
                    type: 'line',
                    expectsFillArray: 'dollarData',
                    axis: { x: 'month', y: 'dollar' }
                }
            ]
        }
    ]
};

export default FinanceStatsModule;