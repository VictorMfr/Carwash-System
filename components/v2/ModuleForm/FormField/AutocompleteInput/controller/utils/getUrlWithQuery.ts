import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";

export default function getUrlWithQuery(field: formVanilla) {
    if (!field.autocomplete) return '';
    if (!field.autocomplete?.queryParams) return field.autocomplete.url;
    const params = new URLSearchParams();
    Object.entries(field.autocomplete.queryParams).forEach(([k, v]) => {
        if (v !== undefined && v !== null) params.append(k, String(v));
    });
    const qs = params.toString();
    return qs ? `${field.autocomplete.url}?${qs}` : field.autocomplete.url;
}