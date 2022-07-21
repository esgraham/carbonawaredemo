import { Dates } from './Dates';


export function workweekDates() {
    var prevDate = new Dates();

    var lstDates = new Array();
    var lstFormattedValues = new Array();

    var date = prevDate.previousFriday();

    //Move date to Sunday
    date.setDate(date.getDate()-5)

    //Add the week
    for (let i = 1; i < 6; i++) {
        date.setDate(date.getDate()+1)
        lstDates.push(new Date(date));
        lstFormattedValues.push(new Date(date).toDateString())
    }

    return {'Dates': lstDates, 'FormattedDate': lstFormattedValues};

}

export function previousMonthDates()
{
    var date = new Dates();
    var month = date.previousMonth();
    return monthDates(month);
}

export function nextMonthDates(date)
{
    var month = date.nextMonth();
    return monthDates(month);
}


export function monthDates(month)
{
    var numofDays = month.monthDays();

    var lstDates = new Array();
    var lstFormattedValues = new Array();

    //add first day
    lstDates.push(new Date(month));
    lstFormattedValues.push(new Date(month).toDateString())

    //Add the rest of the month
    for (let i = 1; i < numofDays; i++) {
        month.setDate(month.getDate()+1);
        lstDates.push(new Date(month));
        lstFormattedValues.push(new Date(month).toDateString())
    }

    return {'Dates': lstDates, 'FormattedDate': lstFormattedValues};
}

export function lastYear()
{
    var date = new Dates();
    var year = date.previousYear();  

    return year;

}

export function previousMonth(monthNum)
{
    var date = new Dates();
    var year = date.previousXMonth(monthNum);  

    return year;

}


