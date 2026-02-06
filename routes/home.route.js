// routes/home.route.js

const express = require("express");
const router = express.Router();
const { getHome } = require("../controllers/home.controller");

router.get("/home", getHome);

module.exports = router;
