import { Prices } from "./Prices";
import { StateLocation } from "./StateLocation";

export interface AvailableFilters {
    prices: Prices;
    locations: Array<StateLocation>;
}