import React from 'react';
import './Calendar.css';
import  {DateRangePicker}  from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function Calendar (){
    return (
        <div className = "calendar"> 
          <DateRangePicker
            style={{ width: 300 }}
            placeholder="Select Date Range"
          />
        </div>
      );
    }

export default Calendar;