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
          <h1> Sign Up </h1>
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
          <button onClick={redirectToSignIn}> Already signed up ? </button>
        </form>
      );

}

export default SignUp;
