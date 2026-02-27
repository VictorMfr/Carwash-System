import form from "@/types/v2/form/form";
import datagrid from "@/types/v2/datagrid/datagrid";
import contentType from "@/types/v2/form/contentType/contentType";
import parseColumnsToFields from "./parseColumnsToFields";
import getColumns from "../getColumns";
import formConfig from "@/types/v2/form/formConfig/formConfig";
import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import formStepper from "@/types/v2/form/formVariants/formStepper/formStepper";

export default function parseDatagridSettingsToFormSettings(settings: datagrid): form {

    // Eliminar de forma programatica cualquier propiedad que no sea formConfig
    const datagridSettings = { ...settings };

    delete datagridSettings.config?.checkboxSelection;

    
    const formSettings = {
        config: datagridSettings.config as formConfig,
        contentType: settings.config?.create?.contentType as contentType,
        fields: settings.columns as formVanilla[] | formStepper
    }

    return formSettings;
}