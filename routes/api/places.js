const router = require("express").Router();

var places = require('../../lib/places');
var tripDB = require('../../controllers/tripController');
var mongoose = require('mongoose')


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
});

router.get('/gettrips', (req, res) => {
  tripDB.findTripsFromUser(req.query.uid, (data) => {
    console.log(data);
    res.send(data);
  });
})

router.get("/findtrip", (req, res) => {
  tripDB.findTrip(req.query.id, (data) => {
    console.log(data);
    res.send(data);
  });
})

router.put("/deletetrip", (req, res) => {
  tripDB.deleteTrip(req.body.uid, (data) => res.send(data));
})


module.exports = router;
