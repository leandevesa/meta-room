import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Product from './Product';
import { Product as ProductDTO } from '../../../dto/Search/Product';

interface ProductsProps {
    category: string;
    title: string;
    products: Array<ProductDTO>;
    hasMoreItems: boolean;
    loadItems(page: number): void
}

class ProductsContainer extends Component<ProductsProps> {

    constructor(props: ProductsProps) {
        super(props);
    }

    render() {
        const loader = <div key="loader" className="loader">Loading ...</div>;

        return (
            <div className="col-md-9 col-lg-9 col-xl-10 bd-content">
                <InfiniteScroll
                    className="row"
                    pageStart={0}
                    loadMore={this.props.loadItems.bind(this)}
                    hasMore={this.props.hasMoreItems}
                    loader={loader}>

                    {this.renderProducts()}
                </InfiniteScroll>
            </div>
        );
    }

    renderProducts() {
        return (
            this.props
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