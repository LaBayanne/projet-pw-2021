export default class Date {

    constructor(date){
        this.date = date;
        const dateArray = date.split('-');
        this.day = parseInt(dateArray[0]);
        this.month = parseInt(dateArray[1]);
        this.year = parseInt(dateArray[2]);
    }

    compareTo = (otherDate) => {
        if(this.year > otherDate.year)
            return 1;
        else if(this.year < otherDate.year)
            return -1;
        if(this.month > otherDate.month)
            return 1;
        else if(this.month < otherDate.month)
            return -1;
        if(this.day > otherDate.day)
            return 1;
        else if(this.day < otherDate.day)
            return -1;

        return 0
    }

    toString = () => {
        return this.date;
    }
}