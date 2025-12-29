import { useState } from "react";

export default function useServiceGroupController() {
    const [servicesOpen, setServicesOpen] = useState(false);

    const handleServicesClick = () => {
        setServicesOpen(!servicesOpen);
    };

    return {
        servicesOpen,
        handleServicesClick,
    }
}