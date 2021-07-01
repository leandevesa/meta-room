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
                rangeChanged={this.props.priceFilterChanged.bind(this)}
              />
              <CustomSelect
                onChange={this.props.sortChanged.bind(this)}>
              </CustomSelect>
              <LocationFilter
                onChange={this.props.locationFilterChanged.bind(this)}>
              </LocationFilter>
          </div>
        </div>
      ) : "";
    }
}

export default FiltersContainer;