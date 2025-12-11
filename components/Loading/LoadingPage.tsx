import { Theme } from "@emotion/react";
import { CircularProgress, Container, SxProps } from "@mui/material";

const CIRCULAR_PROGRESS_SIZE = 100;

export default function Loading() {
    return (
        <Container sx={styles.container}>
            <CircularProgress size={CIRCULAR_PROGRESS_SIZE} />
        </Container>
    )
}

const styles: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
}