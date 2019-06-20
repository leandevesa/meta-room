import React, { Component } from 'react';
import 'rc-slider/assets/index.css';
import './Filter.css';
import './CustomRange.css';
import Range, { Marks } from 'rc-slider';

interface RangeProps {
    max: number;
    min: number;
    label: string;
}

interface RangeState {
    value: number;
}

class CustomRange extends Component<RangeProps, RangeState> {

    constructor(props: RangeProps) {
      super(props);
      this.state = {
          value: this.props.max
      }
    }

    getMarks(): Marks {
        const average = Math.round((this.props.max - this.props.min) / 2); //TODO: to back?
        
        const marks: Marks = {};
        marks[this.props.min] = `${this.props.min.toString()}$`;
        marks[average] = <strong>{average.toString()}$</strong>;
        marks[this.props.max] = `${this.props.max.toString()}$`;
        
        return marks;
    }

    handleValueChange(value: any) {
        this.setState({value: value});
        console.log(value);
    }
  
    render() {
        return (
            <div className="filter">
                <Range 
                    min={this.props.min}
                    max={this.props.max}
                    marks={this.getMarks()}
                    onChange={this.handleValueChange.bind(this)}
                    defaultValue={this.props.max}
                />
            </div>
        );
    }
}

export default CustomRange;