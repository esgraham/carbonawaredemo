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

  const actualValues = await callMarginCarbonIntensity(location, startTime, endTime, actualDates);

  return { actualDates, actualValues };
}

export const callMarginCarbonIntensity = async (location, startTime, endTime, actualDates) => {

  var actualValues = new Array();
  var actualRequest = new Array();

  await Promise.all(actualDates.Dates.map(async (date) => {
    const dtStart = new Date(date.toDateString() + ' ' + startTime);
    const dtEnd = new Date(date.toDateString() + ' ' + endTime);

    actualRequest.push(
      {
        location: location,
        startTime: dtStart.toISOString(),
        endTime: dtEnd.toISOString()
      }
    );

    await axios.post('/emissions/average-carbon-intensity/batch',  actualRequest).then((response) => {
      actualValues = response.data.map((results) => {
        return results.carbonIntensity;
      })
    })
  }));

  return actualValues;
}

export const callSingleMarginCarbonIntensity = async (location, startTime, windowSize) => {

    const dtStart = new Date(startTime);
    const dtEnd = new Date(startTime);
    dtEnd.setMinutes(dtStart.getMinutes() + windowSize);

    var res = await axios.get('/emissions/average-carbon-intensity',
    { params: 
      {
        location: location,
        startTime: dtStart.toISOString(),
        endTime: dtEnd.toISOString()
      }
    }
    ).then((response) => {
      return response.data.carbonIntensity;
    });

    return res;
}

export const getActualDatabyMonth = async (location, startTime, endTime, monthNum) => {

  var actualDates = new Array();
  const actualValues = new Array();


  var month = DateType.previousMonth(monthNum);

  for (let i = 0; i < monthNum; i++) {

    var MonthDates = DateType.monthDates(month)
    const actualMonthValues = await callMarginCarbonIntensity(location, startTime, endTime, MonthDates);


    var monthName = MonthDates.Dates[0].toLocaleString("en-us", { month: "long" });
    var actualSum = actualMonthValues.reduce(function (pv, cv) { return pv + cv; }, 0);
    actualValues.push(actualSum);
    actualDates.push(monthName);

    month = month.nextMonth();
  }

  return { actualDates, actualValues };
}