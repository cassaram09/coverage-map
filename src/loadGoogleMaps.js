import load from "little-loader";
import qs from "query-string";
 
// YOUR_API_KEY - string
// libraries - array of strings, eg ['places']
 
const loadGoogleMaps = (API_KEY, libraries) => {
  return new Promise( (resolve, reject) => {
    var baseURL = "https://maps.googleapis.com/maps/api/js?";
 
    load(baseURL + qs.stringify({ key: API_KEY, libraries }), error => {
      if (error) {
        reject("Unable to load Google Maps");
      } else {
        console.log('Google Maps loaded.')
        resolve();
      }
    })
  })
}

export default loadGoogleMaps;
