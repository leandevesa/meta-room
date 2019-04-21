import React, { Component } from 'react';
import './NavBar.css';
import { Category } from '../../dto/Category';
import { Link } from 'react-router-dom';
import Logo from './Logo';

interface NavBarProps {
    activeCategory: string;
}

interface NavBarState {
    showMenu: boolean;
}

class NavBar extends Component<NavBarProps, NavBarState> {

    private categories: Array<Category> = require('../../data/categories.json').categories;

    constructor(props: NavBarProps) {
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

    renderCategoryClasses(categoryId: string) {
      const classes = ["nav-link"];
      if (categoryId === this.props.activeCategory) classes.push("active");
      return classes.join(" ");
    }

    renderHeaderClasses() {
      const classes = ["navbar-container"];
      if (this.state.showMenu) classes.push("responsive");
      return classes.join(" ");
    }

    render() {
      return (
        <header id="navbar" className={this.renderHeaderClasses()}>
            <Logo />
            <div className="navbar-nav-scroll">
              <ul className="navbar-nav bd-navbar-nav flex-row">
                {this.renderCategories()}
              </ul>
            </div>
        </header>
      );
    }

    renderCategories() {
      return this.categories.map((c,i) =>
                <li key={i} className="nav-item">
                  <Link
                        key={i}
                        to={`/products/${c.id}`}
                        className={this.renderCategoryClasses(c.id)}
                        onClick={this.handleMenuClick.bind(this)} >
                        {c.title}
                  </Link>
                </li>
              );
    }
}

export default NavBar;