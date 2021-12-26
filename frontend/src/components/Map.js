import React, { useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './Map.css';
import GeocodeService from '../services/GeocodeService';

const countryFLowMinZoom = 4;
const meanCountAtCityLevel = 10;
const meanCountAtCountryLevel = 100;
const meanStrokeWeight = 5;

const containerStyle = {
    width: '100%',
    height: '800px',
    position: "relative"
};

const parisLatLng = { // Louvres
    lat: 48.8610174,
    lng: 2.3358584
};

const options = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    defaultZoom: 3,
    minZoom: 3,
    maxZoom: 6, 
};



function Map(props) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAKU87Du9iSuECGdoERw6lJbikZvmRdLmg"
    })

    const [map, setMap] = React.useState(null)
    const [zoomLevel, setZoomLevel] = React.useState(options.defaultZoom);
    const [arrows, setArrows] = React.useState([]);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(parisLatLng);
        map.fitBounds(bounds);
        window.google.maps.event.addListener(map, 'zoom_changed', function() {
            setZoomLevel(map.getZoom());
        });
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const drawArrowBetweenLocations = (latFrom, lngFrom, latTo, lngTo, strokeWeight) => {
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
            strokeWeight: strokeWeight
        });
        setArrows(arrows => [...arrows, line]);
    }

    async function showCityFlow(){
        let fromToDict = {};
        const setAtNullCityDestination = (element) => {
            fromToDict[element.country_origin][element.city_origin][element.country_destination][element.city_destination] = 1;
        }
        const setAtNullCountryDestination = (element) => {
            fromToDict[element.country_origin][element.city_origin][element.country_destination] = {};
            setAtNullCityDestination(element);
        }
        const setAtNullCityOrigin = (element) => {
            fromToDict[element.country_origin][element.city_origin] = {};
            setAtNullCountryDestination(element);
        }
        const setAtNullCountryOrigin = (element) => {
            fromToDict[element.country_origin] = {};
            setAtNullCityOrigin(element);
        }
        props.exchanges.forEach(async element => {
            if(fromToDict[element.country_origin] == null){
                setAtNullCountryOrigin(element);
            }
            else if (fromToDict[element.country_origin][element.city_origin] == null) {
                setAtNullCityOrigin(element);
            }
            else if (fromToDict[element.country_origin][element.city_origin][element.country_destination] == null) {
                setAtNullCountryDestination(element);
            }
            else if (fromToDict[element.country_origin][element.city_origin][element.country_destination][element.city_origin] == null) {
                setAtNullCityDestination(element);
            }
            else {
                fromToDict[element.country_origin][element.city_origin][element.country_destination][element.city_origin]++;
            }
        });
        for (const [countryOrigin, countryFromValue] of Object.entries(fromToDict)) {
            for (const [cityOrigin, cityFromValue] of Object.entries(countryFromValue)) {
                for (const [countryDestination, countryDestinationValue] of Object.entries(cityFromValue)) {
                    for (const [cityDestination, count] of Object.entries(countryDestinationValue)) {
                        const from = await GeocodeService.getLatLngFromCity(cityOrigin, countryOrigin);
                        const to = await GeocodeService.getLatLngFromCity(cityDestination, countryDestination);
                        const strokeWeight = count / meanCountAtCityLevel * meanStrokeWeight;
                        //console.log(countryOrigin, cityOrigin, countryDestination, cityDestination, count, strokeWeight);
                        drawArrowBetweenLocations(from.lat, from.lng, to.lat, to.lng, strokeWeight);
                    }
                }
            }
        }
    }

    async function showCountryFlow(){
        let fromToDict = {};
        const setAtNullCountryDestination = (element) => {
            fromToDict[element.country_origin][element.country_destination] = 1;
        }
        const setAtNullCountryOrigin = (element) => {
            fromToDict[element.country_origin] = {};
            setAtNullCountryDestination(element);
        }
        props.exchanges.forEach(async element => {
            if(fromToDict[element.country_origin] == null){
                setAtNullCountryOrigin(element);
            }
            else if (fromToDict[element.country_origin][element.country_destination] == null) {
                setAtNullCountryDestination(element);
            }
            else {
                fromToDict[element.country_origin][element.country_destination]++;
            }
        });
        for (const [countryOrigin, countryFromValue] of Object.entries(fromToDict)) {
            for (const [countryDestination, count] of Object.entries(countryFromValue)) {
                const from = await GeocodeService.getLatLngFromCountry(countryOrigin);
                const to = await GeocodeService.getLatLngFromCountry(countryDestination);
                const strokeWeight = count / meanCountAtCountryLevel * meanStrokeWeight;
                //console.log(countryOrigin, cityOrigin, countryDestination, cityDestination, count, strokeWeight);
                drawArrowBetweenLocations(from.lat, from.lng, to.lat, to.lng, strokeWeight);
            }
        }
    }

    useEffect(() => {
        (async () => {
            if(map != null){
                if(zoomLevel <= countryFLowMinZoom) {
                    arrows.forEach(element => element.setMap(null));
                    setArrows([]);
                    showCountryFlow();
                }
                else {
                    showCityFlow();
                }
            }
        })();
    }, [props.exchanges, zoomLevel])

    return isLoaded ? 
        (<div className ="map">
        <GoogleMap
            mapContainerStyle={containerStyle}
            options={options}
            center={parisLatLng}
            onLoad={onLoad}
            onUnmount={onUnmount}>
            { /* Child components, such as markers, info windows, etc. */ }
        </GoogleMap>
        </div>) 
        : 
        <></>
}

export default React.memo(Map)