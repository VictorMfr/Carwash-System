import { Stack, InputLabel, Typography, Avatar } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import Header from "./Header/Header";
import useDroppableInputController from "./controller";

export default function DroppableInput() {
    const controller = useDroppableInputController();

    return (
        <Stack gap={2}>
            <Header />
            {!controller.previewUrl && <InputLabel
                htmlFor={`file-input-${controller.field.id}`}
                sx={{
                    width: '100%',
                    height: 200,
                    border: '2px dashed #e0e0e0 ',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: 'primary.main',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        border: '2px dashed white ',
                    },
                }}
                onDragOver={(e: React.DragEvent<HTMLLabelElement>) => e.preventDefault()}
                onDrop={controller.onDropFile}
            >
                <Stack gap={1}>
                    <Stack direction='row' gap={1} alignItems={'center'} justifyContent={'center'}>
                        <CloudUpload />
                        <Typography>{controller.previewUrl ? 'Actualizar Imagen' : 'Subir Imagen'}</Typography>
                    </Stack>
                    <Typography
                        variant='body2'
                        sx={{ textWrap: 'wrap', width: { xs: '100%', md: 'auto' } }}
                        textAlign={'center'}
                    >
                        {controller.field.picture?.suggestion}
                    </Typography>
                </Stack>
            </InputLabel>}
            {controller.previewUrl && <Avatar
                variant='rounded'
                src={controller.previewUrl}
                sx={{ width: controller.cropWidth, height: controller.cropHeight }}
            />}
        </Stack>
    );
}