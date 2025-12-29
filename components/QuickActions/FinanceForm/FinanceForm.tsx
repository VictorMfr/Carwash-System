'use client';

import ModuleForm from "@/components/ModuleForm";
import FinanceModule from "@/components/Finance/config/FinanceModule";
import useFormDataController, { FormInput } from "@/components/ModuleForm/FormDataController";
import { FormData } from "@/types/form/form";
import { useState } from "react";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import { Fragment } from "react";
import { Button } from "@mui/material";

const financeFormSettings: FormData = {
    config: FinanceModule.columns.config,
    data: FinanceModule.columns.data as any,
};

const FinanceForm = () => {
    const uiContext = useUIDisplayControls();
    const { initialFormInputs, validateForm, sendFormErrors } = useFormDataController(financeFormSettings);
    const [formValue, setFormValue] = useState<FormInput[]>(initialFormInputs);
    const [activeStep, setActiveStep] = useState<number>(0);

    const submit = async () => {
        const errors = validateForm(formValue, FinanceModule.config?.create?.validation);
        if (errors) return sendFormErrors(errors, setFormValue);

        const data: Record<string, any> = {};
        formValue.forEach(({ field, value }) => {
            data[field] = value;
        });

        try {
            await api.post('/api/finance', data);
            uiContext.setSnackbar({ open: true, message: 'Transacción agregada correctamente', severity: 'success' });
            setFormValue(initialFormInputs);
            setActiveStep(0);
        } catch (error) {
            handleApiError(error, uiContext);
        }
    };

    return (
        <Fragment>
            <ModuleForm
                settings={financeFormSettings}
                formValue={formValue}
                onChangeFormData={setFormValue}
                onSubmit={submit}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
            />
            <Button variant="contained" color="primary" onClick={submit}>Enviar</Button>
        </Fragment>
    );
};

export default FinanceForm;

