import { createContext, useContext } from "react";
import { header } from "@/types/v2/dashboard/header/header";
import { useMediaQuery } from "@mui/material";

export interface HeaderContextType {
    settings: header;
    mobileSize: boolean;
}

export const HeaderContext = createContext<HeaderContextType>({
    settings: {} as header,
    mobileSize: false,
});

export const useHeaderContext = () => {
    return useContext(HeaderContext);
}

export const HeaderProvider = ({ children, settings }: { children: React.ReactNode, settings: header }) => {
    const mobileSize = useMediaQuery('(max-width: 600px)');

    const value = {
        settings,
        mobileSize,
    };

    return (
        <HeaderContext.Provider value={value}>
            {children}
        </HeaderContext.Provider>
    );
}