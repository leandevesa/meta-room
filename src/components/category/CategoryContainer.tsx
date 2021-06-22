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

interface PriceFilter {
  max: number;
}

interface ActiveFilters {
  price?: PriceFilter;
  sort?: string;
}

interface CategoryState {
  products: Array<ProductDTO>;
  hasMoreItems: boolean;
  filters?: FiltersDTO;
  activeFilters?: ActiveFilters;
}

class CategoryContainer extends Component<CategoryProps, CategoryState> {

  private title: string = "";
  private category: string = "";
  private page: number = 0;
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

  loadItems() {

    let url = `http://localhost:5000/api/products?category=${this.props.category}&page=${this.page}`;

    if (this.state.activeFilters) {
      const activeFilters = this.state.activeFilters;
      if (activeFilters.price) {
        if (activeFilters.price.max && this.state.filters && this.state.filters.prices.max !== activeFilters.price.max) {
          url += `&price_max=${activeFilters.price.max}`;
        }
      }
      if (activeFilters.sort) {
        url += `&sort=${activeFilters.sort}`;
      }
    }

    fetch(url)
      .then(res => res.json())
      .then(res => {
        const newProducts = this.state.products.concat(res.products);
        this.page++;
        this.setState({
          products: newProducts,
          filters: res.filters,
          hasMoreItems: !res.pagination.last
        });
      });
  }

  componentDidUpdate(prevProps: CategoryProps) {
    if (this.props.category !== prevProps.category) {
      this.resetState();
    }
  }

  priceFilterChanged(newMaxPrice: number) {
    const filtersUpdate: ActiveFilters = {
      price: {
        max: newMaxPrice
      }
    }
    this.handleFiltersChange(filtersUpdate);
  }

  sortChanged(newSort: string) {
    const filtersUpdate: ActiveFilters = {
      sort: newSort
    }
    this.handleFiltersChange(filtersUpdate);
  }

  handleFiltersChange(filterUpdate: ActiveFilters) {
    const activeFilters = this.state.activeFilters ? 
      {... this.state.activeFilters, ... filterUpdate} :
      filterUpdate;
    this.page = 0;
    this.setState({
      activeFilters,
      products: [],
      hasMoreItems: true
    });
  }

  resetState() {
    this.page = 0;
    this.setState({
      activeFilters: undefined,
      products: [],
      hasMoreItems: true
    });
  }

  render() {
    return (
      <div className="container category-container">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xl-2"></div>
          <div className="col-md-9 col-lg-9 col-xl-10">
            <h3 className="h3">{this.title}</h3>
          </div>
        </div>
        <div className="row flex-xl-nowrap">
          <FiltersContainer
            filters={this.state.filters}
            priceFilterChanged={this.priceFilterChanged.bind(this)}
            sortChanged={this.sortChanged.bind(this)}
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