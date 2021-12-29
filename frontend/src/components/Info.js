import React, {useState, useEffect } from 'react';
import './Info.css';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts';
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

      let data = [];
      for(let i = 10; i <= 1000000; i*=10){
        data.push({name: i+'-'+i*10, count: 0});
      }

      props.exchanges.forEach(element => {
          const startDate = new Date(element.starting_date);
          const endDate = new Date(element.ending_date);
          const duration = Date.timeInDayBetween(startDate, endDate);
          for(let i = 0; i <= duration && i < size; i++){
            minDurations[i]++;
          }
          for(let i = size; i <= duration; i++){
            minDurations.push(1);
            size++;
          }
          if(durations[duration] == null)
            durations[duration] = 1;
          else
            durations[duration]++;
          
          data[Math.round(Math.log10(duration)) - 1].count++;

          count++;
      });

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
      <div id = "Out">
        <p>Durée médiane des séjours sur cette période : </p>
        {/*fonction qui retourne médiane sur la période choisie par le calendrier et qui affiche le nombre */}
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
      </div>
    </div>
    
  );
}

export default Info;
