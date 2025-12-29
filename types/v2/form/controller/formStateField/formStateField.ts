export type formInitialState = formStateField[];

export default interface formStateField {
    field: string;
    value: any;
    error: string;
}