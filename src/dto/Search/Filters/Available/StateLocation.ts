import { RegionLocation } from "./RegionLocation";

export interface StateLocation {
    id: number;
    description: string;
    regions: Array<RegionLocation>;
}