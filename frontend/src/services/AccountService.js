
const url = "http://localhost:3001/";

export default class AccountService {
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

    static createAccount(callback, name, password){
        const requestOptions = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };
        fetch(url + "account/createAccount/" + name + "/" + password, requestOptions)
            .then(callback())
            .catch(err => err)
    }
}