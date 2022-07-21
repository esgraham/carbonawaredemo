import axios from 'axios';
import * as DateType from '../components/DateType'
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
    case 'halfyear': forecastDates = await getForecastDatabyMonth(location, forecastDuration, windowSize, generatedAt, 6);
      var halfyearResponse =
      {
        forecastDates: {
          FormattedDate: forecastDates.forecastDates
        },
        forecastValues: forecastDates.forecastValues
      };
      return halfyearResponse;
      break;
    case 'year': forecastDates = await getForecastDatabyMonth(location, forecastDuration, windowSize, generatedAt, 12);
      var yearResponse =
      {
        forecastDates: {
          FormattedDate: forecastDates.forecastDates
        },
        forecastValues: forecastDates.forecastValues
      };
      return yearResponse;
      break;
    default:
    // body of default
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

  await axios.post('/emissions/forecasts/batch', batch).then((response) => {
    forecastValues = response.data.map((forecast) => {
      return forecast.optimalDataPoint.value;
    })
  })

  return { forecastDates, forecastValues };
}

export const getForecastDatabyMonth = async (location, forecastDuration, windowSize, generatedAt, monthNum) => {

  var forecastDates = new Array();
  var forecastValues = new Array();


  var month = DateType.previousMonth(monthNum);

  for (let i = 0; i < monthNum; i++) {

    console.log('In forcast loop', i);
    var MonthDates = DateType.monthDates(month)
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

    //var batch = JSON.stringify(forecastRequest);

    await axios.post('/emissions/forecasts/batch', forecastRequest ).then((response) => {
      forecastMonthValues = response.data.map((forecast) => {
        return forecast.optimalDataPoint.value;
      })
    })

    var monthName = MonthDates.Dates[0].toLocaleString("en-us", { month: "long" });
    console.log('Forecast month', monthName);
    var forecastSum = forecastMonthValues.reduce(function (pv, cv) { return pv + cv; }, 0);
    forecastValues.push(forecastSum);
    forecastDates.push(monthName);

    month = month.nextMonth();
  }

  return { forecastDates, forecastValues };
}

