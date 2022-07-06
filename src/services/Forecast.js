import axios from "axios";
import React, { Component } from 'react';


export default class ForecastData extends Component {
    state = {
        nodes: null,
    };
    async componentDidMount() {
        axios.get('the url').then(response => {
            const nodes = response.data;
            this.setState({nodes});
        });
      }

      render() {
        const {nodes} = this.state;

        if (!nodes) return 'Loading...'

        return <ForecastData nodes={nodes} />;
    }
}