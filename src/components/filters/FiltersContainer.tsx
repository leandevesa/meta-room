import React, { Component } from 'react';
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

class FiltersContainer extends Component<FiltersProps, any> {

    constructor(props: FiltersProps) {
      super(props);
      this.state = {
          filtersOpened: false
      }
    }

    handleHamburgerClick(filtersOpened: boolean) {
      this.setState({filtersOpened: filtersOpened});
    }

    renderNavClasses() {
      const classes = ["col-md-3", "col-lg-3", "col-xl-2", "filters-container"];
      if (this.state.filtersOpened) classes.push("show");
      return classes.join(" ");
    }

    filterChanged(filterType: FilterType, ...args:any[]) {
      
      switch (filterType) {
        case FilterType.PRICE:
          this.props.priceFilterChanged(args[0]);
          break;
        case FilterType.SORT:
          this.props.sortChanged(args[0]);
          break;
        case FilterType.LOCATION:
          this.props.locationFilterChanged(args[0], args[1]);
          break;
      }
    }
  
    render() {

      const availableFilters = (this.props.filters && this.props.filters.available) ? this.props.filters : undefined; 

      return availableFilters ? (
        <div className={this.renderNavClasses()}>

          <div className="mobile">
            <span className="label">Filtros</span>
            <Hamburger
                handleHamburgerClick={this.handleHamburgerClick.bind(this)}
            ></Hamburger>
          </div>

          <div className="row filters-nav">

              <Toggle></Toggle>

              <CustomRange 
                min={availableFilters.available.prices.min}
                avg={availableFilters.available.prices.avg}
                max={availableFilters.available.prices.max}
                rangeChanged={(r) => this.filterChanged(FilterType.PRICE, r) }
              />

              <CustomSelect
                onChange={(r) => this.filterChanged(FilterType.SORT, r) }>
              </CustomSelect>
              
              <LocationFilter
                locations={availableFilters.available.locations}
                onChange={(r, s) => this.filterChanged(FilterType.LOCATION, r, s) }>
              </LocationFilter>
          </div>
        </div>
      ) : "";
    }
}

export default FiltersContainer;