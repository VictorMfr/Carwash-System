import { Box, Tooltip, ButtonBase, Avatar, Skeleton, Dialog } from "@mui/material";
import usePictureController from "./controller";

export default function Picture({ picture }: { picture?: any }) {
    
    const controller = usePictureController(picture);

    return (
        <Box sx={{ marginRight: 2 }}>
            <Tooltip title="Ver">
                <ButtonBase onClick={() => controller.setModal(true)}>
                    {controller.loading && (
                        <Skeleton variant="rounded" width={40} height={40} />
                    )}
                    <Avatar
                        variant="rounded"
                        sx={{ display: controller.loading ? "none" : "flex" }}
                        src={controller.pictureUrl}
                        onLoad={controller.onLoad}
                        onError={controller.onError}
                    />
                </ButtonBase>
            </Tooltip>
            <Dialog open={controller.modal} onClose={() => controller.setModal(false)}>
                <img src={controller.pictureUrl} alt="Picture" />
            </Dialog>
        </Box>
    )
}