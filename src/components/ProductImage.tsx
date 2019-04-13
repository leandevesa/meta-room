import React, { Component } from 'react';
import './ProductImage.css';
import { Flags } from '../dto/Product/Flags';

interface ImageProps {
    pictures: Array<string>;
    flags?: Flags;
    url: string;
}

class ProductImage extends Component<ImageProps, any> {

    constructor(props: ImageProps) {
        super(props);
        this.state = {
            pictures: [this.props.pictures.pop()]
        };
    }

    render() {
        return (
            <div className="product-image">
                <a target="_blank" href={this.props.url}>
                    {this.renderPictures()}
                </a>
                {this.renderFlags()}
            </div>
        );
    }

    onMouseOver = () => {
        if (this.props.pictures.length) {
            this.state.pictures.push(this.props.pictures.pop());
            this.setState({pictures: this.state.pictures});
        }
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
        return this.state.pictures.map((p: any, i: any) =>
            <img key={i} 
                 onMouseOver={this.onMouseOver}
                 className={`pic-${i}`}
                 src={p}
            />
        );
    }
}

export default ProductImage;