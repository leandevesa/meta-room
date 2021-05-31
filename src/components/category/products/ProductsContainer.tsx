import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Product as ProductDTO } from '../../../dto/Product/Product';
import Product from './Product';

interface ProductsProps {
    category: string,
    title: string
}

interface ProductsState {
    products: Array<ProductDTO>;
    hasMoreItems: boolean;
}

class ProductsContainer extends Component<ProductsProps, ProductsState> {

    constructor(props: ProductsProps) {
        super(props);
        this.state = {
            products: [],
            hasMoreItems: true
        };
    }

    loadItems(page: any) {

        page -= 1;

        fetch(`http://localhost:5000/api/products?category=${this.props.category}&page=${page}`)
            .then(res => res.json())
            .then(res => {
                const newProducts = this.state.products.concat(res.products);
                this.setState({
                    products: newProducts,
                    hasMoreItems: !res.pagination.last
                });
            });
    }

    render() {
        const loader = <div key="loader" className="loader">Loading ...</div>;

        return (
            <div className="col-12 col-md-9 col-lg-10 col-xl-10 py-md-3 pl-md-5 bd-content">
                <div className="row">
                    <h3 className="h3">{this.props.title}</h3>
                </div>
                <InfiniteScroll
                    className="row"
                    pageStart={0}
                    loadMore={this.loadItems.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    loader={loader}>

                    {this.renderProducts()}
                </InfiniteScroll>
            </div>
        );
    }

    renderProducts() {
        return (
            this.state
                .products
                .map((p: ProductDTO, i: number) =>
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