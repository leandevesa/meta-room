import React, { Component } from 'react';
import Product from './Product';
import { Product as ProductDTO } from '../dto/Product/Product';

class ProductsContainer extends Component<any> {

    private products: Array<ProductDTO>;

    constructor(props: any) {
        super(props);
        this.products = require('../data/products.json')[this.props.category];
    }
    
    render() {
        return (
            <div className="row">
                {this.renderProducts()}
            </div>
        );
    }

    renderProducts = () => {
        return this.products.map((p, i) => 
                    <Product 
                        key={i}
                        name={p.name}
                        price={p.price}
                        pictures={p.pictures}
                        flags={p.flags}
                        url={p.url}
                    />
                );
    }
}

export default ProductsContainer;