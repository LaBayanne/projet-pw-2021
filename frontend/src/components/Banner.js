import React from 'react';
import './Banner.css';
import Login from './Login';
import Title from './Title';
import Logged from './Logged';

function Banner({logged,setLogged}) {

  return (
    <div className="Banner">
        <Title/>
        {logged === false ? <Login logged={logged} setLogged={setLogged}/> : <Logged/>}
    </div>
  );
}

export default Banner;
