var census = require('citysdk');
var axios = require('axios');

//debug please delete
// require('dotenv').config();

// getNearByCities('', console.log);

//end debug

module.exports = {
  getNearByCities: function (user, cb) {
    var params = {
      lat: user.lat || 35,
      lng: user.lng || -78,
      minPopulation: user.minPopulation || 50000,
      types: "CITY",
      radius: user.radius || 300,
      limit: 10
    }


    var coords = this.createCoordString(params.lat, params.lng);
    delete params.lat;
    delete params.lng;

    console.log(coords);

    axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/locations/${coords}/nearbyCities${this.buildQuery(params)}`)
      .then((res) => {
        cb(res.data.data);
      });

  },

  createCoordString: function (lat, lng) {
    var coords = "";
    if (lat >= 0) {
      coords += '+';
    }

    coords += lat.toFixed(4);

    if (lng >= 0) {
      coords += '+';
    }

    coords += lng.toFixed(4);

    return coords;


  },

  getPopulation: function (lat, lng, cb) {
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
  },

  //builds a query string for a url
  buildQuery: function (params) {
    return `?${Object.keys(params).map(par => `${par}=${params[par]}`).join('&')}`
  }
}