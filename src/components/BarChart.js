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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

class BarChart extends Component {
    render() {
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        const data1 = [20, 35, 100, 56, 78, 90, 23];
        const data2 = [28, 40, 110, 45, 62, 87, 12];

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
            }
        };

        const data = {
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: data1,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Dataset 2',
                    data: data2,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
