var census = require('citysdk');
var axios = require('axios');

//debug please delete
require('dotenv').config();
var params = {
  radius: 200,
  // minRadius: 50
}
nearbyCities(params, (cities => {
  cities.map(city => {
    getPopulation(city.lat, city.lng, pop => {
      console.log(`${city.name}::${pop}`);
    });
  })
}));

//end debug

function getPopulation(lat, lng, cb) {
  var popValue = "B01001_001E";

  var command = {
    vintage: "2017",
    geoHierarchy: {
      "us": {
        lat, lng
      },
    },
    sourcePath: ["acs", "acs1"],
    values: [popValue],
    statsKey: process.env.REACT_APP_CENSUS_KEY
  };

  census(command, (err, res) => {
    if (res && res.length >= 1) {
      cb(res[0][popValue]);
    } else {
      cb(null);
    }
  });
}

function nearbyCities(params, cb) {
  axios.get(`http://getnearbycities.geobytes.com/GetNearbyCities${buildQuery(params)}`).then(data => {
    var cities = data.data;

    var formatted = [];

    cities.map(city => {
      formatted.push({
        name: city[1],
        state: city[12],
        lat: city[8],
        lng: city[10]
      });
    })

    cb(formatted);
  })
}

//builds a query string for a url
function buildQuery(params) {
  return `?${Object.keys(params).map(par => `${par}=${params[par]}`).join('&')}`
}