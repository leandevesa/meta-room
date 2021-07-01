import React, { Component } from 'react';
import './ProductImage.css';
import { Flags } from '../../../dto/Search/Flags';
import { isNullOrUndefined } from 'util';

interface ProductImageProps {
    pictures: Array<string>;
    flags?: Flags;
    url: string;
}

interface ProductImageState {
    pictures: Array<string>;
}

class ProductImage extends Component<ProductImageProps, ProductImageState> {

    constructor(props: ProductImageProps) {
        super(props);

        const initPicture = this.props.pictures.pop();

        this.state = {
            pictures: !isNullOrUndefined(initPicture) ? [initPicture] : []
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
            const picture = this.props.pictures.pop();
            if (!isNullOrUndefined(picture)) {
                this.state.pictures.push(picture);
                this.setState({pictures: this.state.pictures});
            }
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
        return this.state.pictures.map((p: string, i: number) =>
            <img key={i} 
                 onMouseOver={this.onMouseOver}
                 className={`pic-${i}`}
                 src={p}
            />
        );
    }
}

export default ProductImage;