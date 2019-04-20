import React, { Component } from 'react';
import './Spinner.css';

interface SpinnerProps {
    max: number;
    min: number;
    step: number;
    label: string;
}

interface SpinnerState {
    value: number;
}

enum SpinnerAction {
    INCREASE,
    DECREASE
}

class Spinner extends Component<SpinnerProps, SpinnerState> {

    constructor(props: SpinnerProps) {
      super(props);
      this.state = {
          value: this.props.max
      }
    }

    handleValueChange(newValue: string) {
        this.setState({value: parseInt(newValue)});
    }

    handleClick(action: SpinnerAction) {
        switch (action) {
            case SpinnerAction.INCREASE:
                this.setState({value: this.state.value + this.props.step});
                break;
            case SpinnerAction.DECREASE:
                this.setState({value: this.state.value - this.props.step});
                break;
        }
    }
  
    render() {
      return (
          <div className="bd-toc-item">
            <label className="bd-label">{this.props.label}</label>
            <div className="input-group spinner">
                <div className="input-group-prepend">
                    <button className="btn btn-decrement btn-outline-secondary spinner"
                        type="button" onClick={() => this.handleClick(SpinnerAction.DECREASE)}>
                        <strong>-</strong>
                    </button>
                </div>
                <input type="number" 
                       min={this.props.min}
                       max={this.props.max}
                       step={this.props.step}
                       value={this.state.value}
                       onChange={e => this.handleValueChange(e.target.value)}
                       className="form-control" />
                <div className="input-group-append">
                    <button className="btn btn-increment btn-outline-secondary spinner"
                        type="button" onClick={() => this.handleClick(SpinnerAction.INCREASE)}>
                        <strong>+</strong>
                    </button>
                </div>
            </div>
          </div>
      );
    }
}

export default Spinner;