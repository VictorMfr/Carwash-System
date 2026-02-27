import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function useRecentNotificationsController() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {

                const [svcRes, trxRes] = await Promise.all([
                    fetch('/api/service'),
                    fetch('/api/finance')
                ]);
                const items: { id: string, title: string, subtitle?: string }[] = [];
                if (svcRes.ok) {
                    const services = await svcRes.json();
                    (services || []).slice(0, 3).forEach((s: any) => {
                        const recipeLabel =
                            typeof s.recipeName === "string"
                                ? s.recipeName
                                : s.recipeName?.name ?? "";
                        items.push({
                            id: `svc-${s.id}`,
                            title: `Servicio ${recipeLabel} - ${s.status ?? ''}`.trim(),
                            subtitle: `${dayjs(s.date).format('DD/MM/YYYY')} • ${s.client ?? ''}`.trim()
                        });
                    });
                }
                if (trxRes.ok) {
                    const txs = await trxRes.json();
                    (txs || []).slice(0, 3).forEach((t: any) => {
                        const isIncome = Number(t.amount) >= 0;
                        items.push({
                            id: `tx-${t.id}`,
                            title: `${isIncome ? 'Ingreso' : 'Costo'} Bs. ${Math.abs(Number(t.amount)).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                            subtitle: `${dayjs(t.date).format('DD/MM/YYYY')} • ${t.account ?? ''}`.trim()
                        });
                    });
                }
                setNotifications(items);
            } catch (e) {
                // ignore
            }
        };
        load();
    }, []);

    return {
        notifications,
        loading
    }
}