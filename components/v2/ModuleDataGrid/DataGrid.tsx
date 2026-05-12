import { DataGrid } from "@mui/x-data-grid";
import useModuleDataGridController from "./controller/controller";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { Fragment } from "react";
import Modal from "./Modal/Modal";

/**
 * Componente que renderiza la grilla.
 * @returns Componente de la grilla.
 */
const ModuleDataGrid = () => {

    const controller = useModuleDataGridController();

    return (
        <Fragment>
            <DataGrid
                columns={controller.columns}
                rows={controller.data}
                loading={controller.loading}
                slots={controller.slots}
                showToolbar={true}
                onRowSelectionModelChange={controller.handleRowSelectionModelChange}
                {...controller.customDataGridProps}
                localeText={{
                    paginationRowsPerPage: 'Filas por página'
                }}
            />
            <Modal/>
        </Fragment>
    );
}

export default withUIDisplayControls(ModuleDataGrid);