import React, { Component } from 'react';
import './FiltersContainer.css';
import Spinner from './Spinner';
import Toggle from './Toggle';
import Hamburger from './Hamburger';

class FiltersContainer extends Component {
  
    render() {
      return (
        <div className="col-12 col-md-3 col-lg-2 col-xl-2 filters-container">
          <div className="mobile">
            <span className="label">Filtros</span>
            <Hamburger></Hamburger>
          </div>
          <nav className="filters-nav">
              <Toggle></Toggle>
              <Spinner 
                label="Precio hasta:"
                max={500}
                min={100}
                step={10}
              />
          </nav>
        </div>
      );
    }
}

export default FiltersContainer;