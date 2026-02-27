import { PieChart as MuiPieChart } from "@mui/x-charts";

export default function PieChart({ 
    data,
}: { 
    data: any 
}) {
    return (
        <MuiPieChart
            series={data}
            width={200}
            height={200}
        />
    )
}