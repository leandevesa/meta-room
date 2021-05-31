import { Filters } from "./Filters/Filters";
import { Product } from "./Product";

export interface Products {
    products: Array<Product>;
    filters: Filters;
}