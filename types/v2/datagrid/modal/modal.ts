import formStateField from "@/types/v2/form/controller/formStateField/formStateField";

export default interface modal {
    open: boolean;
    type: 'add' | 'edit';
    data?: formStateField[];
}