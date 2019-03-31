import React, { Component } from 'react';
import './CategoryContainer.css';
import ProductsContainer from './ProductsContainer';
import { Category } from '../dto/Category';

class CategoryContainer extends Component<any> {

    private title: string = "";
    private category: string = "";
    private categories: Array<Category> = require('../data/categories.json').categories;

    constructor(props: any) {
      super(props);
      this.update(props);
    }

    update(props: any) {
      this.category = props.match.params.category;
      this.title = this.categories.filter(c => c.id === this.category)[0].title;
    }

    componentWillReceiveProps(nextProps: any) {
      if (nextProps.location.pathname !== this.props.location.pathname) {
        this.update(nextProps);
      }
    }
  
    render() {
      return (
        <div className="container">
            <h3 className="h3">{this.title}</h3>
            <ProductsContainer
              key={this.category}
              category={this.category}
            />
        </div>
      );
    }
}

export default CategoryContainer;