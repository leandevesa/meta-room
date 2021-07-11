import React, { Component, useState } from 'react';
import './FiltersContainer.css';
import CustomRange from './CustomRange';
import Toggle from './Toggle';
import Hamburger from './Hamburger';
import { Filters } from '../../dto/Search/Filters';
import CustomSelect from './CustomSelect';
import LocationFilter from './LocationFilter';


interface FiltersProps {
  filters?: Filters
  priceFilterChanged(newValue: number): void
  sortChanged(newValue: string): void
  locationFilterChanged(states: Array<string>, regions: Array<string>): void
}

enum FilterType {
  PRICE, SORT, LOCATION
}

function FiltersContainer(props: FiltersProps) {

    const [filtersOpened, setFiltersOpened] = useState(false);
    const availableFilters = (props.filters && props.filters.available) ? props.filters : undefined; 

    return availableFilters ? (
      <div className={renderNavClasses(filtersOpened)}>

        <div className="mobile">
          <span className="label">Filtros</span>
          <Hamburger
              handleHamburgerClick={(value) => handleHamburgerClick(setFiltersOpened, value)}
          ></Hamburger>
        </div>

        <div className="row filters-nav">

            <Toggle></Toggle>

            <CustomRange 
              min={availableFilters.available.prices.min}
              avg={availableFilters.available.prices.avg}
              max={availableFilters.available.prices.max}
              rangeChanged={(r) => filterChanged(props, FilterType.PRICE, r) }
            />

            <CustomSelect
              onChange={(r) => filterChanged(props, FilterType.SORT, r) }>
            </CustomSelect>
            
            <LocationFilter
              locations={availableFilters.available.locations}
              onChange={(r, s) => filterChanged(props, FilterType.LOCATION, r, s) }>
            </LocationFilter>
        </div>
      </div>
    ) : null;
}

function handleHamburgerClick(setFiltersOpened: any, filtersOpened: boolean) {
  setFiltersOpened(filtersOpened);
}

function renderNavClasses(filtersOpened: boolean) {
  const classes = ["col-md-3", "col-lg-3", "col-xl-2", "filters-container"];
  if (filtersOpened) classes.push("show");
  return classes.join(" ");
}

function filterChanged(props: FiltersProps, filterType: FilterType, ...args:any[]) {
  switch (filterType) {
    case FilterType.PRICE:
      props.priceFilterChanged(args[0]);
      break;
    case FilterType.SORT:
      props.sortChanged(args[0]);
      break;
    case FilterType.LOCATION:
      props.locationFilterChanged(args[0], args[1]);
      break;
  }
}

export default FiltersContainer;