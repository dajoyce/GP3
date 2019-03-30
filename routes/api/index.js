const router = require("express").Router();
const userRoutes = require("./user");
const placesRoutes = require('./places');

// User routes
router.use("/user", userRoutes);
router.use('/places', placesRoutes);

module.exports = router;
