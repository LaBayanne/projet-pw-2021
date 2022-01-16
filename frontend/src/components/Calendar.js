import React from 'react';
import './Calendar.css';
import  {DateRangePicker}  from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function Calendar (props){

    const months = {Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', 
                    Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'}

    const onChange = (value) => {
      const date_1 = value[0].toDateString().split(' ');
      const date_2 = value[1].toDateString().split(' ');
      const startDate = date_1[2] + '-' + months[date_1[1]] + '-' + date_1[3];
      const endDate = date_2[2] + '-' + months[date_2[1]] + '-' + date_2[3];
      props.setRange(startDate, endDate);
    }

    return (
        <div className = "calendar"> 
          <DateRangePicker
            style={{ width: 500 }}
            placeholder="Select Date Range"
            format= 'dd/MM/yyyy'
            onChange={onChange}
            />
            
        </div>
      );
    }

export default Calendar;