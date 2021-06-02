import React, { Component } from 'react';
import Select from 'react-select';

class CustomSelect extends Component {

  private static options = [
    { value: 'cheaper-first', label:  'Precio, menores primero'},
    { value: 'expensive-first', label:  'Precio, mayores primero'},
    { value: 'new-first', label:  'Fecha, nuevos primero'},
    { value: 'old-first', label:  'Fecha, antiguos primero'},
    { value: 'most-sold', label:  'Más vendidos'},
  ];

  private static selectStyles = {
    container: (base: any, state: any) => ({
      ...base,
      zIndex: "999"
    })
  };

  render() {
    return (
      <div className="col-md-2 filter">
        <label className="bd-label">Ordenar por:</label>
        <Select options={CustomSelect.options}
                styles={CustomSelect.selectStyles}
                defaultValue={CustomSelect.options[0]} >
        </Select>
      </div>
    );
  }
}

export default CustomSelect;