import React, { Component } from 'react';
import './NavBar.css';
import { Category } from '../dto/Category';

interface NavBarProps {
    onCategoryChange: Function
}

class NavBar extends Component<NavBarProps> {

    private categories: Array<Category> = require('../data/categories.json').categories;
  
    handleClick = (category: string) => {
      this.props.onCategoryChange(category);
    }

    render() {
      return (
        <div id="navbar">
            {this.renderCategories()}
        </div>
      );
    }

    renderCategories() {
      return this.categories.map((c,i) =>
                <a href="#" 
                   key={i}
                   onClick={(e) => this.handleClick(c.id)}>
                   
                  {c.title}
                </a>
              );
    }
}

export default NavBar;