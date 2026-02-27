import { BarChart as MuiBarChart } from "@mui/x-charts";

export default function BarChart({ 
    data,
}: { 
    data: any 
}) {
    return (
        <MuiBarChart
            xAxis={data?.xAxis}
            series={data?.series}
            height={300}
        />
    )
}