var census = require('citysdk');
var axios = require('axios');

//debug please delete
// require('dotenv').config();


// getBatch(300, places => {
//   console.log(places);
// });

//end debug


function getBatch(maxRad, cb, places = []) {
  var minRadius = maxRad - 25;

  nearbyCities({ radius: maxRad, minRadius }, (cities => {
    cities.map((city, index, arr) => {
      getPopulation(city.lat, city.lng, pop => {
        if (pop != null) {
          city.pop = pop
          places.push(city)
        }

        if (index === arr.length - 1) {
          if (places.length < 10) {
            console.log(">>>>>>>>>>>>>" + minRadius + places);
            getBatch(minRadius, cb, places);
          } else {
            cb(places);
          }
        }
      });
    })
  }));
}

function getPopulation(lat, lng, cb) {
  var popValue = "B01001_001E";

  var command = {
    vintage: "2017",
    geoHierarchy: {
      "place": {
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