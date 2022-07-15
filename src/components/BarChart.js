import React, { Component } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as Forecast from '../services/Forecast'
import * as Actual from '../services/Actual'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forecastData: null,
            actualData: null,
            error: false,
            isLoaded: false,
            forecastDuration: props.forcastduration,
            selectedRetrospectiveDurationOption: props.selectedRetrospectiveDurationOption,
            selectedRegionOption: props.selectedRegionOption,
            selectedStartTime: props.selectedStartTime,
            selectedEndTime: props.selectedEndTime,
            selectedGenerationTime: props.selectedGenerationTime
        };
    }

    async getChartData() {
        try {

            const forecastResponse = await Forecast.getForecastData(this.state.selectedRegionOption, this.state.forecastDuration, this.state.selectedRetrospectiveDurationOption, this.state.selectedStartTime, this.state.selectedEndTime, this.state.selectedGenerationTime);
            const actualResponse = await Actual.getActualData(this.state.selectedRegionOption, this.state.selectedRetrospectiveDurationOption, this.state.selectedStartTime, this.state.selectedEndTime);

            this.setState({ forecastData: forecastResponse });
            this.setState({ actualData: actualResponse });
            this.setState({ isLoaded: true });
        } catch (error) {
            this.setState({ error: true });
        }
    }

    componentDidMount() {
        this.getChartData();
    }

    render() {
        if (!this.state.isLoaded) {
            return null /* or a loader/spinner */
        }


        const labels = this.state.forecastData.forecastDates.FormattedDate;
        const data1 = this.state.forecastData.forecastValues;
        const data2 = this.state.actualData.actualValues;

        const options = {
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2,
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Original compared to Forecasted at ' + this.props.forcastduration + ' hours',
                },
            },
        };

        const data = {
            labels,
            datasets: [
                {
                    label: 'Optimal (Forecast)',
                    data: data1,
                    borderColor: 'rgb(0, 0, 0)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                {
                    label: 'Original (Actual)',
                    data: data2,
                    borderColor: 'rgb(230, 0, 0)',
                    backgroundColor: 'rgba(230, 0, 0, 0.5)',
                },
            ],
        };

        return (
            <div>
                <Bar options={options} data={data} />
            </div>
        );
    }
}

export default BarChart
