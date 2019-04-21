import React, { Component } from 'react';
import './Logo.css';
import LogoSVG from '../../logo.svg';

class Logo extends Component {
  
    render() {
      return (
          <div className="logo-container">
            <img src={LogoSVG} className="logo" />
          </div>
      );
    }
}

export default Logo;