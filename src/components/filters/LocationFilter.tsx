import React, { Component } from 'react';
import Select from 'react-select';

interface LocationFilterProps {
  onChange(newValue: string): void;
}

class LocationFilter extends Component<LocationFilterProps> {

  private static StatesOptions = [
    { value: '1', label:  'CABA'},
    { value: '2', label:  'GBA - Zona Norte'},
    { value: '3', label:  'GBA - Zona Sur'},
    { value: '4', label:  'GBA - Zona Oeste'}
  ];

  private static CABAOptions = [
    { value: '1', label:  'Palermo'},
    { value: '2', label:  'Caballito'}
  ];

  private static GBAZNOptions = [
    { value: '3', label:  'Vicente López'},
    { value: '4', label:  'San Isidro'}
  ];

  private static groupedOptions = [
    {
      label: 'CABA',
      options: LocationFilter.CABAOptions,
    },
    {
      label: 'GBA - Zona Norte',
      options: LocationFilter.GBAZNOptions,
    },
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
        <label className="bd-label">Ubicación:</label>
        <Select options={LocationFilter.StatesOptions}
                isMulti
                onChange={this.valueChanged.bind(this)}
                placeholder='Provincia' >
        </Select>
        <br></br>
        <Select options={LocationFilter.groupedOptions}
                isMulti
                onChange={this.valueChanged.bind(this)}
                placeholder='Localidad' >
        </Select>
      </div>
    );
  }
}

export default LocationFilter;