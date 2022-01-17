import React, { useState, useEffect } from 'react';
import './Content.css';
import Map from './Map';
import Info from './Info';
import ExchangeService from '../services/ExchangeService';
import Date from '../models/Date';

function Content(props) {
  const [exchanges, setExchanges] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [countries, setCountries] = useState([]);
  const [flowType, setFlowType] = useState();

  async function setRange(startDateSelected, endDateSelected){
    let startDateObj = null, endDateObj = null;
    if(startDateSelected != null){
      startDateObj = new Date(startDateSelected);
      setStartDate(startDateObj);
    }
    if(endDateSelected != null){
      endDateObj = new Date(endDateSelected);
      setEndDate(endDateObj);
    }
    setExchangesWithOptions(countries, flowType, startDateObj, endDateObj);
  }

  async function setCountriesFun(countriesSelected, flowTypeSelected){
    setCountries(countriesSelected);
    setFlowType(flowTypeSelected);
    setExchangesWithOptions(countriesSelected, flowTypeSelected, startDate, endDate);
  }

  async function setExchangesWithOptions(countriesSelected, flowTypeSelected, startDateSelected, endDateSelected) {
    let data = await ExchangeService.getAllExchanges();
    if(startDateSelected != null && endDateSelected != null){
    data = data.filter(element => (new Date(element.starting_date)).compareTo(startDateSelected) >= 0 &&
            (new Date(element.ending_date)).compareTo(endDateSelected) <= 0);
    }
    if(countriesSelected != null && countriesSelected.length !== 0){
      data = data.filter(element => (flowTypeSelected === "in" && countriesSelected.includes(element.country_destination)) ||
                        (flowTypeSelected === "out" && countriesSelected.includes(element.country_origin)) ||
                        (flowTypeSelected !== "in" && flowTypeSelected !== "out" && (countriesSelected.includes(element.country_destination) ||
                         countriesSelected.includes(element.country_origin))));
    }
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
      <div  id="Content"
      >
        <div>
          <div id="groupBox">
            <div id="groupBox2">
              <Info id="Info" logged={props.logged} setCountries={setCountriesFun} setRange={setRange} exchanges={exchanges}/>
              <Map id="Map" exchanges={exchanges}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Content;