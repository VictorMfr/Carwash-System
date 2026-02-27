import { FormControl, Button, Input, FormHelperText, Theme, SxProps } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import useButtonInputController from "./controller";


export default function ButtonInput() {


    const controller = useButtonInputController();
    
    return (
        <FormControl fullWidth error={!!controller.error} disabled={controller.effects?.disable}>
            <Button
                component='label'
                variant="contained"
                startIcon={<CloudUpload />}
                role={undefined}
                tabIndex={-1}
                disabled={controller.effects?.disable}
            >
                {controller.previewUrl ? 'Actualizar Imagen' : 'Subir Imagen'}
                <Input
                    id={`file-input-${controller.field.id}`}
                    type="file"
                    sx={inputStyle}
                    inputProps={{ accept: 'image/*' }}
                    onClick={(e: any) => { e.target.value = ''; }}
                    onChange={controller.onSelectFile}
                    disabled={controller.effects?.disable}

                />
            </Button>

            {controller.error && <FormHelperText>{controller.error}</FormHelperText>}
        </FormControl>
    );
}

const inputStyle: SxProps<Theme> = {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
}