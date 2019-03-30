const router = require("express").Router();

var places = require('../../lib/places');


router.get('/findNodes', (req, res) => {
  var params = {
    lat: parseFloat(req.query.lat),
    lng: parseFloat(req.query.lng)
  };

  places.getNearByCities(params, (data) => {
    res.send(data);
  })
});

module.exports = router;
