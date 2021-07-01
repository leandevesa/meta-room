import React, { Component } from 'react';
import Select from 'react-select';

interface LocationFilterProps {
  onChange(states: Array<string>, regions: Array<string>): void;
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

  private static RegionOptions = [
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

  private statesApplied: Array<string> = [];
  private regionsApplied: Array<string> = [];

  stateChanged(s: any) {
    this.statesApplied = s.map(function(i: any) { return i.value });
  }

  regionChanged(s: any) {
    this.regionsApplied = s.map(function(i: any) { return i.value });
  }

  menuClosed() {
    this.props.onChange(this.statesApplied, this.regionsApplied);
  }

  render() {
    return (
      <div className="col-md-12 filter">
        <label className="bd-label">Ubicación</label>
        <br></br>
        <label>Provincia</label>
        <Select options={LocationFilter.StatesOptions}
                isMulti
                onChange={this.stateChanged.bind(this)}
                onMenuClose={this.menuClosed.bind(this)}
                closeMenuOnSelect={false}
                placeholder='Provincia' >
        </Select>
        <br></br>
        <label>Localidad</label>
        <Select options={LocationFilter.RegionOptions}
                isMulti
                onChange={this.regionChanged.bind(this)}
                onMenuClose={this.menuClosed.bind(this)}
                closeMenuOnSelect={false}
                placeholder='Localidad' >
        </Select>
      </div>
    );
  }
}

export default LocationFilter;