import { Filters } from "./Filters";
import { Product } from "./Product";

export interface Products {
    products: Array<Product>;
    filters: Filters;
}