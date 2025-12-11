import { useMemo, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import { Home, Phone, Work } from "@mui/icons-material";

interface Operator {
    id: number | string;
    name?: string;
    lastname?: string;
    phone?: string;
    address?: string;
    [key: string]: any;
}

interface ServiceOperatorsCellProps {
    operators?: Operator[];
}

const getOperatorInitials = (operator: Operator) => {
    const { name, lastname } = operator;
    const first = name?.[0] ?? "";
    const last = lastname?.[0] ?? "";
    const initials = `${first}${last}`.trim();
    if (initials) return initials.toUpperCase();
    return "OP";
};

const getOperatorLabel = (operator: Operator) => {
    const { name, lastname } = operator;
    if (name || lastname) {
        return `${name ?? ""} ${lastname ?? ""}`.trim();
    }
    return `Operador #${operator.id ?? "-"}`;
};

const ServiceOperatorsCell = ({ operators = [] }: ServiceOperatorsCellProps) => {
    const [open, setOpen] = useState(false);

    const primaryChipLabel = useMemo(() => {
        if (!operators.length) return "Sin operadores";
        if (operators.length === 1) {
            return getOperatorLabel(operators[0]);
        }
        return `${getOperatorLabel(operators[0])} +${operators.length - 1}`;
    }, [operators]);

    const handleOpen = () => {
        if (!operators.length) return;
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <>
            <Tooltip title={operators.length ? "Ver detalles" : ""}>
                <span>
                    <Chip
                        label={primaryChipLabel}
                        color={operators.length ? "primary" : "default"}
                        variant={operators.length ? "filled" : "outlined"}
                        clickable={!!operators.length}
                        onClick={handleOpen}
                        sx={{ cursor: operators.length ? "pointer" : "default" }}
                    />
                </span>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Typography fontWeight={700}>
                        Operadores
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lista de operadores asignados al servicio
                    </Typography>
                </DialogTitle>
                <DialogContent
                    dividers
                    sx={{
                        bgcolor: (theme) => theme.palette.grey[50]
                    }}
                >
                    {operators.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                            No hay operadores asociados.
                        </Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {operators.map((operator) => {
                                const label = getOperatorLabel(operator);
                                const status = operator.status ?? operator.estado ?? "Activo";
                                const isInactive =
                                    String(status).toLowerCase() === "inactivo" ||
                                    String(status).toLowerCase() === "inactive";

                                return (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={operator.id ?? `${operator.name}-${operator.lastname}`}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                borderRadius: 3,
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column"
                                            }}
                                        >
                                            <CardContent sx={{ p: 2.5 }}>
                                                <Stack direction="row" spacing={2} alignItems="center" mb={1.5}>
                                                    <Avatar
                                                        sx={{
                                                            bgcolor: (theme) =>
                                                                theme.palette.primary.light,
                                                            color: (theme) =>
                                                                theme.palette.primary.contrastText,
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {getOperatorInitials(operator)}
                                                    </Avatar>
                                                    <Box flex={1} minWidth={0}>
                                                        <Typography
                                                            variant="subtitle1"
                                                            fontWeight={600}
                                                            noWrap
                                                        >
                                                            {label}
                                                        </Typography>
                                                        {operator.role && (
                                                            <Stack
                                                                direction="row"
                                                                spacing={0.5}
                                                                alignItems="center"
                                                            >
                                                                <Work fontSize="small" color="disabled" />
                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                    noWrap
                                                                >
                                                                    {operator.role}
                                                                </Typography>
                                                            </Stack>
                                                        )}
                                                    </Box>
                                                    <Chip
                                                        label={status}
                                                        size="small"
                                                        color={isInactive ? "default" : "success"}
                                                        sx={{
                                                            textTransform: "lowercase",
                                                            "& .MuiChip-label": {
                                                                textTransform: "capitalize",
                                                                fontWeight: 500
                                                            }
                                                        }}
                                                    />
                                                </Stack>

                                                <Stack spacing={0.5}>
                                                    {operator.phoneNumber && (
                                                        <Stack
                                                            direction="row"
                                                            spacing={1}
                                                            alignItems="center"
                                                        >
                                                            <Phone
                                                                fontSize="small"
                                                                htmlColor="rgba(0,0,0,0.38)"
                                                            />
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                                noWrap
                                                            >
                                                                {operator.phoneNumber}
                                                            </Typography>
                                                        </Stack>
                                                    )}
                                                    {operator.address && (
                                                        <Stack
                                                            direction="row"
                                                            spacing={1}
                                                            alignItems="center"
                                                        >
                                                            <Home
                                                                fontSize="small"
                                                                htmlColor="rgba(0,0,0,0.38)"
                                                            />
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                                noWrap
                                                            >
                                                                {operator.address}
                                                            </Typography>
                                                        </Stack>
                                                    )}
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ServiceOperatorsCell;

