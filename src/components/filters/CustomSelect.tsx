import React, { Component } from 'react';
import Select from 'react-select';

interface CustomSelectProps {
  onChange(newValue: string): void;
}

class CustomSelect extends Component<CustomSelectProps> {

  private static options = [
    { value: 'cheaper-first', label:  'Precio, menores primero'},
    { value: 'expensive-first', label:  'Precio, mayores primero'},
    { value: 'new-first', label:  'Fecha, nuevos primero'},
    { value: 'old-first', label:  'Fecha, antiguos primero'},
    { value: 'preferred', label:  'Preferidos'},
  ];

  private static selectStyles = {
    container: (base: any, state: any) => ({
      ...base,
      zIndex: "999"
    })
  };

  valueChanged(s: any) {
    this.props.onChange(s.value);
  }

  render() {
    return (
      <div className="col-md-12 filter">
        <label className="bd-label">Ordenar por</label>
        <Select options={CustomSelect.options}
                styles={CustomSelect.selectStyles}
                defaultValue={CustomSelect.options[0]}
                onChange={this.valueChanged.bind(this)} >
        </Select>
      </div>
    );
  }
}

export default CustomSelect;