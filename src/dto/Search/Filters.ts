import { ApplicableFilters } from "./Filters/Applicable/ApplicableFilters";
import { AvailableFilters } from "./Filters/Available/AvailableFilters";

export interface Filters {
    available: AvailableFilters;
    applied: ApplicableFilters;
}