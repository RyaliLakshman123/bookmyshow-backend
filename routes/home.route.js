const express = require("express");
const router = express.Router();

const { getHome } = require("../controllers/home.controller");
const { getHomeSections } = require("../controllers/home-sections.controller");

// 🔥 TMDB CONTROLLERS
const {
  getMovieDetail,
  getMovieCredits,
  getMovieRecommendations,
  getPersonDetail,
  getPersonMovies,
  getPersonImages   // ADD THIS
} = require("../controllers/tmdb.controller");

// ─────────────────────────────────────────
// EXISTING
// ─────────────────────────────────────────

router.get("/home", getHome);
router.get("/home-sections", getHomeSections);

// ─────────────────────────────────────────
// TMDB PROXY ROUTES
// ─────────────────────────────────────────

// Movie
router.get("/movie/:id", getMovieDetail);
router.get("/movie/:id/credits", getMovieCredits);
router.get("/movie/:id/recommendations", getMovieRecommendations);

// Person
router.get("/person/:id", getPersonDetail);
router.get("/person/:id/movies", getPersonMovies);
router.get("/person/:id/images", getPersonImages); // ADD THIS

module.exports = router;
