import axios from 'axios';
import * as DateType from './DateType'
import { Dates } from '../components/Dates';

function parseTime(s) {
  var c = s.split(':');
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}

export const getForecastData = async (location, forecastDuration, dateType, startTime, endTime, generatedAt) => {

  var forecastDates=null;
  if (dateType==='workweek')
  {
    forecastDates = DateType.workweekDates();
  }
  var forecastValues = new Array();
  var forecastRequest = new Array();

  const windowSize = parseTime(endTime.value) - parseTime(startTime.value);

  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  await Promise.all(forecastDates.Dates.map(async (date) =>{
    var dtStart = new Dates(date.toDateString() + ' ' + generatedAt.value);
    var dtEnd = dtStart.addHours(parseInt(forecastDuration));

    forecastRequest.push(
      {
        location: location,
        startTime: dtStart.toISOString(),
        endTime: dtEnd.toISOString(),
        windowSize: windowSize,
        requestedAt:  dtStart.toISOString()
      }
    );
      
  }));

  var batch = JSON.stringify(forecastRequest);

  await axios.post('/emissions/forecasts/batch', { batch }).then((response) => {
      forecastValues = response.data.map( (forecast) => {
        return forecast.optimalDataPoint.value;
      })
    })

  return {forecastDates,forecastValues};
}

