import React, { Component } from 'react';
import Product from './Product';
import { Product as ProductDTO } from '../dto/Product/Product';

interface ProductsContainerProps {
    products: Array<ProductDTO>;
}

class ProductsContainer extends Component<ProductsContainerProps> {
    
    render() {
        return (
            <div className="row">
                {this.renderProducts()}
            </div>
        );
    }

    renderProducts = () => {
        return this.props.products.map((p, i) => 
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