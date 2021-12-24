
const url = "http://localhost:3001/";

export default class AccountService {

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

    static getAccounts(callback){
        const requestOptions = {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };

        fetch(url + "account/isAccount", requestOptions)
            .then(res => res.json())
            .then(res => callback(res))
            .catch(err => err)
    }
}