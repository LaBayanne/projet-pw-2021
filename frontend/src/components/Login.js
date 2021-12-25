import React, {useState} from 'react';
import AccountService from '../services/AccountService';
import './Login.css';

export function Login(props, {logged,setLogged}) {
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");

    function isAccountRegistered(res){
      let found = false;
      for (let key in res) {
        if (res.hasOwnProperty(key) && res[key]["name"] === login && res[key]["password"] === mdp) {
            console.log("Looking for account");
            found = true;
            break;
        }
      }

      if(found === true){
        console.log("Account found");
        setLogged(true);
        if(logged === true)
          console.log("true");
        else
          console.log("false");
      }
    }

    const handleSubmit = (evt) => {
      evt.preventDefault();

      AccountService.getAccounts(isAccountRegistered);

      setLogin("");
      setMdp("");
    }

    return (
        <form onSubmit={handleSubmit} className="Login">
          <label id="loginLabel">
            Login:
            <input
              type="text"
              id = "loginInput"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </label>
          <label id="passwordLabel"> 
              Mdp :
              <input 
                type="password" 
                id = "passwordInput"
                value ={mdp}  
                onChange={e => setMdp(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );

}

export default Login;
