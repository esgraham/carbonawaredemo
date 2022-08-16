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
        const forecastValues = this.state.forecastData.forecastValues;
        const actualValues = this.state.actualData.actualValues;
        const forecastActualValues = this.state.forecastData.actualValues;
        const forecastTime = this.state.forecastData.optimalTime;

        var forecastSum = forecastValues.reduce(function (pv, cv) { return pv + cv; }, 0);
        var actualSum = actualValues.reduce(function (pv, cv) { return pv + cv; }, 0);
        var forecastActualSum = forecastActualValues.reduce(function (pv, cv) { return pv + cv; }, 0);

        this.props.handleSavingsChange(
            {
                percentage: ((forecastActualSum - actualSum) / actualSum) * 100,
                total: actualSum - forecastActualSum
            });

        const footer = (tooltipItems) => {
            let time;

            tooltipItems.forEach(function (tooltipItem) {
                if (tooltipItem.datasetIndex > 0) {
                    if (forecastTime !== null) {
                        time = forecastTime[tooltipItem.dataIndex];
                    }
                    else { time = 'N/A' }
                }
            });
            return 'Optimal Forecast Time: ' + time;
        };

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
                tooltip: {
                    callbacks: {
                        footer: footer,
                    }
                },
            },
        };

        const data = {
            labels,
            datasets: [
                {
                    label: 'Original (Actual)',
                    data: actualValues,
                    borderColor: 'rgb(230, 0, 0)',
                    backgroundColor: 'rgba(230, 0, 0, 0.5)',
                },
                {
                    label: 'Optimal (Forecast)',
                    data: forecastValues,
                    borderColor: 'rgb(0, 0, 0)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                {
                    label: 'Actual (Forecast)',
                    data: forecastActualValues,
                    borderColor: 'rgb(244, 184, 0)',
                    backgroundColor: 'rgba(244, 184, 0, 0.5)',
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
