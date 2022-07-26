import axios from 'axios';
import * as DateType from '../components/DateType'
import { Dates } from '../components/Dates';
import * as Actual from './Actual'

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
    case 'halfyear': return await getForecastDatabyMonth(location, forecastDuration, windowSize, generatedAt, 6);
      /*var halfyearResponse =
      {
        forecastDates: {
          FormattedDate: forecastDates.forecastDates
        },
        forecastValues: forecastDates.forecastValues
      };
      return halfyearResponse;*/
      break;
    case 'year': return await getForecastDatabyMonth(location, forecastDuration, windowSize, generatedAt, 12);
      /*var yearResponse =
      {
        forecastDates: {
          FormattedDate: forecastDates.forecastDates
        },
        forecastValues: forecastDates.forecastValues
      };*/
      //return yearResponse;
      break;
    default:
    // body of default
  }

  var forecastValues = await callForecast(location, forecastDuration, windowSize, forecastDates, generatedAt);

  return { forecastDates: forecastDates, forecastValues: forecastValues.values, optimalTime: forecastValues.optimalTime, actualValues: forecastValues.actualValues };
}

export const getForecastDatabyMonth = async (location, forecastDuration, windowSize, generatedAt, monthNum) => {

  var forecastDates = new Array();
  var forecastValues = new Array();
  var forecastActualValues = new Array();


  var month = DateType.previousMonth(monthNum);

  for (let i = 0; i < monthNum; i++) {

    console.log('In forcast loop', i);
    var MonthDates = DateType.monthDates(month)
    var forecast = await callForecast(location, forecastDuration, windowSize, MonthDates, generatedAt);

    var monthName = MonthDates.Dates[0].toLocaleString("en-us", { month: "long" });
    console.log('Forecast month', monthName);
    forecastValues.push(forecast.values.reduce(function (pv, cv) { return pv + cv; }, 0));
    forecastActualValues.push(forecast.actualValues.reduce(function (pv, cv) { return pv + cv; }, 0));
    forecastDates.push(monthName);

    month = month.nextMonth();
  }

   var response =
      {
        forecastDates: {
          FormattedDate: forecastDates
        },
        forecastValues: forecastValues,
        optimalTime: null, 
        actualValues: forecastActualValues
      };

  return response;
}

const callForecast= async (location, forecastDuration, windowSize, forecastDates, generatedAt) => {
  var forecastRequest = new Array();
  var forecastValues = new Array();
  var optimalTimes = new Array();
  var actualValues = new Array();

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

  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  await axios.post('/emissions/forecasts/batch', forecastRequest).then((response) => {
    forecastValues = response.data.map((forecast) => {
      return forecast.optimalDataPoint.value;
    })
    optimalTimes = response.data.map((forecast) => {
      return forecast.optimalDataPoint.timestamp;
    })
    
  })

  await Promise.all(optimalTimes.map(async (time)=>{
    actualValues.push(await Actual.callSingleMarginCarbonIntensity(location, time, windowSize));
  }))

  return {values: forecastValues, optimalTime: optimalTimes, actualValues: actualValues};
}

