import { Filters } from "./Filters";
import { Pagination } from "./Pagination";
import { Product } from "./Product";

export interface SearchResponse {
    pagination: Pagination;
    products: Array<Product>;
    filters: Filters;
}