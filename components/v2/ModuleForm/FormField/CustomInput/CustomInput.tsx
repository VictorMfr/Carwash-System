import formVanilla from "@/types/v2/form/formVariants/formVanilla/formVanilla";
    
export default function CustomInput({ field }: { field: formVanilla }) {

    if (!field.custom) return null;
    
    return <field.custom field={field} />;
}