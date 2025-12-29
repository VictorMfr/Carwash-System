export default interface modal {
    open: boolean;
    type: 'add' | 'edit';
    data: Record<string, any>;
}