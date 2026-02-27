import { stats } from "@/types/v2/stats/stats";

export const feedbackStats: stats = {
    url: '/api/marketing/feedback/statistics',
    tabs: [
        {
            label: 'Por tipo de opinión',
            expect: 'feedbacksByOpinionType',
            pieChart: true
        },
        {
            label: 'Por categoría',
            expect: 'feedbacksByCategory',
            pieChart: true
        },
        {
            label: 'Por cliente',
            expect: 'feedbacksByClient',
            pieChart: true
        }
    ]
}