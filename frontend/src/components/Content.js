import React, { useState, useEffect } from 'react';
import './Content.css';
import Map from './Map';
import Info from './Info';
import ExchangeService from '../services/ExchangeService';
import Date from '../models/Date';



function Content(props) {
  const [exchanges, setExchanges] = useState([]);

  const setRange = (startDate, endDate) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    getExchangesBetweenDates(startDateObj, endDateObj);
  }

  async function getExchangesBetweenDates(startDateObj, endDateObj) {
      const data = await ExchangeService.getExchangesBetweenDates(startDateObj, endDateObj);
      setExchanges(data);
  }

  async function getAllExchanges() {
    const data = await ExchangeService.getAllExchanges();
    setExchanges(data);
}

  useEffect(() => {
    (async () => {
      getAllExchanges();
    })();
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
              <Info id="Info" setRange={setRange} exchanges={exchanges}/>
              <Map id="Map" exchanges={exchanges}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Content;