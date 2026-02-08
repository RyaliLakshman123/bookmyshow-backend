// routes/home.route.js

const express = require("express");
const router = express.Router();
const { getHome } = require("../controllers/home.controller");
const { getHomeSections } = require("../controllers/home-sections.controller");

// Movies screen endpoint (existing - used by MoviesViewModel)
router.get("/home", getHome);

// Home screen sections endpoint (NEW - used by HomeViewModel)
router.get("/home-sections", getHomeSections);

module.exports = router;
