import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import Content from './components/Content';

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
        <Content/>
    </div>

    </div>
  );
}

export default App;
