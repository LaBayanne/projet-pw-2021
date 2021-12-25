import React, { useState} from 'react';
import './Banner.css';
import Login from './Login';
import Title from './Title';
import Logged from './Logged';
import Status from './ConnectionState';
import SignUp from './SignUp';

function Banner({logged,setLogged}) {

  const [status, setStatus] = useState(Status.SignIn);

  let componentSwitch;
  if(status === Status.Connected)
    componentSwitch = <Logged status={status} setStatus={setStatus} logged={logged} setLogged={setLogged}/>;
  if(status === Status.SignIn)
    componentSwitch = <Login status={status} setStatus={setStatus} logged={logged} setLogged={setLogged}/>;
  if(status === Status.SignUp)
    componentSwitch = <SignUp status={status} setStatus={setStatus} logged={logged} setLogged={setLogged}/>;

  return (
    <div className="Banner">
        <Title/>
        {componentSwitch}
    </div>
  );
}

export default Banner;
