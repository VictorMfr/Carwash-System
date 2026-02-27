import { useState } from "react";

export default function usePictureController(picture?: string) {
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const pictureUrl = picture && !error ? picture : undefined;

    return {
        loading,
        pictureUrl,
        onLoad: () => setLoading(false),
        onError: () => {
            setLoading(false);
            setError(true);
        },
        modal,
        setModal,
    };
}