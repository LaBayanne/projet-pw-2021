import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import Map from './components/Map';
import Info from './components/Info';
import ExchangeService from './services/ExchangeService';

function App() {

  const [exchanges, setExchanges] = useState([]);

  const onExchangesGot = (data) => {
    /*console.log("EXCHANGES : ");
    data.forEach(element => {
      console.log(JSON.stringify(element));
    });*/
    setExchanges(data);
  }

  useEffect(() => {
      ExchangeService.getAllExchanges(onExchangesGot);
  }, [])

  return (
    
    <div
      style={{
        position: "absolute",
        zIndex: 0,
        width: "100%", // or you can use width: '100vw'
        height: "100%" // or you can use height: '100vh'
      }}
    >
    <div className="App">
        <Banner/>
        <Info/>
        <Map exchanges={exchanges}/>
    </div>

    </div>
  );
}

export default App;
