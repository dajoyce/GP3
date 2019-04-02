const router = require("express").Router();

var places = require('../../lib/places');
var tripDB = require('../../controllers/tripController');


router.get('/findnodes', (req, res) => {
  var params = {
    lat: parseFloat(req.query.lat),
    lng: parseFloat(req.query.lng)
  };

  places.getNearByCities(params, (data) => {
    res.send(data);
  })
});

router.put('/savetrip', (req, res) => {
  console.log(req.body);
  tripDB.saveTrip(req.body, (data) => {
    console.log(data);
    res.send(data);
  });
})



module.exports = router;
