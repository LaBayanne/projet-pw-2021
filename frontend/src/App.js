import React from 'react';
import './App.css';
import Banner from './components/Banner';
import Map from './components/Map';
import Info from './components/Info';
import Bar from './components/Bar';

function App() {

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
        <Map/>
    </div>

    </div>
  );
}

export default App;
