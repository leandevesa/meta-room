import React, { Component } from 'react';
import 'rc-slider/assets/index.css';
import './Filter.css';
import './CustomRange.css';
import Range, { Marks } from 'rc-slider';

interface RangeProps {
    max: number;
    min: number;
    avg: number;
    label: string;
    rangeChanged(newValue: number): void
}

interface RangeState {
    value: number;
}

class CustomRange extends Component<RangeProps, RangeState> {

    private tid: any = undefined;

    constructor(props: RangeProps) {
      super(props);
      this.state = {
          value: this.props.max
      }
    }

    getMarks(): Marks {
        
        const marks: Marks = {};
        marks[this.props.min] = `${this.props.min.toString()}$`;
        marks[this.props.avg] = <strong>{this.state.value.toString()}$</strong>;
        marks[this.props.max] = `${this.props.max.toString()}$`;
        
        return marks;
    }

    handleValueChange(value: any) {
        this.setState({value: value});
        if (this.tid) clearTimeout(this.tid);
        this.tid = setTimeout(() => {
            this.props.rangeChanged(value);
        }, 600);
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