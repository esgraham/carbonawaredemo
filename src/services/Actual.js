import axios from 'axios';
import * as DateType from '../components/DateType'

export const getActualData = async (location, dateType, startTime, endTime) => {
  var actualDates = null;
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  switch (dateType) {
    case 'workweek': actualDates = DateType.workweekDates();
      break;
    case 'month': actualDates = DateType.previousMonthDates();
      break;
    case 'halfyear': actualDates = await getActualDatabyMonth(location, startTime, endTime, 6);
      var halfyearResponse =
      {
        actualDates: {
          FormattedDate: actualDates.actualDates
        },
        actualValues: actualDates.actualValues
      };
      return halfyearResponse;
      break;
    case 'year': actualDates = await getActualDatabyMonth(location, startTime, endTime, 12);
      var yearResponse =
      {
        actualDates: {
          FormattedDate: actualDates.actualDates
        },
        actualValues: actualDates.actualValues
      };
      return yearResponse;
      break;
    default:
    // body of default
  }

  const actualValues = new Array();

  await Promise.all(actualDates.Dates.map(async (date) => {
    const dtStart = new Date(date.toDateString() + ' ' + startTime);
    const dtEnd = new Date(date.toDateString() + ' ' + endTime);

    var timeIntervalValue = dtStart.toISOString() + '/' + dtEnd.toISOString();

    await axios.post('/sci-scores/marginal-carbon-intensity',
      {
        location: {
          locationType: 'CloudProvider',
          providerName: 'Azure',
          regionName: location
        },
        timeInterval: timeIntervalValue
      }
    ).then((response) => {
      actualValues.push(response.data.marginalCarbonIntensityValue);
    })
  }));

  return { actualDates, actualValues };
}

export const getActualDatabyMonth = async (location, startTime, endTime, monthNum) => {

  var actualDates = new Array();
  const actualValues = new Array();


  var month = DateType.previousMonth(monthNum);

  for (let i = 0; i < monthNum; i++) {

    console.log('In actual loop', i);
    var MonthDates = DateType.monthDates(month)
    const actualMonthValues = new Array();


    await Promise.all(MonthDates.Dates.map(async (date) => {
      const dtStart = new Date(date.toDateString() + ' ' + startTime);
      const dtEnd = new Date(date.toDateString() + ' ' + endTime);

      var timeIntervalValue = dtStart.toISOString() + '/' + dtEnd.toISOString();

      await axios.post('/sci-scores/marginal-carbon-intensity',
        {
          location: {
            locationType: 'CloudProvider',
            providerName: 'Azure',
            regionName: location
          },
          timeInterval: timeIntervalValue
        }
      ).then((response) => {
        actualMonthValues.push(response.data.marginalCarbonIntensityValue);
      })
    }));

    var monthName = MonthDates.Dates[0].toLocaleString("en-us", { month: "long" });
    console.log('Actual month', monthName);
    var actualSum = actualMonthValues.reduce(function (pv, cv) { return pv + cv; }, 0);
    actualValues.push(actualSum);
    actualDates.push(monthName);

    month = month.nextMonth();
  }

  return { actualDates, actualValues };
}