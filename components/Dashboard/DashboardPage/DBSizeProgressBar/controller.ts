import useFetch from "@/hooks/fetch/useFetch";

export default function useDBSizeProgressBarController() {
    const { data, loading } = useFetch('/api/dbMeta');
    
    return {
        dbMeta: data,
        loadingDbMeta: loading
    }
}