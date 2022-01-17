const url = "http://localhost:3001/";

export default class AccountService {
    static isAccount(callback, bodyData){
        const requestOptions = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: bodyData
        };

        fetch(url + "account/isAccount/", requestOptions)
            .then(res => callback(res))
            .catch(err => err)
    }

    static createAccount(callback,bodyData){
        const requestOptions = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: bodyData
        };
        fetch(url + "account/createAccount", requestOptions)
            .then(callback())
            .catch(err => err)
    }
}