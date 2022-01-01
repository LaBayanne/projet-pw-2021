import React, {useState, useEffect } from 'react';
import './Info.css';

import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts';
import Select from "react-select";

import Calendar from './Calendar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup  from '@mui/material/RadioGroup';
import { Radio } from '@mui/material';
import Date from '../models/Date';
import GeocodeService from '../services/GeocodeService';
//import NumericImput from 'react-numeric-input'



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

  const [k, setK] = useState(5);

  const [topKCities, setTopKCities] = useState();
  const [topKCountries, setTopKCountries] = useState();

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

  const topKToDescendingOrder = (array) => {
    array = Object.entries(array);
    for(let i = 1; i < array.length; i++){
      for(let j = i; j > 0; j--){
        if(array[j - 1][1] >= array[j][1])
          break;
        let temp = array[j - 1][1];
        array[j - 1][1] = array[j][1];
        array[j][1] = temp;
      }
    }

    return array;
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

      topKCitiesComputing = topKToDescendingOrder(topKCitiesComputing);
      topKCountriesComputing = topKToDescendingOrder(topKCountriesComputing);

      let topK = [];
      topKCitiesComputing.forEach(element => topK.push({name: element[0], count: element[1]}))
      setTopKCities(topK.slice(0, k));
      topK = [];
      topKCountriesComputing.forEach(element => topK.push({name: element[0], count: element[1]}))
      setTopKCountries(topK.slice(0, k));

      setMinVisitDurationCount(minDurations);
      setVisitDurationCount(data);
      setVisitCount(count);
    })();

}, [props.exchanges])

  return (
    <div className = "Info">
      <div id = "In">
        <h5>Infos échanges : {"\n"}</h5>
        <br/><br/>
        <h6>Nombre d'échanges : </h6>
        <h4>{visitCount}</h4>
        <br/>
        <p>Select date début - fin : </p>
        <Calendar setRange={props.setRange}/><br/>
        <p>Flux : </p>
        <div id="CheckboxesFlux">
          <FormGroup>
            <FormControlLabel control = {<Checkbox onChange={handleChangeOne} /> } label = "Entrant" />
            <FormControlLabel control = {<Checkbox onChange={handleChangeTwo} /> } label = "Sortant" />
          </FormGroup><br/>
        </div>
        
        <Select
            isMulti
            options={selectOptions}
            //styles={selectStyles}
            onChange={handleMultiChange}
            placeholder="Pays"
            closeMenuOnSelect={false}
        /><br/><br/>
      </div>
      {props.logged ? 
      <div id = "Out">
        <h6>Durée médiane des séjours sur cette période : </h6>
        <h5>{median}</h5>
        <br/><br/>
        <p>Nombre de séjours de plus de </p> 
        
        <input type="number" 
                className="duration"
                id = "durationInput"
                onChange={handleChangeInputNumber}
                min={0}
                max={10000}/>
        <RadioGroup row name="radioButtonsGroup" value={radioValue} onChange={handleChangeRadio}>
          <FormControlLabel value="Jours" control={<Radio/>} label = "Jours" labelPlacement ="start" />
          <FormControlLabel value ="Mois" control={<Radio/>} label = "Mois" labelPlacement ="start" /> 
        </RadioGroup>
        <h5>{finalDuration <= minVisitDurationCount.length ? minVisitDurationCount[finalDuration] : 0}</h5>

        <LineChart width={600} height={300} data={visitDurationCount} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="count" stroke="blue" strokeWidth={3} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" stroke="#222222" >
            <Label value="Durée en jours" position="insideBottom" />
          </XAxis>
          <YAxis stroke="#222222">
            <Label value="Nombre d'échanges" angle={270} position='insideLeft' style={{ textAnchor: 'middle' }}/>
          </YAxis>
        </LineChart>

        <BarChart width={600} height={300} data={topKCities} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Bar dataKey="count" fill="blue" barSize={30} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" stroke="#222222" >
            <Label value="Villes" position="insideBottom" />
          </XAxis>
          <YAxis stroke="#222222">
            <Label value="Nombre d'échanges" angle={270} position='insideLeft' style={{ textAnchor: 'middle' }}/>
          </YAxis>
        </BarChart>

        <BarChart width={600} height={300} data={topKCountries} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Bar dataKey="count" fill="blue" barSize={30} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" stroke="#222222" >
            <Label value="Pays" position="insideBottom" />
          </XAxis>
          <YAxis stroke="#222222">
            <Label value="Nombre d'échanges" angle={270} position='insideLeft' style={{ textAnchor: 'middle' }}/>
          </YAxis>
        </BarChart>
      </div>
      :
      null}
    </div>
    
  );
}

export default Info;
