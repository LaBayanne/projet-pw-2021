import React, { useState} from 'react';
import './Banner.css';
import Login from './Login';
import Title from './Title';
import Logged from './Logged';
import Status from './ConnectionState';

function Banner({logged,setLogged}) {

  const [status, setStatus] = useState(Status.SignIn);

  let componentSwitch;
  if(status === Status.Connected)
    componentSwitch = <Logged status={status} setStatus={setStatus} logged={logged} setLogged={setLogged}/>;
  if(status === Status.SignIn)
    componentSwitch = <Login status={status} setStatus={setStatus} logged={logged} setLogged={setLogged}/>;
  if(status === Status.SignUp)
    console.log("todo");

  return (
    <div className="Banner">
        <Title/>
        {componentSwitch}
    </div>
  );
}

export default Banner;
