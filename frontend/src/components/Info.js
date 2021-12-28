import React, {useState} from 'react';
import './Info.css';

import Calendar from './Calendar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup  from '@mui/material/RadioGroup';
import { Radio } from '@mui/material';
import NumericImput from 'react-numeric-input'

function Info(props) {

  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);
  
  const [duration, setDuration] = useState(""); 


  const [value,setRadioValue] = React.useState('Jours');

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };

  
  const handleChangeRadio = (evt) => {
    setRadioValue(evt.target.value);
  }

  return (
    <div className = "Info">
      <div id = "In">
        <h5>Infos échanges : {"\n"}</h5>
        <br/><br/>
        <p>Select date début - fin : </p>
        <Calendar setRange={props.setRange}/><br/><br/>
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
        <NumericImput
              className="duration"
              id = "durationInput"
              value={duration}
              onChange={(value) => setDuration(value)}
              step={1}
              min = {0}
              max ={365}
        /><br/>
        <RadioGroup row name="radioButtonsGroup" value={value} onChange={handleChangeRadio}>
          <FormControlLabel value="Jours" control={<Radio/>} label = "Jours" labelPlacement ="start" />
          <FormControlLabel value ="Mois" control={<Radio/>} label = "Mois" labelPlacement ="start" /> 
        </RadioGroup>

      </div>
    </div>
    
  );
}

export default Info;
