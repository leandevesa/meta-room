import { PriceFilter } from "./PriceFilter";

export interface ApplicableFilters {
    prices?: PriceFilter;
    sort?: string;
    regions?: Array<string>;
    states?: Array<string>;
}