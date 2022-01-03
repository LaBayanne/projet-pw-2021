import React, {useState, useEffect } from 'react';
import './Info.css';


import Select from "react-select";

import Calendar from './Calendar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup  from '@mui/material/RadioGroup';
import { Radio } from '@mui/material';
import Date from '../models/Date';
import GeocodeService from '../services/GeocodeService';
import GraphList from './GraphList';



/*const selectStyles = { //Colors for multiSelect options
  option: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.color,
    }),
  multiValue: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.color,
    })
};*/

function Info(props) {

  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  
  const [duration, setDuration] = useState(); 
  const [finalDuration, setFinalDuration] = useState(); 
  const [minVisitDurationCount, setMinVisitDurationCount] = useState([]);
  const [visitDurationCount, setVisitDurationCount] = useState([]);
  const [radioValue,setRadioValue] = useState('Jours');

  const [visitCount, setVisitCount] = useState(0);

  const [selectOptions, setSelectOptions] = useState([]);

  const [countriesSelected, setCountriesSelected] = useState();

  const [median, setMedian] = useState();

  const [topKCities, setTopKCities] = useState({});
  const [topKCountries, setTopKCountries] = useState({});



  const getFlowType = () => {
    return checkedOne && checkedTwo ? "inout" : checkedOne ? "in" : checkedTwo ? "out" : "inout";
  }

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };
  
  const handleChangeRadio = (evt) => {
    setRadioValue(evt.target.value);
    const minDuration = evt.target.value === "Mois" ? 30*duration : duration;
    setFinalDuration(minDuration);
  }

  const handleChangeInputNumber = (evt) => {
    setDuration(evt.target.value);
    const minDuration = radioValue === "Mois" ? 30*evt.target.value : evt.target.value;
    setFinalDuration(minDuration);
  }

  const handleMultiChange = (option) => {
    const countries = option.map(o => o.value);
    const flowType = getFlowType();
    setCountriesSelected(countries);
    props.setCountries(countries, flowType);
  }

  useEffect(() =>{
    (async () => {
      let options = [];
      const countriesNames = await GeocodeService.getAllCountryNames();
      countriesNames.forEach(element => options.push({ value: element, label: element }));
      setSelectOptions(options);
    })();
  }, []);

  useEffect(() => {
    const flowType = getFlowType();
    props.setCountries(countriesSelected, flowType);
  }, [checkedOne, checkedTwo])

  useEffect(() => {
    (async () => {

      let size = 0;
      let minDurations = [];
      let durations = {};
      let count = 0;
      let medianCount = 0;
      let topKCitiesComputing = {};
      let topKCountriesComputing = {};

      let data = [];
      for(let i = 10; i <= 1000000; i*=10){
        data.push({name: i+'-'+i*10, count: 0});
      }

      let flowType = getFlowType();
      
      props.exchanges.forEach(element => {
          const startDate = new Date(element.starting_date);
          const endDate = new Date(element.ending_date);
          const duration = Date.timeInDayBetween(startDate, endDate);
          for(let i = 0; i <= duration && i < size; i++){
            minDurations[i]++;
            medianCount++;
          }
          for(let i = size; i <= duration; i++){
            minDurations.push(1);
            size++;
            medianCount++;
          }
          if(durations[duration] == null)
            durations[duration] = 1;
          else
            durations[duration]++;

          let city = [];
          let country = [];

          switch(flowType){
            case "in":
              city.push(element.city_destination);
              if(countriesSelected == null || countriesSelected.includes(element.country_destination))
                country.push(element.country_destination);
              break;
            case "out":
              city.push(element.city_origin);
              if(countriesSelected == null || countriesSelected.includes(element.country_origin))
                country.push(element.country_origin);
              break;
            default:
              city.push(element.city_origin);
              if(countriesSelected == null || countriesSelected.includes(element.country_origin))
                country.push(element.country_origin);
              city.push(element.city_destination);
              if(countriesSelected == null || countriesSelected.includes(element.country_destination))
                country.push(element.country_destination);
          }
          city.forEach(element => {
            if(topKCitiesComputing[element] == null)
              topKCitiesComputing[element] = 1;
            else
              topKCitiesComputing[element]++;
          });
          country.forEach(element => {
            if(topKCountriesComputing[element] == null)
              topKCountriesComputing[element] = 1;
            else
              topKCountriesComputing[element]++;
          });
          
          data[Math.round(Math.log10(duration)) - 1].count++;

          count++;
      });

      setTopKCities(topKCitiesComputing);
      setTopKCountries(topKCountriesComputing);

      setMedian("Pas de séjour");
      let currentMedianCount = 0;
      for(let i = 0; i < minDurations.length; i++){
        currentMedianCount += minDurations[i];
        if(currentMedianCount >= medianCount / 2){
          let years = Math.round(i / 365);
          let rest = i % 365;
          let months = Math.round(rest / 30);
          let days = rest % 30;
          setMedian(years + " ans " + months + " mois " + days + " jours");
          break;
        }
      }

      

      setMinVisitDurationCount(minDurations);
      setVisitDurationCount(data);
      setVisitCount(count);
    })();

}, [props.exchanges])

  return (
    <div className = "Info">
      <div id = "In">
        <div id ="titleInfo">
          <h2>Infos échanges : </h2>
        </div>
        <h6>Nombre d'échanges : </h6>
        <h4>{visitCount}</h4>
        <br/>
        <div id ="calendar">
          <p>Select date début - fin : </p>
          <Calendar setRange={props.setRange}/>
        </div>


        <div id = "flux">
          <p>Flux : </p >

          <div id="CheckboxesFlux">
            <FormGroup>
              <FormControlLabel control = {<Checkbox onChange={handleChangeOne} size ="large" color="primary"/> } label= {<span style ={{ fontSize : '1.5rem' }}> Entrant</span> }/>
              <FormControlLabel control = {<Checkbox onChange={handleChangeTwo} size ="large" color="primary"/> } label = {<span style ={{ fontSize : '1.5rem' }}> Sortant</span> } />
          </FormGroup>
          </div>
        </div>
        
        <div id="selectPays">
        <Select
            isMulti
            options={selectOptions}
            //styles={selectStyles}
            onChange={handleMultiChange}
            placeholder="Pays"
            closeMenuOnSelect={false}
        />
        </div>
        
      </div>
      {props.logged ? 
      <div id = "Out">
        <div id = "médiane">
          <p>Durée médiane des séjours sur cette période : </p>
          <h5>{median}</h5>
        </div>
       
        <div id ="période"> 
          <p>Nombre de séjours de plus de </p> 
        
          <input type="number" 
                className="duration"
                id = "durationInput"
                onChange={handleChangeInputNumber}
                min={0}
                max={10000}
          />
          <div id="RadioButtons">
          <RadioGroup row name="radioButtonsGroup" value={radioValue} onChange={handleChangeRadio}>
            <FormControlLabel value="Jours" control={<Radio/>} label = "Jours" labelPlacement ="start" />
            <FormControlLabel value ="Mois" control={<Radio/>} label = "Mois" labelPlacement ="start" /> 
          </RadioGroup>
          </div>        
      
        <h5>{finalDuration <= minVisitDurationCount.length ? minVisitDurationCount[finalDuration] : 0}</h5>

        <GraphList visitDurationCount={visitDurationCount} topKCities={topKCities} topKCountries={topKCountries}/>
      </div>
    </div>
      :
      null}
    </div>
  );
}

export default Info;
