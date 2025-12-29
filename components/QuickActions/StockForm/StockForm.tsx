'use client';

import ModuleForm from "@/components/ModuleForm";
import stockQuickFormSettings from "./config";
import useFormDataController, { FormInput } from "@/components/ModuleForm/FormDataController";
import { useState } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { Button, Stack } from "@mui/material";

const StockForm = () => {
    const uiContext = useUIDisplayControls();
    const { initialFormInputs } = useFormDataController(stockQuickFormSettings.columns);
    const [formValue, setFormValue] = useState<FormInput[]>(initialFormInputs);

    const buildPayload = () => {
        if (stockQuickFormSettings.columns.contentType === 'multipart/form-data') {
            const fd = new FormData();
            formValue.forEach(({ field, value }) => {
                if (value === null || value === undefined) return;
                if (value instanceof Blob) {
                    fd.append(field, value);
                } else if (typeof value === 'object') {
                    if ('id' in (value as any)) {
                        fd.append(field, (value as any).id);
                    } else {
                        fd.append(field, JSON.stringify(value));
                    }
                } else {
                    fd.append(field, value as any);
                }
            });
            return fd;
        }

        const data: Record<string, any> = {};
        formValue.forEach(({ field, value }) => {
            data[field] = value;
        });
        return data;
    };

    const submit = async () => {
        try {
            const payload = buildPayload();
            await api.post('/api/stock/details', payload, {
                headers: stockQuickFormSettings.columns.contentType === 'multipart/form-data'
                    ? { 'Content-Type': 'multipart/form-data' }
                    : undefined,
            });
            uiContext.setSnackbar({ open: true, message: 'Producto agregado correctamente', severity: 'success' });
            setFormValue(initialFormInputs);
        } catch (error) {
            handleApiError(error, uiContext);
        }
    };

    return (
        <Stack spacing={2}>
            <ModuleForm
                settings={stockQuickFormSettings.columns}
                formValue={formValue}
                onChangeFormData={setFormValue}
            />
            <Button variant="contained" onClick={submit}>
                Enviar
            </Button>
        </Stack>
    );
};

export default StockForm;

