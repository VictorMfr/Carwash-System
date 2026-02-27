import { Dialog, DialogTitle, DialogContent, Stack, Typography, Slider, DialogActions, Button, Box } from "@mui/material";
import ReactCrop from "react-image-crop";
import useModalController from "./controller";
import 'react-image-crop/dist/ReactCrop.css'

export default function Modal() {


    const controller = useModalController();

    return (
        <Dialog open={controller.open} onClose={controller.handleClose}>
            <DialogTitle>{controller.previewUrl ? 'Actualizar Imagen' : 'Subir Imagen'}</DialogTitle>
            <DialogContent>
                <Stack gap={2}>
                    {!!controller.imgSrc && (
                        <ReactCrop
                            crop={controller.crop}
                            onChange={(crop) => controller.setCrop(crop)}
                            onComplete={(crop) => controller.setCompletedCrop(crop)}
                            aspect={controller.aspectRatio}

                        >
                            <img
                                ref={controller.imgRef}
                                alt="Crop me"
                                src={controller.imgSrc}
                                height={500}
                                width={500}
                                style={{
                                    overflow: 'scroll',
                                    objectFit: 'contain',
                                    transform: `scale(${(controller.scale + 50) * 0.01}) rotate(${controller.rotate}deg)`,
                                }}
                                onLoad={controller.onImageLoad}
                            />
                        </ReactCrop>
                    )}

                    {/* Hidden canvas where the cropped preview is rendered */}
                    <canvas
                        ref={controller.previewCanvasRef}
                        width={500}
                        height={500}
                        style={{ display: 'none' }}
                    />

                    <Box>
                        <Typography>Escala: {controller.scale - 50}</Typography>
                        <Slider
                            value={controller.scale}
                            onChange={(e, value) => controller.setScale(value)}
                            step={1}
                            disabled={!controller.imgSrc || controller.effects?.disable}
                        />
                        <Typography>Rotación: {controller.rotate}°</Typography>
                        <Slider
                            value={controller.rotate}
                            onChange={(e, value) => controller.setRotate(value)}
                            step={1}
                            disabled={!controller.imgSrc || controller.effects?.disable}
                            min={-180}
                            max={180}
                        />
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={controller.handleClose}>Cancel</Button>
                <Button
                    onClick={controller.uploadPicture}
                    disabled={!controller.imgSrc || controller.effects?.disable}
                >
                    {controller.previewUrl ? 'Actualizar Imagen' : 'Subir Imagen'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}