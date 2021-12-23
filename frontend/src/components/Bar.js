import React, { useEffect, useState } from 'react'

import GeocodeService from '../services/GeocodeService';

export default function Bar(props) {

    const [latFrom, setLatFrom] = useState(10);
    const [lngFrom, setLngFrom] = useState();
    const [latTo, setLatTo] = useState();
    const [lngTo, setLngTo] = useState();

    useEffect(() => {
        GeocodeService.getLatLngFromCity((lat, lng) => {setLatFrom(lat); setLngFrom(lng)}, props.from);
        GeocodeService.getLatLngFromCity((lat, lng) => {setLatTo(lat); setLngTo(lng)}, props.to);
    }, [])

    const printPolyline = (evt) => {
        console.log("( " + latFrom + ", " + lngFrom + " ) -> ( " + latTo + ", " + lngTo + " )");
        props.drawLine(latFrom, lngFrom, latTo, lngTo);
    }



    return <button onClick={printPolyline} >{props.from} to {props.to}</button>

}