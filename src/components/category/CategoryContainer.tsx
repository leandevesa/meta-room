import React, { Component } from 'react';
import './CategoryContainer.css';
import ProductsContainer from './products/ProductsContainer';
import { Category } from '../../dto/Category';
import FiltersContainer from '../filters/FiltersContainer';
import { ApplicableFilters } from '../../dto/Search/Filters/Applicable/ApplicableFilters';
import { SearchResponse } from '../../dto/Search/SearchResponse';
import { Product } from '../../dto/Search/Product';
import { Filters } from '../../dto/Search/Filters';

interface CategoryProps {
  category: string;
}

interface CategoryState {
  products: Array<Product>;
  filters?: Filters;
  hasMoreItems: boolean;
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

    let url = `http://localhost:5000/api/search?category=${this.props.category}&page=${this.page}`;

    if (this.state.filters && this.state.filters.applied && this.state.filters.available) {

      const appliedFilters = this.state.filters.applied;
      const availableFilters = this.state.filters.available;

      if (appliedFilters.prices) {
        if (appliedFilters.prices.max && appliedFilters.prices.max !== availableFilters.prices.max) {
          url += `&price_max=${appliedFilters.prices.max}`;
        }
      }

      if (appliedFilters.sort) {
        url += `&sort=${appliedFilters.sort}`;
      }

      if (appliedFilters.states && appliedFilters.states.length) {
        const joinedStates = appliedFilters.states.join(",");
        url += `&states=${joinedStates}`;
      }

      if (appliedFilters.regions && appliedFilters.regions.length) {
        const joinedRegions = appliedFilters.regions.join(",");
        url += `&regions=${joinedRegions}`;
      }
    }

    fetch(url)
      .then(res => res.json())
      .then((res: SearchResponse) => {

        const allProducts = this.concatenateProducts(res.products);

        this.page++;

        this.setState({
          products: allProducts,
          hasMoreItems: !res.pagination.last,
          filters: res.filters
        });
      });
  }

  concatenateProducts(newProducts: Array<Product>): Array<Product> {

    const oldProducts = this.state.products ? this.state.products : [];

    return oldProducts.concat(newProducts);
  }

  componentDidUpdate(prevProps: CategoryProps) {
    if (this.props.category !== prevProps.category) {
      this.resetState();
    }
  }

  priceFilterChanged(newMaxPrice: number) {
    const filtersUpdate: ApplicableFilters = {
      prices: {
        max: newMaxPrice
      }
    }
    this.handleFiltersChange(filtersUpdate);
  }

  sortChanged(newSort: string) {
    const filtersUpdate: ApplicableFilters = {
      sort: newSort
    }
    this.handleFiltersChange(filtersUpdate);
  }

  locationFilterChanged(statesApplied: Array<string>, regionsApplied: Array<string>) {
    const filtersUpdate: ApplicableFilters = {
      regions: regionsApplied,
      states: statesApplied,
    }
    this.handleFiltersChange(filtersUpdate);
  }

  handleFiltersChange(filterUpdate: ApplicableFilters) {
    
    const appliedFilters = (this.state.filters && this.state.filters.applied) ?
      { ...this.state.filters.applied, ...filterUpdate } :
      filterUpdate;
    
    const filters = this.state.filters ? 
      { ...this.state.filters, appliedFilters } :
      undefined;

    this.page = 0;
    
    this.setState({
      filters,
      products: [],
      hasMoreItems: true
    });
  }

  resetState() {
    this.page = 0;
    this.setState({
      filters: undefined,
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
            locationFilterChanged={this.locationFilterChanged.bind(this)}
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