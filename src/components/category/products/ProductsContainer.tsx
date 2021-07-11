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

function ProductsContainer(props: ProductsProps) {

    const loader = <div key="loader" className="loader">Loading ...</div>;

    return (
        <div className="col-md-9 col-lg-9 col-xl-10 bd-content">
            <InfiniteScroll
                className="row"
                pageStart={0}
                loadMore={props.loadItems}
                hasMore={props.hasMoreItems}
                loader={loader}>

                {renderProducts(props)}
            </InfiniteScroll>
        </div>
    );


}

function renderProducts(props: ProductsProps) {
    return (
            props.products
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

export default ProductsContainer;