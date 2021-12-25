import React from 'react';
import './Logged.css';
import Status from './ConnectionState';

function Logged({status,setStatus,logged,setLogged}) {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log("Event triggered");

    setLogged(false);
    setStatus(Status.SignIn);
  }

  return (
    <div className = "Logged">
      <p id="loggedText"> Connected as: Benjamin </p>
      <button onClick={handleSubmit}> Disconnect </button>
    </div>
    
  );
}

export default Logged;
