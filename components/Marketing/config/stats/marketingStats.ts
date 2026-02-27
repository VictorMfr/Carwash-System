import { stats } from "@/types/v2/stats/stats";


export const marketingStats: stats = {
    url: '/api/marketing/statistics',
    tabs: [
        {
            label: 'Clientes',
            expect: 'spentByClient',
            pieChart: true
        },
        {
            label: 'Servicios por cliente',
            expect: 'totalServices',
            pieChart: true
        }
    ]
}