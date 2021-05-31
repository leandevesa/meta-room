import React, { Component } from 'react';
import './FiltersContainer.css';
import CustomRange from './CustomRange';
import Toggle from './Toggle';
import Hamburger from './Hamburger';
import { Filters } from '../../dto/Product/Filters/Filters';

interface FiltersProps {
  filters?: Filters
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
      const classes = ["col-12", "col-md-3", "col-lg-2", "col-xl-2", "filters-container"];
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
          <nav className="filters-nav">
              <Toggle></Toggle>
              <CustomRange 
                min={this.props.filters.prices.min}
                avg={this.props.filters.prices.avg}
                max={this.props.filters.prices.max}
                label="Precio"
              />
          </nav>
        </div>
      ) : "";
    }
}

export default FiltersContainer;