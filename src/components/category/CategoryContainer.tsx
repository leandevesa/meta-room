import React, { Component } from 'react';
import './CategoryContainer.css';
import ProductsContainer from './products/ProductsContainer';
import { Category } from '../../dto/Category';
import FiltersContainer from '../filters/FiltersContainer';

interface CategoryProps {
    category: string;
}

class CategoryContainer extends Component<CategoryProps> {

    private title: string = "";
    private category: string = "";
    private categories: Array<Category> = require('../../data/categories.json').categories;

    constructor(props: CategoryProps) {
      super(props);
      this.update(this.props);
    }

    update(props: CategoryProps) {
      this.category = props.category;
      this.title = this.categories.filter(c => c.id === this.category)[0].title;
    }

    componentWillReceiveProps(nextProps: CategoryProps) {
      if (nextProps.category !== this.category) {
        this.update(nextProps);
      }
    }
  
    render() {
      return (
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
              <FiltersContainer></FiltersContainer>
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