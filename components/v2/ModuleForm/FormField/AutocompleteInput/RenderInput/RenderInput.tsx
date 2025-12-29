import { AutocompleteRenderInputParams } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function RenderInput(params: AutocompleteRenderInputParams, error: any, label: string) {
    return <TextField {...params} error={error} label={label} />
}