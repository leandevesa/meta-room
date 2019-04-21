import React, { Component } from 'react';
import './ProductContent.css';
import { Price } from '../../../dto/Product/Price';
import { isNullOrUndefined } from 'util';

interface ContentProps {
    name: string;
    price: Price;
    url: string;
}

class ProductContent extends Component<ContentProps> {

    render() {
        return (
            <div className="product-content">
                <h3 className="title">
                    <a target="_blank" href={this.props.url}>
                        {this.props.name}
                    </a>
                </h3>
                <div className="price">
                    {this.formatPrice(this.props.price.now)}
                    {this.renderBeforePrice(this.props.price.before)}
                </div>
            </div>
        );
    }

    renderBeforePrice = (price?: number) => {
        if (!isNullOrUndefined(price))
            return <span className="price-before">
                        {this.formatPrice(price)}
                    </span>;
    }

    formatPrice = (price: number) => {
        return price.toLocaleString('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                });
    }
}

export default ProductContent;