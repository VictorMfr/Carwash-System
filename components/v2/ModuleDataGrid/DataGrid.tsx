import { DataGrid } from "@mui/x-data-grid";
import useModuleDataGridController from "./controller/controller";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { Fragment } from "react";
import Modal from "./Modal/Modal";

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
                checkboxSelection={controller.checkboxSelection}
                {...controller.customDataGridProps}
            />
            <Modal/>
        </Fragment>
    );
}

export default withUIDisplayControls(ModuleDataGrid);