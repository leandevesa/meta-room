import React, { Component } from 'react';
import './ProductImage.css';
import { Flags } from '../dto/Product/Flags';

interface ImageProps {
    pictures: Array<string>;
    flags?: Flags;
    url: string;
}

class ProductImage extends Component<ImageProps> {

    constructor(props: ImageProps) {
        super(props);
    }

    render() {
        return (
            <div className="product-image3">
                <a target="_blank" href={this.props.url}>
                    {this.renderPictures()}
                </a>
                {this.renderFlags()}
            </div>
        );
    }

    renderFlags = () => {
        if (this.props.flags) {
            if (this.props.flags.isNew)
                return <span className="product-new-label">New</span>
            if (this.props.flags.isOnSale)
                return <span className="product-sale-label">Sale</span>
        }
    }

    renderPictures = () => {
        return this.props.pictures.map((p, i) =>
            <img key={i} className={`pic-${i}`} src={p} />
        );
    }
}

export default ProductImage;