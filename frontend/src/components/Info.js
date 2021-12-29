import React, {useState, useEffect } from 'react';
import './Info.css';

import Calendar from './Calendar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup  from '@mui/material/RadioGroup';
import { Radio } from '@mui/material';
import Date from '../models/Date';
//import NumericImput from 'react-numeric-input'

function Info(props) {

  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  
  const [duration, setDuration] = useState(); 
  const [finalDuration, setFinalDuration] = useState(); 
  const [visitsDurationCount, setVisitsDurationCount] = useState([]);

  const [radioValue,setRadioValue] = useState('Jours');

  const [visitCount, setVisitCount] = useState(0);

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

  useEffect(() => {
    (async () => {
      let size = 0;
      let durations = [];
      let count = 0;
      props.exchanges.forEach(element => {
          const startDate = new Date(element.starting_date);
          const endDate = new Date(element.ending_date);
          const duration = Date.timeInDayBetween(startDate, endDate);
          for(let i = 0; i <= duration && i < size; i++){
            durations[i]++;
          }
          for(let i = size; i <= duration; i++){
            durations.push(1);
            size++;
          }
          count++;
      });
      setVisitsDurationCount(durations);
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
          </FormGroup><br/><br/><br/>
        </div>
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
        <h5>{finalDuration <= visitsDurationCount.length ? visitsDurationCount[finalDuration] : 0}</h5>
      </div>
    </div>
    
  );
}

export default Info;
