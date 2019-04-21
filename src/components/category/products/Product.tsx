import React, { Component } from 'react';
import './Product.css';
import ProductImage from './ProductImage';
import ProductContent from './ProductContent';
import { Product as ProductDTO } from '../../../dto/Product/Product';

class Product extends Component<ProductDTO> {
    
    render() {
        return (
            <div className="product-container col-lg-3 col-md-4 col-sm-6 col-6">
                <div className="product-grid3">
                    <ProductImage 
                        pictures={this.props.pictures}
                        flags={this.props.flags}
                        url={this.props.url}
                    />
                    <ProductContent 
                        name={this.props.name}
                        price={this.props.price}
                        url={this.props.url}
                    />
                </div>
            </div>
        );
    }
}

export default Product;