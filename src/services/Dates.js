export const workweekDates = function() {
    var date = new Date();
    var day = date.getDay();

    var arrDates = new Array();

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
    arrDates.push(new Date(date))

    //Add the rest of the week
    for (let i = 1; i < 5; i++) {
        date.setDate(date.getDate()+1)
        arrDates.push(new Date(date))
    }

    console.log('Dates ' + arrDates)

    return arrDates;

}

