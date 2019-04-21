import React, { Component } from 'react';
import './FiltersContainer.css';
import Spinner from './Spinner';
import Toggle from './Toggle';

class FiltersContainer extends Component {
  
    render() {
      return (
        <div className="col-12 col-md-3 col-lg-2 col-xl-2 filters-container">
          <div className="mobile">
            <span className="label">Filtros</span>
            <button className="btn btn-link" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img" focusable="false">
                <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path>
              </svg>
            </button>
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