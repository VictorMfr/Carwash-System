import { LineChart as MuiLineChart } from "@mui/x-charts";

export default function LinearChart({ 
    data 
}: { 
    data: any 
}) {
    return (
        <MuiLineChart
            xAxis={data?.xAxis}
            series={data?.series}
            height={300}
        />
    )
}