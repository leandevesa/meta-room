import React, { Component } from 'react';
import './FiltersContainer.css';
import CustomRange from './CustomRange';
import Toggle from './Toggle';
import Hamburger from './Hamburger';
import { Filters } from '../../dto/Product/Filters/Filters';

interface FiltersProps {
  filters?: Filters
  priceFilterChanged(newValue: number): void
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
      const classes = ["col-12", "filters-container"];
      if (this.state.filtersOpened) classes.push("show");
      return classes.join(" ");
    }
  
    render() {
      return this.props.filters ? (
        <div className={this.renderNavClasses()}>

          <div className="mobile">
            <span className="label">Filtros</span>
            <Hamburger
                handleHamburgerClick={this.handleHamburgerClick.bind(this)}
            ></Hamburger>
          </div>

          <div className="row flex-xl-nowrap filters-nav">

              <Toggle></Toggle>

              <CustomRange 
                min={this.props.filters.prices.min}
                avg={this.props.filters.prices.avg}
                max={this.props.filters.prices.max}
                rangeChanged={this.props.priceFilterChanged.bind(this)}
                label="Precio"
              />
          </div>
        </div>
      ) : "";
    }
}

export default FiltersContainer;