import React, { Component } from 'react';
import Select from 'react-select';

const durationOptions = [
    { value: 'year', label: 'Previous Year' },
    { value: 'halfyear', label: 'Last 6 Months'},
    { value: 'month', label: 'Last Month' },
    //{ value: 'week', label: 'Last Week' },
    { value: 'workweek', label: 'Last Work Week' },
    //{ value: 'day', label: 'Yesterday' },
    //{ value: 'current', label: 'Current' }
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
            selectedStartTime: '10:00',
            selectedEndTime: '10:15',
            selectedGenerationTime: '10:00',
            selectedForecastDuration: 24,
            selectedDate: null,
            showMonth: false
        };
    }

    handleRetrospectiveDurationChange = selectedRetrospectiveDurationOption => {
        var value = selectedRetrospectiveDurationOption.value;
        if (value==='year')
        {
            alert('Getting Carbon Aware Data for an entire year can take upto an hour.')
        }
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
        this.props.handleStartTimeChange(value);
    };
    handleEndTimeChange = (selectedEndTime) => {
        var value = selectedEndTime.target.value;
        this.setState({ selectedEndTime });
        this.props.handleEndTimeChange(value);
    };
    handleDateChange = (selectedDate) => {
        var value = selectedDate.target.value;
        this.setState({ selectedDate });
        this.props.handleDateChange(value);
    };
    handleGeneratedAtChange = (selectedGenerationTime) => {
        var value = selectedGenerationTime.target.value;
        this.setState({ selectedGenerationTime });
        this.props.handleGeneratedAtChange(value);
    };
    handleForecastDurationChange = (selectedForecastDuration) => {
        var value = selectedForecastDuration.target.value;
        this.setState({ selectedForecastDuration });
        this.props.handleForecastDurationChange(value);
    };
    setdefaultValues() {
        this.props.handleForecastDurationChange(24);
        this.props.handleGeneratedAtChange('10:00');
        this.props.handleStartTimeChange('10:00');
        this.props.handleEndTimeChange('10:15');

    }

    componentDidMount() {
        this.setdefaultValues();
    }

    render() {
        const { selectedRetrospectiveDurationOption } = this.state;
        const { selectedRegion } = this.state;

        return (
            <div>
                <div style={{ width: '300px', height: '50px', padding: '5px' }}>
                    <Select
                        value={selectedRetrospectiveDurationOption}
                        placeholder='Select Time Period'
                        onChange={this.handleRetrospectiveDurationChange}
                        options={durationOptions}
                    />
                    {this.state.showMonth && (<div>
                        <label style={{ paddingRight: '5px' }}>Month</label>
                        <input type="date" onChange={this.selectedDate} defaultValue='01/01/2021' /></div>
                    )
                   }
                </div>
                <br></br>
                <div style={{ width: '600px' }} >
                    <h5 id="header" style={{ padding: '5px' }} >Azure Batch Information</h5>
                    <div style={{ display: 'inline-flex', padding: '5px' }} >
                        <label style={{ paddingRight: '5px' }}>Start Time</label>
                        <input type="time" onChange={this.handleStartTimeChange} defaultValue='10:00' />
                    </div>
                    <div style={{ display: 'inline-flex', padding: '5px' }} >
                        <label style={{ paddingRight: '5px' }}>End Time</label>
                        <input type="time" onChange={this.handleEndTimeChange} defaultValue='10:15' />
                    </div>
                    <div style={{ width: '300px', height: '50px', padding: '5px' }}>
                        <Select
                            value={selectedRegion}
                            onChange={this.handleRegionChange}
                            options={regionOptions}
                            placeholder='Region'
                        />
                    </div>
                </div>
                <div style={{ width: '600px' }}>
                    <h5 id="header">Forecast Information</h5>
                    <div style={{ display: 'inline-flex', padding: '5px' }} >
                        <label style={{ paddingRight: '5px' }}>Forecast Generated At: </label>
                        <input type="time" onChange={this.handleGeneratedAtChange} defaultValue='10:00' />
                    </div>
                    <div style={{ display: 'inline-flex', padding: '5px' }} >
                        <label style={{ paddingRight: '5px' }}>Forecasted for </label>
                        <input type="text" onChange={this.handleForecastDurationChange} defaultValue='24' />
                        <label style={{ paddingRight: '5px' }}>hours </label>
                    </div>
                </div>
            </div>
        );
    }
}

export default Selector;