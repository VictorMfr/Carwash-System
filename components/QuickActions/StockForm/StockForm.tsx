'use client';

import ModuleForm from "@/components/v2/ModuleForm";
import { stockQuickFormSettings } from "./config/form";
import useGetFormStateControls from "@/components/v2/ModuleForm/utils/useGetFormStateControls";
import formStateField from "@/types/v2/form/controller/formStateField/formStateField";
import getFormData from "@/components/v2/ModuleForm/utils/getFormData";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import api from "@/lib/axios";
import { handleApiError } from "@/lib/error";
import { useRouter } from "next/navigation";

const buildPayload = (formData: Record<string, any>) => {
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        const normalizedKey = key === 'inventory' ? 'stock' : key;

        if (value instanceof File || value instanceof Blob) {
            payload.append(normalizedKey, value);
            return;
        }

        if (typeof value === 'object') {
            payload.append(normalizedKey, JSON.stringify(value));
            return;
        }

        payload.append(normalizedKey, value as any);
    });

    return payload;
};

const StockForm = () => {
    const uiContext = useUIDisplayControls();
    const router = useRouter();

    const controls = useGetFormStateControls(stockQuickFormSettings.fields, {
        onSubmit: async (formState: formStateField[]) => {
            try {
                uiContext.setLoading(true);
                const payload = buildPayload(getFormData(formState));
                await api.post('/api/stock/details', payload, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                uiContext.setSnackbar({
                    open: true,
                    message: 'Producto agregado correctamente',
                    severity: 'success',
                });

                const repeat = window.confirm('Desea registrar otro producto?');
                if (repeat) {
                    window.location.reload();
                }

                router.push('/dashboard');
            } catch (error) {
                handleApiError(error, uiContext);
            } finally {
                uiContext.setLoading(false);
            }
        },
        onCancel: () => {
            router.push('/dashboard');
        },
    });

    return (
        <ModuleForm
            settings={stockQuickFormSettings}
            controls={controls}
        />
    );
}

export default withUIDisplayControls(StockForm);