'use client';

import ModuleForm from "../v2/ModuleForm";
import form from "@/types/v2/form/form";
import useGetFormStateControls from "../v2/ModuleForm/utils/useGetFormStateControls";
import { useEffect } from "react";
import { z } from "zod";

const testForm: form = {
    config: { spacing: 2 }, 
    contentType: 'application/json',
    fields: {
        title: 'Stepper',
        orientation: 'horizontal',
        config: { spacing: 2, size: 12 },
        steps: [
            {
                config: { spacing: 2 },
                title: 'Step 1',
                description: 'Step 1 description',
                validation: z.object({
                    name: z.string().min(1),
                }),
                fields: [
                    {
                        id: 'name',
                        field: 'name',
                        headerName: 'Nombre',
                        size: 12
                    }
                ]
            },
            {
                config: { spacing: 2 },
                title: 'Step 2',
                description: 'Step 2 description',
                fields: [
                    {
                        id: 'phone',
                        field: 'phone',
                        headerName: 'Teléfono',
                        size: 12
                    },
                    {
                        id: 'password',
                        field: 'password',
                        headerName: 'Contraseña',
                        size: 12
                    }
                ]
            },
            {
                config: { spacing: 2 },
                title: 'Step 3',
                description: 'Step 3 description',
                fields: [
                    {
                        id: 'address',
                        field: 'address',
                        headerName: 'Dirección',
                        size: 12
                    },
                ]
            }
        ]
    },
}


export default function TestPageServer() {
    const controls = useGetFormStateControls(testForm.fields);

    useEffect(() => {
        console.log(controls.formState);
    }, [controls.formState]);

    return <ModuleForm settings={testForm} controls={controls} />;
}