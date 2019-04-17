import React, { Component } from 'react';
import './MainContainer.css';
import NavBar from './NavBar';
import CategoryContainer from './CategoryContainer';

class MainContainer extends Component<any> {

    constructor(props: any) {
      super(props);
    }
  
    render() {
      return (
        <div>
          <NavBar 
            activeCategory={this.props.match.params.category}
          />
          <CategoryContainer
            category={this.props.match.params.category}
          />
        </div>
      );
    }
}

export default MainContainer;