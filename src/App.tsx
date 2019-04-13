import React, { Component } from 'react';
import CategoryContainer from './components/CategoryContainer';
import Logo from './components/Logo'
import { Route } from 'react-router';

class App extends Component<any> {

  render() {
    return (
      <div>
          <Logo />
          <Route 
            path='/products/:category' 
            component={CategoryContainer}
          />
      </div>
    )
  }
}

export default App;
