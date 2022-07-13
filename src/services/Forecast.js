import axios from 'axios';
import * as Dates from './Dates'

function parseTime(s) {
  var c = s.split(':');
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}

export const getForecastData = async (location, forecastDuration, dateType, startTime, endTime) => {

  var forecastDates=null;
  if (dateType==='workweek')
  {
    forecastDates = Dates.workweekDates();
  }
  const forecastValues = new Array();

  const windowSize = parseTime(endTime.value) - parseTime(startTime.value);

  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  await Promise.all(forecastDates.Dates.map(async (date) =>{
      //const startTime = new Date(date.date).toISOString();
      //const endTime = new Date(date.date.setHours(forecastwindow)).toISOString();
      await axios.get('/emissions/forecast', 
      {params: {location: location, windowSize: windowSize}}).then((response) => {
        forecastValues.push(response.data[0].optimalDataPoint.value);
    })
  }));

  return {forecastDates,forecastValues};
}

