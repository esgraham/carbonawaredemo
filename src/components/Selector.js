import React, { Component } from 'react';
import Select from 'react-select';
import {workweekDates} from '../services/Dates'

const durationOptions = [
    { value: 'year', label: 'Last Year' },
    { value: 'month', label: 'Last Month' },
    { value: 'week', label: 'Last Week' },
    { value: 'workweek', label: 'Last Work Week' },
    { value: 'day', label: 'Yesterday' },
    { value: 'current', label: 'Current' }
];

const regionOptions = [
    { value: 'northeurope', label: 'North Europe' },
    { value: 'westeurope', label: 'West Europe' },
    { value: 'centralus', label: 'Central US' },
    { value: 'eastus', label: 'East US' },
    { value: 'northcentralus', label: 'North Central US' },
    { value: 'southcentralus', label: 'South Central US' },
    { value: 'westcentralus', label: 'West Central US' },
    { value: 'westus', label: 'West US' }
];


const timeOptions = [
    { value: 'min', label: 'Minutes' },
    { value: 'hour', label: 'Hours' }
];

class Selector extends Component {
    state = {
        selectedDurationOption: null,
        selectedRegionOption: null,
        selectedTimeOption: null,
    };
    handleDurationChange = (selectedDurationOption) => {
        this.setState({ selectedDurationOption }, () =>
            console.log(`Option selected:`, this.state.selectedDurationOption)
        );
    };
    handleRegionChange = (selectedRegionOption) => {
        this.setState({ selectedRegionOption }, () =>
            console.log(`Option selected:`, this.state.selectedRegionOption)
        );
    };
    handleTimeChange = (selectedTimeOption) => {
        this.setState({ selectedTimeOption }, () =>
            console.log(`Option selected:`, this.state.selectedTimeOption)
        );
    };

    render() {
        const { date } = workweekDates();
        const { selectedDurationOption } = this.state;
        const { selectedRegionOption } = this.state;
        const { selectedTimeOption } = this.state;

        return (
            <div>
            <div style={{width: '300px', height: '50px'}}>
            <Select
                value={selectedDurationOption}
                placeholder='Retrospective Time Period'
                onChange={this.handleDurationChange}
                options={durationOptions}
            />
            </div>
            <div style={{width: '300px', height: '50px'}}>
            <Select
                value={selectedRegionOption}
                onChange={this.handleRegionChange}
                options={regionOptions}
                placeholder='Region'
            />
            </div>
            <div style={{width: '300px', display: 'inline-flex', 'justifyContent': 'space-around', height: '50px'}} >
            <label>
                Compute Length
            </label>
            <input type='text' style={{width: '50px', height: '40px'}}></input>
            <Select
                value={selectedTimeOption}
                onChange={this.handleTimeChange}
                options={timeOptions}
            />
            </div>
            <div>
                <button>Submit</button>
            </div>
            </div>
        );
    }
}

export default Selector;