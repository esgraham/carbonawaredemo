export function workweekDates() {
    var date = new Date();
    var day = date.getDay();

    var lstDates = new Array();
    var lstFormattedValues = new Array();

    //if the day is Sunday - Friday return the Monday before
    if (day!==6)
    {
        date.setDate(date.getDate()-(6+day))
    }
    //Saturday, reutrn the previous Monday
    else
    {
        date.setDate(date.getDate()-5)
    }
    
    //Add Start Date to list
    lstDates.push(new Date(date));
    lstFormattedValues.push(new Date(date).toDateString());

    //Add the rest of the week
    for (let i = 1; i < 5; i++) {
        date.setDate(date.getDate()+1)
        lstDates.push(new Date(date));
        lstFormattedValues.push(new Date(date).toDateString())
    }

    return {'Dates': lstDates, 'FormattedDate': lstFormattedValues};

}


