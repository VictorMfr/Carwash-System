import { ModuleStatsData } from "@/types/stats/stats";
import { BarChart } from "@mui/icons-material";

const StockStats: ModuleStatsData = {
    url: '/api/stock/statistics',
    loadingType: 'spinner',
    size: 'small',
    label: 'Estadísticas',
    description: 'Aquí puedes ver las estadísticas de tu inventario.',
    icon: BarChart,
    tabs: [
        {
            label: 'Productos',
            description: 'Descripción de la pestaña de productos',
            useMenu: true,
            graphs: [
                {
                    id: 1,
                    label: 'Productos por Marca',
                    expectsFillArray: 'productsByBrand',
                    type: 'pie',
                },
                {
                    id: 2,
                    label: 'Productos por Estado',
                    expectsFillArray: 'productsByState',
                    type: 'pie'
                }
            ]
        },
        {
            label: 'Inventario',
            description: 'Descripción de la pestaña de productos por estado',
            useMenu: true,
            graphs: [
                {
                    id: 1,
                    label: 'Costo por mes',
                    type: 'line',
                    expectsFillArray: 'costData',
                    axis: {
                        x: 'month',
                        y: 'cost'
                    }
                },
                {
                    id: 2,
                    label: 'Entrada por mes',
                    type: 'line',
                    expectsFillArray: 'entryData',
                    axis: {
                        x: 'month',
                        y: 'entry'
                    }
                }
            ]
        }
    ]
};

export default StockStats;