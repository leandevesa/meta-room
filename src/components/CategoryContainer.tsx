import React, { Component } from 'react';
import './CategoryContainer.css';
import ProductsContainer from './ProductsContainer';
import { Category } from '../dto/Category';
import { Product } from '../dto/Product/Product';

interface CategoryContainerProps {
  title: string;
  products: Array<Product>;
}

class CategoryContainer extends Component<CategoryContainerProps> {
  
    render() {
      return (
        <div className="container">
            <h3 className="h3">{this.props.title}</h3>
            <ProductsContainer 
              products={this.props.products}
            />
        </div>
      );
    }
}

export default CategoryContainer;