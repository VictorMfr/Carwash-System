'use client';

import form from "@/types/v2/form/form";
import ModuleForm from "../v2/ModuleForm";
import useGetFormStateControls from "../v2/ModuleForm/utils/useGetFormStateControls";
import { Stack } from "@mui/material";
import RecipeCartInput from "../Service/components/RecipeCartInput/RecipeCartInput";
import { useEffect } from "react";

export default function TestPageServer() {


    const settings: form = {
        config: {},
        contentType: 'application/json',
        fields: [
            {
                id: 'recipe',
                field: 'recipe',
                headerName: 'Receta',
                size: 6,
                custom: RecipeCartInput
            }
        ]
    };

    const controls = useGetFormStateControls(settings.fields);

    useEffect(() => {
        console.log(controls.formState)
    }, [controls.formState]);

    return (
        <Stack spacing={2}>
            <ModuleForm settings={settings} controls={controls} />
        </Stack>
    );
}