export class Dates extends Date {

    monthDays = function () {
        var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
        return d.getDate();
    }

    previousMonday = function () {
        var newDay = new Date();
        newDay.setDate(this.getDate() - (this.getDay() + 6) % 7);

        //if current day is Monday
        if (newDay.getDate()===this.getDate())
        {
            newDay.setDate(this.getDate()-7);
        }
        return newDay;
    }

    previousFriday = function () {
        var newDay = new Date();
        newDay.setDate(this.getDate() - (this.getDay() + 2) % 7);

        //if current day is Friday
        if (newDay.getDate()===this.getDate())
        {
            newDay.setDate(this.getDate()-7);
        }

        return newDay;
    }

    previousMonth = function () {
        var prevMonth = new Date();
        return prevMonth.setMonth(prevMonth.getMonth() - 1);
    }

    addHours = function (hours) {
        var date = new Date(this);
        date.setHours(this.getHours()+hours);
        return date;
    }

}