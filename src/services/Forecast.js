import axios from 'axios';
import * as DateType from './DateType'
import { Dates } from '../components/Dates';

function parseTime(s) {
  var c = s.split(':');
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}

export const getForecastData = async (location, forecastDuration, dateType, startTime, endTime, generatedAt) => {
  var forecastDates = null;

  const windowSize = parseTime(endTime) - parseTime(startTime);

  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  switch (dateType) {
    case 'workweek': forecastDates = DateType.workweekDates();
      break;
    case 'month': forecastDates = DateType.previousMonthDates();
      break;
      case 'year': forecastDates =  await getForecastYearData(location, forecastDuration, windowSize, generatedAt);
      var r = 
      {
        forecastDates: {
          FormattedDate: forecastDates.forecastDates
        },
        forecastValues: forecastDates.forecastValues
      };
      return r;
      break;
    default:
    // body of default
  }

  if (dateType==='year')
  {
    return;
  }

  var forecastValues = new Array();
  var forecastRequest = new Array();

  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  await Promise.all(forecastDates.Dates.map(async (date) => {
    var dtStart = new Dates(date.toDateString() + ' ' + generatedAt);
    var dtEnd = dtStart.addHours(parseInt(forecastDuration));
    forecastRequest.push(
      {
        location: location,
        startTime: dtStart.toISOString(),
        endTime: dtEnd.toISOString(),
        windowSize: windowSize,
        requestedAt: dtStart.toISOString()
      }
    );

  }));

  var batch = JSON.stringify(forecastRequest);

  await axios.post('/emissions/forecasts/batch', { batch }).then((response) => {
    forecastValues = response.data.map((forecast) => {
      return forecast.optimalDataPoint.value;
    })
  })

  return { forecastDates, forecastValues };
}

export const getForecastYearData = async (location, forecastDuration, windowSize, generatedAt) => {

  var forecastDates = new Array();
  var forecastValues = new Array();


  var lastyearDate = DateType.lastYear();
  var month = lastyearDate.previousMonth();

  for (let i = 0; i < 12; i++) {
   
    console.log('In forcast loop', i);
    var MonthDates = DateType.nextMonthDates(month)
    var forecastRequest = new Array();
    var forecastMonthValues = new Array();

    await Promise.all(MonthDates.Dates.map(async (date) => {
      var dtStart = new Dates(date.toDateString() + ' ' + generatedAt);
      var dtEnd = dtStart.addHours(parseInt(forecastDuration));

      forecastRequest.push(
        {
          location: location,
          startTime: dtStart.toISOString(),
          endTime: dtEnd.toISOString(),
          windowSize: windowSize,
          requestedAt: dtStart.toISOString()
        }
      );

    }));

    var batch = JSON.stringify(forecastRequest);

    await axios.post('/emissions/forecasts/batch', { batch }).then((response) => {
      forecastMonthValues = response.data.map((forecast) => {
        return forecast.optimalDataPoint.value;
      })
    })

    var monthName = MonthDates.Dates[0].toLocaleString("en-us", { month: "long" });
    console.log('Forecast month', monthName);
    var forecastSum = forecastMonthValues.reduce(function(pv, cv) { return pv + cv; }, 0);
    forecastValues.push(forecastSum);
    forecastDates.push(monthName);

    month = month.nextMonth();
  }

  return {  forecastDates,  forecastValues };
}

