import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// Manejar error de API
export const handleApiError = (error: unknown, uiContext: any) => {
    if (error instanceof AxiosError) {
        const apiError = error.response?.data?.error || error.response?.data?.message || error.message || 'Ocurrió un error en la solicitud';
        console.log(apiError, error);
        uiContext.setSnackbar({ open: true, message: apiError, severity: 'error' });
    } else if (error instanceof Error) {
        console.log(error);
        uiContext.setSnackbar({ open: true, message: error.message || 'Ocurrió un error', severity: 'error' });
    } else {
        console.log(error);
        uiContext.setSnackbar({ open: true, message: 'Ocurrió un error desconocido', severity: 'error' });
    }
}

// Manejar error de servidor
export const handleServerError = (error: unknown) => {

    const functionCalledWithoutError = "La funcion handleServerError fue llamada sin un error";

    if (!error) {
        console.log(functionCalledWithoutError);
        return NextResponse.json({ error: functionCalledWithoutError }, { status: 500 });
    }

    // Verificar si es un error de axios
    if (error instanceof AxiosError) {
        const axiosError = "Axios Error: " + error.response?.data?.error || error.response?.data?.message || error.message || 'Ocurrió un error en la solicitud';
        console.log(axiosError);
        return NextResponse.json({ error: axiosError }, { status: 500 });
    }

    if (error instanceof ZodError) {
        const zodError = "Zod Error: " + error.issues.map(issue => issue.message).join('; ');
        console.log(zodError);
        return NextResponse.json({ error: zodError }, { status: 500 });
    }

    // Verificar si es un error
    if (error instanceof Error) {
        console.log(error);
        return NextResponse.json({ error: error.message || 'Ocurrio un error al procesar la solicitud' }, { status: 500 });
    }
    

    console.log(error);
    // Verificar si es un error desconocido
    return NextResponse.json({ error: 'Ocurrió un error desconocido' }, { status: 500 });
}
    
