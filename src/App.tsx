import React, { Component } from 'react';
import CategoryContainer from './components/CategoryContainer';
import NavBar from './components/NavBar';
import Logo from './components/Logo';
import { Product } from './dto/Product/Product';
import { Category } from './dto/Category';

const categories: Array<Category> = require('./data/categories.json').categories;

interface State {
  title: string;
  products: Array<Product>
}

class App extends Component<any, State> {

  constructor(props: any) {
    super(props);
    const products = require('./data/products.json')['tshirts'];
    this.state = {
      title: "Remeras & Musculosas",
      products: products
    }
  }

  handleCategoryChange(category: string) {
    const products = require('./data/products.json')[category];
    this.setState({
      title: categories.filter(c => c.id === category)[0].title,
      products: products
    });
  }

  render() {
    return (
      <div>
          <Logo />
          <NavBar 
            onCategoryChange={this.handleCategoryChange.bind(this)}
          />
          <CategoryContainer 
            title={this.state.title}
            products={this.state.products}
          />
      </div>
    )
  }
}

export default App;
