import useGraphController from "./controller";
import LinearChart from "./LinearChart/LinearChart";
import PieChart from "./PieChart/PieChart";
import BarChart from "./BarChart/BarChart";
import Loading from "@/components/Loading/LoadingPage";
import { Box } from "@mui/material";

export default function Graph() {

    const { tab, settings, loading, data } = useGraphController();

    if (loading) {
        return <Loading/>
    }

    const graph = data[settings.tabs[tab].expect];

    if (settings.tabs[tab].linearChart) {
        return <LinearChart data={graph} />
    }

    if (settings.tabs[tab].pieChart) {
        return <PieChart data={graph}/>
    }
    
    if (settings.tabs[tab].barChart) {
        return <BarChart data={graph} />
    }

    return <Box>No hay gráfico</Box>;
}