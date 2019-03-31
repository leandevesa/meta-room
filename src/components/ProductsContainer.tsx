import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Product as ProductDTO } from '../dto/Product/Product';
import Product from './Product';

interface IState {
    products: Array<any>;
    hasMoreItems: boolean;
  }

class ProductsContainer extends Component<any, any> {

    private allProducts: Array<ProductDTO>;

    constructor(props: any) {
        super(props);
        this.allProducts = require('../data/products.json')[this.props.category];
        this.state = {
            products: [],
            hasMoreItems: true
        };
    }

    loadItems(page: any) {
        const newProducts = this.state.products.concat(this.allProducts.splice(0, 8));
        this.setState({products: newProducts});
        if (this.allProducts.length === 0) this.setState({hasMoreItems: false});
    }
    
    render() {
        const loader = <div key="loader" className="loader">Loading ...</div>;
        
        return (
            <InfiniteScroll
                className="row"
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>
                
                {this.renderProducts()}
            </InfiniteScroll>
        );
    }

    renderProducts() {
        return (
            this.state
                .products
                .map((p: any, i: any) => 
                    <Product 
                        key={i}
                        name={p.name}
                        price={p.price}
                        pictures={p.pictures}
                        flags={p.flags}
                        url={p.url}
                    />
                )
        );
    }
}

export default ProductsContainer;