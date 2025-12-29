import Autocomplete from "../autocomplete/autocomplete";

export default interface Cart {
    optional?: string;
    autocomplete: Autocomplete;
    number: Number;
}