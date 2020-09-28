const request = require('request');

const geocode = (address, callback) => {
  const MAPBOX_API_KEY = 'pk.eyJ1IjoicG91dHMiLCJhIjoiY2tmanZnaWFjMHF3MDJzbGJkOWR3cmxvayJ9.ZVe2cYtrrOxTCN-w09hQ3Q';
  const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&types=address&access_token=pk.eyJ1IjoicG91dHMiLCJhIjoiY2tmanZnaWFjMHF3MDJzbGJkOWR3cmxvayJ9.ZVe2cYtrrOxTCN-w09hQ3Q`;

  request({url: mapBoxUrl, json: true}, (error, response) => {
    if (error) {
      callback("Couldn't connect to geocode service");
    }
    else if (response.body.features.length === 0) {
      callback("Bad location")
    }
    else {
      const latLong = response.body.features[0].center;
      const placeName = response.body.features[0].place_name;

      callback(null, {latLong, placeName})
    }
  })
}

module.exports = geocode;