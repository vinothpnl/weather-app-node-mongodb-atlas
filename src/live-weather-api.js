const request = require('request');

let geoCodeUrl = '',
 headers = {
  'Content-Type': 'application/json'
},
 getParam = {},
 coordinates = {};


// Fetch geo location from mapbox API server

let fetchGeoLocation = (req) => {
  let location = req.body.location;
  geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoidmlub3RocG5sIiwiYSI6ImNrNzh1N21sZzBpdXkzbG55dm9ndW84ZTAifQ.Sop4kW96pEtuId_rmEqNkA&limit=1`;
  console.log(`Geolocation Url: ${geoCodeUrl}`)
  getParam = {
    header: headers,
    url: geoCodeUrl,
    json: true
  };
  return new Promise((resolve, reject) => {
    request.get(getParam, (error, response) => {
      if (error) {
        console.log(`Error: ${error}`)
        reject(error);
      } else if (response.body.features.length === 0) {
        console.log(`Unable to find the location`)
      } else {
        coordinates.latitude = response.body.features[0].center[1];
        coordinates.longitude = response.body.features[0].center[0];
        resolve(coordinates)
      }
      console.log(`The coordinates: ${coordinates}`)
    });
  });
}

// Fetch weather details from darksky API server

const fetchWeatherDetails = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    let fetchWeatherUrl = `https://api.darksky.net/forecast/225a9ac8922cbfe39420b66c87328302/${latitude},${longitude}?units=si`;
    console.log(`The weather Url: ${fetchWeatherUrl}`)
    getParam = {
      header: headers,
      url: fetchWeatherUrl,
      json: true
    };
    let weather = {};

    request.get(getParam, (error, response) => {
      if (error) {
        console.log(`Error: ${error}`);
        reject(error);
      }
      console.log(`Time Zone: ${JSON.stringify(response.body.timezone)}`)
      weather = {
        currentTemp: JSON.stringify(response.body.currently.temperature),
        precipProbability: JSON.stringify(response.body.currently.precipProbability),
        time: JSON.stringify(response.body.currently.time)
      }
      resolve(weather);
    });
  });
}

module.exports = {
  fetchGeoLocation,
  fetchWeatherDetails
};
