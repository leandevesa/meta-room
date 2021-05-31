import React, { Component } from 'react';
import './CategoryContainer.css';
import ProductsContainer from './products/ProductsContainer';
import { Category } from '../../dto/Category';
import FiltersContainer from '../filters/FiltersContainer';
import { Product as ProductDTO } from '../../dto/Product/Product';
import { Filters as FiltersDTO } from '../../dto/Product/Filters/Filters';

interface CategoryProps {
  category: string;
}

interface CategoryState {
  filters?: FiltersDTO;
  products: Array<ProductDTO>;
  hasMoreItems: boolean;
}

class CategoryContainer extends Component<CategoryProps, CategoryState> {

  private title: string = "";
  private category: string = "";
  private categories: Array<Category> = require('../../data/categories.json').categories;

  constructor(props: CategoryProps) {
    super(props);
    this.update(this.props);
    this.state = {
      products: [],
      hasMoreItems: true
    };
  }

  update(props: CategoryProps) {
    this.category = props.category;
    this.title = this.categories.filter(c => c.id === this.category)[0].title;
  }

  loadItems(page: any) {

    page -= 1;

    fetch(`http://localhost:5000/api/products?category=${this.props.category}&page=${page}`)
      .then(res => res.json())
      .then(res => {
        const newProducts = this.state.products.concat(res.products);
        this.setState({
          products: newProducts,
          filters: res.filters,
          hasMoreItems: !res.pagination.last
        });
      });
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
          <FiltersContainer
            filters={this.state.filters}
          ></FiltersContainer>
          <ProductsContainer
            key={this.category}
            category={this.category}
            title={this.title}
            products={this.state.products}
            hasMoreItems={this.state.hasMoreItems}
            loadItems={this.loadItems.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default CategoryContainer;