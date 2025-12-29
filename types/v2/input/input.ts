import Autocomplete from "./autocomplete/autocomplete";
import Select from "./select/select";
import Switch from "./switch/switch";
import Picture from "./picture/picture";
import Cart from "./cart/cart";
import formVanilla from "../form/formVariants/formVanilla/formVanilla";
import Number from "./number/number";
import Date from "./date/date";

export default interface input {
    switch?: Switch;
	select?: Select;
	autocomplete?: Autocomplete;
	number?: Number;
	date?: Date;
	picture?: Picture;
	cart?: Cart;
	custom?: React.ComponentType<{ dataField: formVanilla }>;
}