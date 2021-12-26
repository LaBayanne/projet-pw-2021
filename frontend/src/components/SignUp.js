import React, {useState} from 'react';
import AccountService from '../services/AccountService';
import './SignUp.css';
import Status from './ConnectionState';

export function SignUp({status,setStatus,logged,setLogged}) {

    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");

    function clear(){
        setStatus(Status.SignIn);

        setLogin("");
        setMdp("");
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        AccountService.createAccount(clear,login,mdp);
    }

    const redirectToSignIn = (evt) => {
        evt.preventDefault();

        clear();
    }

    return (
        <form onSubmit={handleSubmit} className="SignUp">
          <h2> Sign Up </h2>
          <label id="loginLabel">
            <input
              type="text"
              id = "Input"
              placeholder= "Login"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </label>
          <label id="passwordLabel"> 
              <input 
                type="password" 
                id = "Input"
                value ={mdp}  
                placeholder= "Password"
                onChange={e => setMdp(e.target.value)} />
          </label>
          <input type="submit" value="Submit" id="submit" />
          <button id = "sign-in" onClick={redirectToSignIn}> Already signed up ? </button>
        </form>
      );

}

export default SignUp;
