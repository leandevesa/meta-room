import React, { Component } from 'react';
import './Hamburger.css';

class Hamburger extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isClosed: false
        }
    }
  
    handleClick() {
        this.setState({isClosed: !this.state.isClosed});
    }

    renderClasses() {
        const classes = ["hamburger"];
        if (this.state.isClosed) {
            classes.push("cross");
        }
        return classes.join(" ");
    }

    render() {
      return (
        <div onClick={(e) => this.handleClick()} className={this.renderClasses()}>
            <svg viewBox="0 150 300 430">
                <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top"></path>
                <path d="M300,320 L540,320" id="middle"></path>
                <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path>
            </svg>
        </div>
      );
    }
}

export default Hamburger;