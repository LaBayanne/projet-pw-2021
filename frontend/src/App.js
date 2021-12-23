import React from 'react';
import './App.css';
import Banner from './components/Banner';
import Map from './components/Map';
import Info from './components/Info';
function App() {

  return (
    
    <div className="App">
        <Banner/>
        <Info/>
        <Map/>
    </div>
  );
}

export default App;
