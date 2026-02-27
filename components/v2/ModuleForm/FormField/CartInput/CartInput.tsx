import { Avatar, Box, Button, ButtonBase, Card, Divider, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Tooltip, Typography } from "@mui/material";
import useCartInputController from "./controller/controller";
import { Add, Delete } from "@mui/icons-material";
import CartControls from "./CartControls/CartControls";
import CartList from "./CartList/CartList";


export default function CartInput() {
    return (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <CartControls />
                <CartList />
            </Grid>
            <Divider />
        </Stack>
    );
}