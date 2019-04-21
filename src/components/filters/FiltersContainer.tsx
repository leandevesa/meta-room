import React, { Component } from 'react';
import './FiltersContainer.css';
import Spinner from './Spinner';
import Toggle from './Toggle';

class FiltersContainer extends Component {
  
    render() {
      return (
        <div className="col-12 col-md-3 col-lg-2 col-xl-2 filters-container">
          <nav>
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