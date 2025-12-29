export default interface formEffectsField {
    field: string;
    [key: string]: any;
}

const test: formEffectsField = {
    field: 'test',
}