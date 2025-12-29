import { ModuleStatsData } from "@/types/stats/stats";
import { BarChart } from "@mui/icons-material";

const FeedbackStatsModule: ModuleStatsData = {
    url: '/api/marketing/feedback/statistics',
    loadingType: 'spinner',
    size: 'small',
    label: 'Estadísticas de Feedback',
    description: 'Distribución por tipo de opinión, categoría y cliente.',
    icon: BarChart,
    tabs: [
        {
            label: 'Feedback',
            description: 'Totales por tipo de opinión, categoría y clientes con más feedbacks.',
            useMenu: true,
            graphs: [
                { id: 1, label: 'Feedbacks por tipo de opinión', type: 'pie', expectsFillArray: 'feedbacksByOpinionType' },
                { id: 2, label: 'Feedbacks por categoría', type: 'pie', expectsFillArray: 'feedbacksByCategory' },
                { id: 3, label: 'Feedbacks por cliente (Top 20)', type: 'pie', expectsFillArray: 'feedbacksByClient' },
            ],
        },
    ],
};

export default FeedbackStatsModule;

