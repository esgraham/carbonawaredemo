import React, { Component } from 'react';
import Select from 'react-select';

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


class Selector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRetrospectiveDurationOption: null,
            selectedRegionOption: null,
            selectedStartTime: null,
            selectedEndTune: null,
        };
    }

    handleRetrospectiveDurationChange = selectedRetrospectiveDurationOption => {
        var value = selectedRetrospectiveDurationOption.value;
        this.setState({ selectedRetrospectiveDurationOption });
        this.props.handleRetrospectiveDurationChange({ value });
    };
    handleRegionChange = (selectedRegionOption) => {
        var value = selectedRegionOption.value;
        this.setState({ selectedRegionOption });
        this.props.handleRegionChange({ value });
    };
    handleStartTimeChange = (selectedStartTime) => {
        var value = selectedStartTime.target.value;
        this.setState({ selectedStartTime });
    this.props.handleStartTimeChange({ value });
    };
    handleEndTimeChange = (selectedEndTime) => {
        var value = selectedEndTime.target.value;
        this.setState({ selectedEndTime });
    this.props.handleEndTimeChange({ value });
    };
    render() {
        const { selectedRetrospectiveDurationOption } = this.state;
        const { selectedRegion } = this.state;
        return (
            <div>
                <div style={{ width: '300px', height: '50px', padding: '5px'  }}>
                    <Select
                        value={selectedRetrospectiveDurationOption}
                        placeholder='Retrospective Time Period'
                        onChange={this.handleRetrospectiveDurationChange}
                        options={durationOptions}
                    />
                </div>
                <div style={{ width: '600px'  }} >
                    <p id="header" style={{ padding: '5px'}} ></p>
                    <div style={{ display: 'inline-flex', padding: '5px' }} >
                        <label style={{paddingRight: '5px'}}>Compute Start Time</label>
                        <input type="time" onChange={this.handleStartTimeChange}/>
                    </div>
                    <div style={{ display: 'inline-flex',  padding: '5px' }} >
                        <label style={{paddingRight: '5px'}}>Compute End Time</label>
                        <input type="time" onChange={this.handleEndTimeChange} />
                    </div>
                    <div style={{ width: '300px', height: '50px', padding: '5px'  }}>
                    <Select
                        value={selectedRegion}
                        onChange={this.handleRegionChange}
                        options={regionOptions}
                        placeholder='Region'
                    />
                </div>
                </div>
                <div style={{ width: '600px' }}>
                    <p id="header"></p>
                    <div style={{ display: 'inline-flex',  padding: '5px' }} >
                        <label style={{paddingRight: '5px'}}>Forecast Generated At: </label>
                        <input type="time" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Selector;