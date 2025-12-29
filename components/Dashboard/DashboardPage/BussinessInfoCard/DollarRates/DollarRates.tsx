import { Stack, Typography, List, ListItem, ListItemText, ListItemIcon, Avatar, Theme, SxProps } from "@mui/material";
import { TrendingUp, Paid } from "@mui/icons-material";
import useDollarRatesController from "./controller";

export default function DollarRates() {

    const controller = useDollarRatesController();

    return (
        <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
                <TrendingUp sx={{ fontSize: 20, color: 'success.main' }} />
                <Typography variant="subtitle2" color="text.secondary">
                    Tasas del dólar
                </Typography>
            </Stack>
            <List dense disablePadding>
                {controller.dollarRates.length > 0 ? (
                    controller.dollarRates.map(r => (
                        <ListItem key={r.nombre} disableGutters sx={styles.listItem}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Avatar sx={styles.listIcon}>
                                    <Paid sx={{ fontSize: 18 }} />
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body2" sx={styles.listPrimary}>
                                        {r.nombre}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2" sx={styles.listSecondary}>
                                        Bs. {Number(r.promedio ?? r.precio ?? 0).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))
                ) : (
                    <ListItem disableGutters>
                        <ListItemText
                            primary={
                                <Typography variant="body2" color="text.secondary">
                                    No se pudieron cargar las tasas.
                                </Typography>
                            }
                        />
                    </ListItem>
                )}
            </List>
        </Stack>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    listItem: {
        py: 1,
    },
    listIcon: {
        width: 32,
        height: 32,
        bgcolor: 'action.hover',
        color: 'text.secondary',
    },
}