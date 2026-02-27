import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
import { AutocompleteInputProvider } from "./context";
import AutocompleteInput from "./AutocompleteInput";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";

const AutocompleteInputIndex = ({ field }: { field: formVanilla }) => {
    return (
        <AutocompleteInputProvider field={field}>
            <AutocompleteInput/>
        </AutocompleteInputProvider>
    );
}

export default withUIDisplayControls(AutocompleteInputIndex);