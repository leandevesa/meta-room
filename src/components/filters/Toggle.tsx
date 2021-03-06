import React, { Component } from 'react';
import './Toggle.css';
import './Filter.css';

class Toggle extends Component {
    render() {
      return (
        <div className="col-md-12 filter">
            <label className="bd-label">Género</label>
            <div className="toggle-container">
                <label className="toggle-label left">M</label>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
                <label className="toggle-label right">F</label>
            </div>
        </div>
      );
    }
}

export default Toggle;