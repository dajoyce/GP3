const router = require("express").Router();
const profilesController = require("../../controllers/profileController");

// Matches with "/api/profile"
router.post("/create", profilesController.create);

// Matches with "/api/profiles/:id"
router.get("/:id", profilesController.findById);

router.put("/:id", profilesController.update);

module.exports = router;
