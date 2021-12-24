import Geocode from "react-geocode";
const { getCode, getName } = require('country-list');

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

    static async getLatLngFromCity(city_name, country_name) {
        const code = getCode(country_name);
        //console.log("country_name : " + country_name + ", code : " + code);
        Geocode.setRegion(getCode(country_name));
        // Get latitude & longitude from address.
        return await Geocode.fromAddress(city_name)
            .then(res => {
                return res.results[0].geometry.location;
            },)
            .catch(err => console.log(err))
    }
}