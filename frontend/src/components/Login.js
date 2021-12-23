import React, {useState} from 'react';


export function Login(props) {
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLogin("");
        setMdp("");
    }
    
    return (
        <form onSubmit={handleSubmit}>
          <label>
            Login:
            <input
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </label><br></br><br></br>
          <label > 
              Mdp :
              <input 
                type="password" 
                value ={mdp}  
                onChange={e => setMdp(e.target.value)} />
          </label>
            <br></br>
          <input type="submit" value="Submit" />
        </form>
      );

}

export default Login;
