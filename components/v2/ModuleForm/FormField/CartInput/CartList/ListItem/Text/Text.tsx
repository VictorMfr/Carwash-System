import { ListItemText, Tooltip } from "@mui/material";

export default function Text({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <Tooltip title={title}>
            <ListItemText primary={title} secondary={subtitle}/>
        </Tooltip>
    )
}