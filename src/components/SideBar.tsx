import React, { Component } from 'react';
import './SideBar.css';
import Spinner from './Spinner';

class SideBar extends Component<any> {

    constructor(props: any) {
      super(props);
    }
  
    render() {
      return (
        <div className="col-12 col-md-3 col-lg-2 col-xl-2 bd-sidebar">
          <nav className="bd-links" id="bd-docs-nav">
              <Spinner 
                label="Precio max:"
                max={500}
                min={100}
                step={10}
              />
          </nav>
        </div>
      );
    }
}

export default SideBar;