import Date from '../models/Date';

const url = "http://localhost:3001/";

export default class ExchangeService {

    static async getAllExchanges(){
        const requestOptions = {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };
        return await fetch(url + "exchange/all", requestOptions)
            .then(res => res.json())
            .catch(err => err)

    }

    static async getExchangesBetweenDates(startDateObj, endDateObj){
        const requestOptions = {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };
        let data = await fetch(url + "exchange/all", requestOptions)
            .then(res => res.json())
            .catch(err => err)

        return data.filter(element => (new Date(element.starting_date)).compareTo(startDateObj) >= 0 &&
            (new Date(element.ending_date)).compareTo(endDateObj) <= 0);

    }

    static async getExchangesWithCountriesAndType(countries, flowType){
        const requestOptions = {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };
        let data = await fetch(url + "exchange/all", requestOptions)
            .then(res => res.json())
            .catch(err => err)

        if(countries == null || countries.length === 0 || flowType == null)
            return data;

        return data.filter(element => (flowType === "in" && countries.includes(element.country_destination)) ||
                                        (flowType === "out" && countries.includes(element.country_origin)) ||
                                        (flowType === "inout" && (countries.includes(element.country_destination) ||
                                            countries.includes(element.country_origin))));
    }

    static insertNewExchange(){

        const requestOptions = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };
        fetch(url + "exchange/new/zec5ze1cze5/Jean/10-01-2021/21-06-2021/TEAMROCKET/Angleterre/Londres/France/Paris", requestOptions)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => err)

    }
}