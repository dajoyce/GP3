var census = require('citysdk');
var axios = require('axios');

var params = {
  radius: 100
}

nearbyCities(params, (cities => console.log(cities)));

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