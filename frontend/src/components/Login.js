import React, {useState} from 'react';
import AccountService from '../services/AccountService';
import './Login.css';
import Status from './ConnectionState';

export function Login({status,setStatus,logged,setLogged,username,setUsername}) {
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");

    function isAccountCallback(res){
      if(res){
        setLogged(true);
        setUsername(login);
        setStatus(Status.Connected);
      }
    }

    const attemptConnection = (evt) => {
      evt.preventDefault();

      const data = {"name": login, "password": mdp};

      AccountService.isAccount(isAccountCallback,JSON.stringify(data));

      setLogin("");
      setMdp("");
    }

    const redirectToSignUp = (evt) => {
      evt.preventDefault();
      
      setStatus(Status.SignUp);
    }

    return (
        <form onSubmit={attemptConnection} className="Login">
          <h2> Sign In </h2>
            <input
              type="text"
              id = "Input"
              placeholder = "Login"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
            <br/>
            <input 
              type="password" 
              id = "Input"
              placeholder="Password"
              value ={mdp}  
              onChange={e => setMdp(e.target.value)} 
            /><br/>
          <input type="submit" value="Submit" id="submit"/>
          <button id ="sign-up" onClick={redirectToSignUp}> Sign up ?</button>
        </form>
      );

}

export default Login;
