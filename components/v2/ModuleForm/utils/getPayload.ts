export type contentType = 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded';

export default function getPayload(payload: Record<string, any>, contentType: contentType) {
    if (contentType === 'multipart/form-data') {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
            } else if (typeof value === 'object') {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value.toString());
            }
        });
        return formData;
    }
    return payload;
}