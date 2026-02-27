import ModuleForm from "@/components/v2/ModuleForm";
import { Dialog, DialogContent } from "@mui/material";
import useAutocompleteInputModalController from "./controller";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import Header from "./Header/Header";
import Actions from "./Actions/Actions";
import { Dispatch, SetStateAction } from "react";


export default function AutocompleteInputModal() {

    const controller = useAutocompleteInputModalController();

    if (!controller) return null;
    if (!controller.field.autocomplete) return null;
    if (!controller.field.autocomplete.formData) return null;

    return (
        <Dialog
            open={controller.modal.open}
            onClose={() => controller.setModal({ open: false, inputValue: '' })}
            {...controller.field.autocomplete.formData.modalConfig}
        >
            <Header
                title={controller.field.autocomplete.newItemLabel ?? 'Nuevo item'}
                description={controller.field.autocomplete.newItemLabel ?? ''}
                onClose={() => controller.setModal({ open: false, inputValue: '' })}
            />
            <DialogContent>
                <ModuleForm
                    settings={controller.settings}
                    controls={controller.controls}
                />
            </DialogContent>
            <Actions controls={controller} />
        </Dialog>
    );
}