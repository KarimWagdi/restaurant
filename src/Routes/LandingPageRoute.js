const LandingPage = require("../Controller/LandingPageController");
const express = require("express");
const router = express.Router();

router.get("/", LandingPage.getRestaurants);


module.exports = router;