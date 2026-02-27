import formStateField from "@/types/v2/form/controller/formStateField/formStateField";

export default function getFormStateFromPayload(payload: Record<string, any>): formStateField[] {
    const normalized = { ...payload };

    if (normalized.brandObj) normalized.brand = normalized.brandObj;
    if (normalized.stateObj) normalized.state = normalized.stateObj;
    if (normalized.charge_accountObj) normalized.charge_account = normalized.charge_accountObj;
    if (normalized.methodObj) normalized.method = normalized.methodObj;

    if (normalized.entry_date) {
        const value = normalized.entry_date;
        if (typeof value === 'string' && /^\d{2}-\d{2}-\d{4}$/.test(value)) {
            normalized.entry_date = value;
        } else {
            const date = value instanceof Date ? value : new Date(value);
            if (!Number.isNaN(date.getTime())) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                normalized.entry_date = `${day}-${month}-${year}`;
            }
        }
    }

    return Object.entries(normalized).map(([key, value]) => ({
        field: key,
        value,
        error: '',
    }));
}