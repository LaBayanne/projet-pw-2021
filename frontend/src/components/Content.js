import React, { useState, useEffect } from 'react';
import './Content.css';
import Map from './Map';
import Info from './Info';
import ExchangeService from '../services/ExchangeService';
import Date from '../models/Date';



function Content(props) {

  const [exchanges, setExchanges] = useState([]);
  const [currentExchanges, setCurrentExchanges] = useState([]);

  const onExchangesGot = (data) => {
    setExchanges(data);
    setCurrentExchanges(data);
  }

  const setRange = (startDate, endDate) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    setCurrentExchanges(exchanges.filter(element => (new Date(element.starting_date)).compareTo(startDateObj) >= 0 &&
                            (new Date(element.ending_date)).compareTo(endDateObj) <= 0));
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
        id="Content"
      >
        <div>
          <div id="groupBox">
            <div id="groupBox2">
              <Info id="Info" setRange={setRange}/>
              <Map id="Map" exchanges={currentExchanges}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Content;