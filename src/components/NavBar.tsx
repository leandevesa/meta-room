import React, { Component } from 'react';
import './NavBar.css';
import { Category } from '../dto/Category';
import { Link } from 'react-router-dom';

class NavBar extends Component<any> {

    private categories: Array<Category> = require('../data/categories.json').categories;

    render() {
      return (
        <div id="navbar">
            {this.renderCategories()}
        </div>
      );
    }

    renderCategories() {
      return this.categories.map((c,i) =>
                <Link key={i} 
                      to={`/products/${c.id}`}>
                      {c.title}
                </Link>
              );
    }
}

export default NavBar;