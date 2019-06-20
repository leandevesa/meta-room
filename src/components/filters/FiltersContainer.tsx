import React, { Component } from 'react';
import './FiltersContainer.css';
import CustomRange from './CustomRange';
import Toggle from './Toggle';
import Hamburger from './Hamburger';

class FiltersContainer extends Component<any, any> {

    constructor(props: any) {
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
      return (
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
                min={0}
                max={100}
                label="Precio"
              />
          </nav>
        </div>
      );
    }
}

export default FiltersContainer;