import React, { useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './Map.css';
import Bar from './Bar';
import EchangeService from '../services/EchangeService';


const containerStyle = {
    width: '100%',
    height: '800px'
};

const parisLatLng = { // Louvres
    lat: 48.8610174,
    lng: 2.3358584
};
const bordeauxLatLng = { // Louvres
    lat: 44.836151,
    lng: -0.580816
};

const options = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    defaultZoom: 3,
    minZoom: 3,
    maxZoom: 7, 
};



function Map(props) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAKU87Du9iSuECGdoERw6lJbikZvmRdLmg"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(parisLatLng);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    
    const setEchanges = (data) => {
        console.log("SET ECHANGES" + data);
    }

    useEffect(() => {
        EchangeService.insertNewEchange();
        EchangeService.getAllEchanges(setEchanges);
    }, [])


    const drawArrowBetweenLocations = (latFrom, lngFrom, latTo, lngTo) => {
        const lineSymbol = {
            path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        };
        // Create the polyline and add the symbol via the 'icons' property.
        const line = new window.google.maps.Polyline({
            path: [
                {lat: latFrom, lng: lngFrom},
                {lat: latTo, lng: lngTo},
            ],
            icons: [
                {
                icon: lineSymbol,
                offset: "100%",
                },
            ],
            map: map,
        });
    }

    return isLoaded ? 
        (<div className ="map">
        <GoogleMap
            mapContainerStyle={containerStyle}
            options={options}
            center={parisLatLng}
            onLoad={onLoad}
            onUnmount={onUnmount}>
            { /* Child components, such as markers, info windows, etc. */ }
            <Bar drawLine={drawArrowBetweenLocations}/>
        </GoogleMap>
        </div>) 
        : 
        <></>
}

export default React.memo(Map)