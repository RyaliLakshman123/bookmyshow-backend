const express = require("express");
const router = express.Router();

const { getHome } = require("../controllers/home.controller");
const { getHomeSections } = require("../controllers/home-sections.controller");

// 🔥 NEW CONTROLLERS
const {
  getMovieDetail,
  getMovieCredits,
  getMovieRecommendations,
  getPersonDetail,
  getPersonMovies
} = require("../controllers/tmdb.controller");

// ─────────────────────────────────────────
// EXISTING
// ─────────────────────────────────────────

// Movies screen endpoint
router.get("/home", getHome);

// Home screen sections endpoint
router.get("/home-sections", getHomeSections);

// ─────────────────────────────────────────
// NEW TMDB PROXY ROUTES (Secure API)
// ─────────────────────────────────────────

// Movie
router.get("/movie/:id", getMovieDetail);
router.get("/movie/:id/credits", getMovieCredits);
router.get("/movie/:id/recommendations", getMovieRecommendations);

// Person
router.get("/person/:id", getPersonDetail);
router.get("/person/:id/movies", getPersonMovies);

module.exports = router;
