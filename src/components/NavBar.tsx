import React, { Component } from 'react';
import './NavBar.css';
import { Category } from '../dto/Category';
import { Link } from 'react-router-dom';
import LogoSVG from '../logo.svg';

class NavBar extends Component<any, any> {

    private categories: Array<Category> = require('../data/categories.json').categories;

    constructor(props: any) {
      super(props);
      this.state = {
        showMenu: false
      }
    }

    handleMenuClick() {
      this.setState({showMenu: !this.state.showMenu});
    }

    handleCategoryClick() {
      this.setState({showMenu: false});
    }

    renderLogoClasses() {
      const classes = ["mobile", "logo"];
      if (this.state.showMenu) classes.push("hide");
      return classes.join(" ");
    }

    render() {
      return (
        <div id="navbar" className={(this.state.showMenu ? 'responsive' : '')}>
            <img src={LogoSVG} className={this.renderLogoClasses()} />
            {this.renderCategories()}
            <a href="#" className="icon" onClick={this.handleMenuClick.bind(this)}>&#9776;</a>
        </div>
      );
    }

    renderCategories() {
      return this.categories.map((c,i) =>
                <Link key={i} 
                      to={`/products/${c.id}`}
                      className={(this.props.activeCategory === c.id ? 'active' : '')}
                      onClick={this.handleMenuClick.bind(this)} >
                      {c.title}
                </Link>
              );
    }
}

export default NavBar;