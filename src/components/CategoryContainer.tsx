import React, { Component } from 'react';
import './CategoryContainer.css';
import ProductsContainer from './ProductsContainer';
import { Category } from '../dto/Category';
import SideBar from './SideBar';

class CategoryContainer extends Component<any> {

    private title: string = "";
    private category: string = "";
    private categories: Array<Category> = require('../data/categories.json').categories;

    constructor(props: any) {
      super(props);
      this.update(this.props);
    }

    update(props: any) {
      this.category = props.category;
      this.title = this.categories.filter(c => c.id === this.category)[0].title;
    }

    componentWillReceiveProps(nextProps: any) {
      if (nextProps.location.pathname !== this.props.location.pathname) {
        this.update(nextProps);
      }
    }
  
    render() {
      return (
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
              <SideBar></SideBar>
              <ProductsContainer
                key={this.category}
                category={this.category}
                title={this.title}
              />
          </div>
        </div>
      );
    }
}

export default CategoryContainer;