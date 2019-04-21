import React, { Component } from 'react';
import { Route } from 'react-router';
import MainContainer from './components/MainContainer';

class App extends Component {

  render() {
    return (
      <div>
          <Route 
            path='/products/:category' 
            component={MainContainer}
          />
      </div>
    )
  }
}

export default App;
