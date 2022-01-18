import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts';

function GraphList (props){

    const [k, setK] = useState(5);
    const [topKCities, setTopKCities] = useState();
    const [topKCountries, setTopKCountries] = useState();

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

    useEffect(() => {
        let topKCitiesComputing = topKToDescendingOrder(props.topKCities);
        let topKCountriesComputing = topKToDescendingOrder(props.topKCountries);

        let topK = [];
        topKCitiesComputing.forEach(element => topK.push({name: element[0], count: element[1]}))
        setTopKCities(topK.slice(0, k));
        topK = [];
        topKCountriesComputing.forEach(element => topK.push({name: element[0], count: element[1]}))
        setTopKCountries(topK.slice(0, k));

    }, [props.topKCities, props.topKCountries]);

    return (
        <div className = "graphList"> 
          <LineChart width={600} height={300} data={props.visitDurationCount} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
    );
}

export default GraphList;