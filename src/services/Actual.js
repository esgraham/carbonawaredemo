import axios from 'axios';
import * as Dates from './DateType'

export const getActualData = async (location, dateType, startTime, endTime) => {
  var actualDates = null;
  if (dateType === 'workweek') {
    actualDates = Dates.workweekDates();
  }
  const actualValues = new Array();

  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  await Promise.all(actualDates.Dates.map(async (date) => {
    const dtStart = new Date(date.toDateString() + ' ' + startTime.value);
    const dtEnd = new Date(date.toDateString() + ' ' + endTime.value);

    var timeIntervalValue = dtStart.toISOString() + '/' + dtEnd.toISOString();

   await axios.post('/sci-scores/marginal-carbon-intensity',
        { location: {
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