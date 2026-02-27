import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import columns from "./columns/columns";
import formStepper from "../form/formVariants/formStepper/formStepper";
import stepperStep from "../form/formVariants/formStepper/stepperStep/stepperStep";
import actions from "./actions/actions";
import config from "./config/config";

export type stepperColumns = formStepper & { steps: (stepperStep & { fields: columns[] })[] };

export default interface datagrid {
    /**
     * Ruta de la API que usara para hacer las peticiones a la base de datos.
     * 
     * Para toda entidad de la base de datos, la ruta debe ser:
     * - GET /api/entidad => Obtener todos los registros de la entidad.
     * - POST /api/entidad => Crear un nuevo registro de la entidad.
     * - PUT /api/entidad/:id => Actualizar un registro de la entidad.
     * - DELETE /api/entidad/:id => Eliminar un registro de la entidad.
     */
    url: string;

    /**
     * Columnas de la grilla. Puede ser un array de un formVanilla enriquecido con
     * propiedades propias de la grilla o un formStepper. formStepper es un objeto
     * que contiene un array de steps, cada step contiene un array de fields que son
     * datos de tipo columns[].
     */
    columns: columns[] | stepperColumns;

    /**
     * Acciones de la grilla.
     */
    actions?: actions;

    /**
     * Configuracion de la grilla.
     */
    config?: config;
}