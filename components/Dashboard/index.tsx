'use client';

import { DashboardProvider } from "./context";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { Container, Stack, Theme, SxProps } from "@mui/material";
import SideBar from "./SideBar/SideBar";
import HeaderIndex from "@/components/v2/Dashboard/Header/index";
import { header } from "@/types/v2/dashboard/header/header";
import { Help, Logout } from "@mui/icons-material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import api from "@/lib/axios";
import { UIDisplayControlsContextType } from "@/hooks/UIDisplayControlsProvider";

const icon: any = () => (
    <svg width="36" height="36" viewBox="0 0 202 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M195.703 43.75C198.828 43.75 201.172 46.875 200.391 49.6094L198.047 58.9844C197.656 61.3281 195.703 62.5 193.75 62.5H185.547C191.016 67.1875 194.531 73.8281 194.531 81.25V100C194.531 106.641 191.797 112.109 188.281 116.406V137.5C188.281 144.531 182.422 150 175.781 150H163.281C156.25 150 150.781 144.531 150.781 137.5V125H50.7812V137.5C50.7812 144.531 44.9219 150 38.2812 150H25.7812C18.75 150 13.2812 144.531 13.2812 137.5V116.406C9.375 112.109 7.03125 106.641 7.03125 100V81.25C7.03125 73.8281 10.1562 67.1875 15.625 62.5H7.8125C5.46875 62.5 3.51562 61.3281 3.125 58.9844L0.78125 49.6094C0 46.875 2.34375 43.75 5.46875 43.75H28.5156L35.1562 27.7344C41.7969 10.9375 57.8125 0 75.7812 0H125.391C143.359 0 159.375 10.9375 166.016 27.7344L172.656 43.75H195.703ZM58.2031 37.1094L50.7812 56.25H150.781L142.969 37.1094C139.844 29.6875 133.203 25 125.391 25H75.7812C67.9688 25 61.3281 29.6875 58.2031 37.1094ZM38.2812 100C45.7031 100 57.0312 101.172 57.0312 93.75C57.0312 86.3281 45.7031 75 38.2812 75C30.4688 75 25.7812 80.0781 25.7812 87.5C25.7812 95.3125 30.4688 100 38.2812 100ZM163.281 100C170.703 100 175.781 95.3125 175.781 87.5C175.781 80.0781 170.703 75 163.281 75C155.469 75 144.531 86.3281 144.531 93.75C144.531 101.172 155.469 100 163.281 100Z" fill="white" />
    </svg>
)

const headerSettings: header = {
    title: 'LA MANO DE DIOS',
    subtitle: 'Sistema Administrativo',
    icon: icon,
    actions: [
        {
            icon: Help,
            name: 'Ver documentacion',
            onClick: (router: AppRouterInstance, uiContext: UIDisplayControlsContextType) => {
                router.push('/docs');
            }
        },
        { 
            name: 'Cerrar sesión', 
            icon: Logout, 
            goTo: '/login',
            onClick: async (
                router: AppRouterInstance, 
                uiContext: UIDisplayControlsContextType
            ) => {
                uiContext.setAlert({
                    open: true,
                    title: 'Cerrar sesión',
                    message: '¿Estás seguro de querer cerrar sesión?',
                    severity: 'warning',
                    actions: [
                        { label: 'Cancelar', onClick: () => uiContext.setAlert(prev => ({ ...prev, open: false })) },
                        { label: 'Cerrar sesión', onClick: async () => {
                            uiContext.setLoading(true);
                            await api.post('/api/auth/logout');
                            router.replace('/login');
                            uiContext.setLoading(false);
                        } },
                    ]
                });
            },
        },  
    ]
}

const DashboardIndex = ({ children }: { children: React.ReactNode }) => {

    return (
        <DashboardProvider>
            <HeaderIndex settings={headerSettings} />
            <Stack direction={'row'}>
                <SideBar />
                <Container sx={styles.container}>
                    {children}
                </Container>
            </Stack>
        </DashboardProvider>
    );
}

const styles: Record<string, SxProps<Theme>> = {
    container: {
        paddingTop: 8,
        paddingBottom: 8,
        height: '90vh',
        overflowY: 'scroll',
    },
}

export default withUIDisplayControls(DashboardIndex);