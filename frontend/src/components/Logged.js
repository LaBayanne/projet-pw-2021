import React from 'react';
import './Logged.css';
import Status from './ConnectionState';

function Logged({status,setStatus,logged,setLogged,username,setUsername}) {

  const disconnect = (evt) => {
    evt.preventDefault();

    setLogged(false);
    setStatus(Status.SignIn);
  }

  return (
    <div className = "Logged">
      <p id="loggedText"> Connecté en tant que: {username} </p>
      <button id="button" onClick={disconnect}> Déconnection </button>
    </div>
    
  );
}

export default Logged;
