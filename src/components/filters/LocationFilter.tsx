import React, { Component } from 'react';
import Select from 'react-select';
import { StateLocation } from '../../dto/Search/Filters/Available/StateLocation';

interface LocationFilterProps {
  locations: Array<StateLocation>;
  onChange(states: Array<string>, regions: Array<string>): void;
}

interface LocationFilterState {
  statesOptions: Array<any>;
  regionsOptions: Array<any>;
  regionsIsDisabled: boolean;
}

class LocationFilter extends Component<LocationFilterProps, LocationFilterState> {

  private statesApplied: Array<string> = [];
  private regionsApplied: Array<string> = [];
  private thereAreChanges: boolean = false;

  constructor(props: LocationFilterProps) {
    super(props);
    this.state = LocationFilter.transformPropsToSelectValues(props);
  }

  stateChanged(s: any) {
    const previousStatesApplied = this.statesApplied;
    this.statesApplied = s.map((i: any) => i.value);
    this.thereAreChanges = this.thereAreChanges || (previousStatesApplied !== this.statesApplied);
  }

  regionChanged(s: any) {
    const previousRegionsApplied = this.regionsApplied;
    this.regionsApplied = s.map((i: any) => i.value );
    this.thereAreChanges = this.thereAreChanges || (previousRegionsApplied !== this.regionsApplied);
  }

  menuClosed() {
    if (this.thereAreChanges) {
      this.props.onChange(this.statesApplied, this.regionsApplied)
      this.thereAreChanges = false;
    };
  }

  static getDerivedStateFromProps(props: LocationFilterProps) {
    return LocationFilter.transformPropsToSelectValues(props);
  }

  static transformPropsToSelectValues(props: LocationFilterProps) {

    const statesOptions = props.locations.map(s => {
      return {
        value: s.id.toString(),
        label: s.description
      }
    });

    const regionsOptions = props.locations.map(s => {
      return {
        label: s.description,
        options: s.regions.map(r => {
          return {
            value: r.id.toString(),
            label: r.description
          }
        })
      }
    }).filter(r => r.options.length);

    const regionsIsDisabled = !regionsOptions.length;

    return {
      statesOptions,
      regionsOptions,
      regionsIsDisabled
    }
  }

  render() {
    return (
      <div className="col-md-12 filter">
        <label className="bd-label">Ubicación</label>
        <br></br>
        <label>Provincia</label>
        <Select options={this.state.statesOptions}
                isMulti
                onChange={this.stateChanged.bind(this)}
                onMenuClose={this.menuClosed.bind(this)}
                closeMenuOnSelect={false}
                placeholder='Provincia' >
        </Select>
        <br></br>
        <label>Localidad</label>
        <Select options={this.state.regionsOptions}
                isMulti
                isDisabled={this.state.regionsIsDisabled}
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