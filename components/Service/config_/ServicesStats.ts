import { ModuleStatsData } from "@/types/stats/stats";
import { BarChart } from "@mui/icons-material";

const ServicesStats: ModuleStatsData = {
    url: '/api/service/statistics',
    loadingType: 'spinner',
    size: 'small',
    label: 'Estadísticas',
    description: 'Aquí puedes ver las estadísticas de tus servicios.',
    icon: BarChart,
    tabs: [
        {
            label: 'Servicios',
            description: 'Servicios',
            useMenu: true,
			graphs: [
				{
					id: 1,
					label: 'Servicios por receta',
					type: 'pie',
					expectsFillArray: 'servicesByRecipe'
				},
				{
					id: 2,
					label: 'Servicios por vehículo',
					type: 'pie',
					expectsFillArray: 'servicesByVehicle'
				},
				{
					id: 3,
					label: 'Servicios por operador',
					type: 'pie',
					expectsFillArray: 'servicesByOperator'
				},
				{
					id: 4,
					label: 'Servicios por mes (últimos 6 meses)',
					type: 'line',
					expectsFillArray: 'servicesByMonth',
					axis: { x: 'month', y: 'count' }
				}
			]
        }
    ]
}

export default ServicesStats;