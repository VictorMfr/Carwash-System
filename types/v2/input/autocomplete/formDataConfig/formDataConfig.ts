import form from "../../../form/form";

export default interface formDataConfig {
    createFillField?: string;
    columns: Omit<form, 'url'>;
}