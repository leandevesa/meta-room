import { Price } from "./Price";
import { Flags } from "./Flags";

export interface Product {
    name: string;
    price: Price;
    pictures: Array<string>;
    flags?: Flags;
    url: string;
}