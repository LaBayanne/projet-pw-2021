export default class Date {

    static timeInDayBetween = (date_1, date_2) => {
        const startDate = date_1.compareTo(date_2) === -1 ? date_1 : date_2;
        const endDate = date_1.compareTo(date_2) === -1 ? date_2 : date_1;
        let res = (endDate.year - startDate.year) * 365;   
        res += (endDate.month - startDate.month) * 30; 
        res += (endDate.day - startDate.day);
        return res;
    }

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