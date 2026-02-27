'use client';

import ModuleDataGrid from "../v2/ModuleDataGrid";
import { Stack } from "@mui/material";
import { feedbackDatagrid } from "./config/feedbackDatagrid/datagrid";
import ModuleStats from "../v2/ModuleStats";
import { feedbackStats } from "./config/feedbackStats/feedbackStats";

export default function FeedbackPage() {
    
    
    
    return (
        <Stack spacing={2}>
            <ModuleStats settings={feedbackStats} />        
            <ModuleDataGrid settings={feedbackDatagrid} />
        </Stack>
    )
}