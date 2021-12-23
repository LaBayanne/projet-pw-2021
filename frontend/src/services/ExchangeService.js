const url = "http://localhost:3001/";

export default class ExchangeService {

    static getAllExchanges(callback){
        const requestOptions = {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };
        fetch(url + "exchange/all", requestOptions)
            .then(res => res.json())
            .then(res => callback(res))
            .catch(err => err)

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