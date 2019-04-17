import React, { Component } from 'react';
import './Logo.css';
import LogoSVG from '../logo.svg';

class Logo extends Component {
  
    render() {
      return (
          <img src={LogoSVG} className="logo" />
      );
    }
}

export default Logo;