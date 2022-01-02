import React, { useState} from 'react';
import './App.css';
import Banner from './components/Banner';
import Content from './components/Content';

function App() {

  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState(undefined);

  return (
    
    <div className="App">
        <Banner logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}/>
        <Content logged={logged}/>
    </div>

   
  );
}

export default App;
