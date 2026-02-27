import { useState } from "react";

export default function useModalActionsController() {
    
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleClose = () => {
        console.log('close');
    }

    const handleSubmit = () => {
        console.log('submit');
    }   
    
    return {
        handleClose,
        handleSubmit,
        submitLoading,
    }
}