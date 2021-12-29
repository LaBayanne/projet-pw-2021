import Geocode from "react-geocode";
const { getCode, getNames } = require('country-list');

Geocode.setApiKey("AIzaSyAKU87Du9iSuECGdoERw6lJbikZvmRdLmg");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
//Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
//Geocode.enableDebug();

export default class GeocodeService {

    static cityAddress = {};
    static countryAddress = {};
    static countryCode = {};
    static allCountryNames = [];

    static async getLatLngFromCity(city_name, country_name) {
        if(this.cityAddress[city_name] != null)
            return this.cityAddress[city_name];

        let code;

        if(this.countryCode[country_name] == null){
            code = getCode(country_name);
            this.countryCode[country_name] = code;
        }
        else{
            code = this.countryCode[country_name];
        }
        Geocode.setRegion(code);
        // Get latitude & longitude from address.
        const address = await Geocode.fromAddress(city_name)
            .then(res => {
                return res.results[0].geometry.location;
            },)
            .catch(err => console.log(err))
        this.cityAddress[city_name] = address;
        return address;
    }

    static async getLatLngFromCountry(country_name) {
        if(this.countryAddress[country_name] != null)
            return this.countryAddress[country_name];

        // Get latitude & longitude from address.
        const address = await Geocode.fromAddress(country_name)
            .then(res => {
                return res.results[0].geometry.location;
            },)
            .catch(err => console.log(err))
        this.countryAddress[country_name] = address;
        return address;
    }

    static async getAllCountryNames() {
        if(this.allCountryNames.length !== 0)
            return this.allCountryNames;

        const names = getNames();
        this.allCountryNames = names;
        return names;
    }
}