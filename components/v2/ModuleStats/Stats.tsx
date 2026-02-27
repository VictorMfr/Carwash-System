import { Card, CardContent } from "@mui/material";
import Tabs from "./Tabs/Tabs";
import Graph from "./Graph/Graph";


export default function Stats() {

    return (
        <Card variant="outlined">
            <Tabs />
            <CardContent>
                <Graph/>
            </CardContent>
        </Card>
    )
}