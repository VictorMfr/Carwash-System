import formConfig from "./formConfig/formConfig";
import contentType from "./contentType/contentType";
import formVanilla from "./formVariants/formVanilla/formVanilla";
import formStepper from "./formVariants/formStepper/formStepper";

export default interface form {
    config: formConfig;
    contentType: contentType;
    fields: formVanilla[] | formStepper;
}