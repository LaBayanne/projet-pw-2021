import React, {useState} from 'react';
import AccountService from '../services/AccountService';
import './Login.css';
import Status from './ConnectionState';

export function Login({status,setStatus,logged,setLogged,username,setUsername}) {
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");

    function isAccountRegistered(res){
      let found = false;
      for (let key in res) {
        if (res.hasOwnProperty(key) && res[key]["name"] === login && res[key]["password"] === mdp) {
            found = true;
            break;
        }
      }

      if(found === true){
        setLogged(true);
        setUsername(login);
        setStatus(Status.Connected);
      }
    }

    const handleSubmit = (evt) => {
      evt.preventDefault();

      AccountService.getAccounts(isAccountRegistered);

      setLogin("");
      setMdp("");
    }

    const redirectToSignUp = (evt) => {
      evt.preventDefault();
      
      setStatus(Status.SignUp);
    }

    return (
        <form onSubmit={handleSubmit} className="Login">
          <h1> Sign In </h1>
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
          <button onClick={redirectToSignUp}> Sign up ?</button>
        </form>
      );

}

export default Login;
