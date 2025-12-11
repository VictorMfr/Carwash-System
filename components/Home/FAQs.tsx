import { 
    Box, 
    Container, 
    Stack, 
    Typography, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails,
    Theme,
    SxProps
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export default function FAQs() {
    const faqs = [
        { 
            q: '¿Necesito instalar algo?', 
            a: 'No, es 100% web. Solo necesitas un navegador moderno como Chrome, Firefox, Safari o Edge.' 
        },
        { 
            q: '¿Puedo exportar mis datos?', 
            a: 'Sí, soportamos exportaciones a formatos comunes como CSV y Excel. Tus datos siempre están bajo tu control.' 
        },
        { 
            q: '¿Es seguro guardar mis datos?', 
            a: 'Sí, utilizamos encriptación y respaldos automáticos. Tus datos están protegidos y respaldados regularmente.' 
        },
        { 
            q: '¿Puedo usar el sistema desde mi celular?', 
            a: 'Sí, la plataforma es completamente responsive y funciona perfectamente en tablets y smartphones.' 
        },
        { 
            q: '¿Cuántos usuarios puedo tener?', 
            a: 'Puedes agregar múltiples usuarios con diferentes roles y permisos según las necesidades de tu autolavado.' 
        },
        { 
            q: '¿Qué pasa si tengo problemas técnicos?', 
            a: 'Ofrecemos soporte por correo electrónico y documentación completa para resolver dudas comunes.' 
        },
        { 
            q: '¿Puedo personalizar el sistema?', 
            a: 'El sistema incluye configuraciones básicas para adaptarse a tu flujo de trabajo. Para personalizaciones avanzadas, contáctanos.' 
        },
    ];

    return (
        <Box sx={styles.section}>
            <Container maxWidth="md" sx={styles.container}>
                <Stack spacing={4}>
                    <Box sx={styles.header}>
                        <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={styles.titleContainer}>
                            <QuestionAnswerIcon sx={styles.titleIcon} />
                            <Typography 
                                variant="h4" 
                                component="h2"
                                sx={styles.title}
                                textAlign="center"
                            >
                                Preguntas frecuentes
                            </Typography>
                        </Stack>
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={styles.description}
                            textAlign="center"
                        >
                            Respuestas rápidas a dudas comunes
                        </Typography>
                    </Box>
                    
                    <Stack spacing={1} sx={styles.accordionContainer}>
                        {faqs.map((faq, idx) => (
                            <Accordion 
                                key={idx}
                                sx={styles.accordion}
                                elevation={0}
                            >
                                <AccordionSummary 
                                    expandIcon={<ExpandMoreIcon sx={styles.expandIcon} />}
                                    sx={styles.accordionSummary}
                                >
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <HelpOutlineIcon 
                                            sx={styles.questionIcon}
                                        />
                                        <Typography 
                                            variant="subtitle1" 
                                            sx={styles.question}
                                        >
                                            {faq.q}
                                        </Typography>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails sx={styles.accordionDetails}>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={styles.answer}
                                    >
                                        {faq.a}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    section: {
        py: { xs: 5, md: 7 },
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
        }
    },
    container: {
        position: 'relative',
        zIndex: 1,
        px: 2,
    },
    header: {
        mb: 1,
    },
    titleContainer: {
        mb: 2,
    },
    titleIcon: {
        fontSize: { xs: '2rem', md: '2.5rem' },
        color: 'primary.main',
    },
    title: {
        fontWeight: 700,
        fontSize: { xs: '1.75rem', md: '2.25rem' },
        lineHeight: 1.2,
    },
    description: {
        fontSize: { xs: '0.9375rem', md: '1.0625rem' },
        lineHeight: 1.7,
        maxWidth: 600,
        mx: 'auto',
    },
    accordionContainer: {
        mt: 2,
    },
    accordion: {
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        '&:before': {
            display: 'none',
        },
        '&.Mui-expanded': {
            margin: 0,
            borderColor: 'primary.main',
        },
    },
    accordionSummary: {
        px: 2.5,
        py: 1.5,
        minHeight: 56,
        '&.Mui-expanded': {
            minHeight: 56,
            borderBottom: '1px solid',
            borderColor: 'divider',
        },
    },
    questionIcon: {
        fontSize: 20,
        color: 'primary.main',
        flexShrink: 0,
    },
    question: {
        fontWeight: 600,
        fontSize: '0.9375rem',
        color: 'text.primary',
    },
    expandIcon: {
        color: 'text.secondary',
    },
    accordionDetails: {
        px: 2.5,
        py: 2,
    },
    answer: {
        fontSize: '0.9375rem',
        lineHeight: 1.7,
        pl: 4.5,
    },
}
