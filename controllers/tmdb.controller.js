const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// ─────────────────────────────────────────
// MOVIE DETAIL
// ─────────────────────────────────────────

exports.getMovieDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}`,
      { params: { api_key: TMDB_API_KEY } }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────
// CREDITS
// ─────────────────────────────────────────

exports.getMovieCredits = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}/credits`,
      { params: { api_key: TMDB_API_KEY } }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────
// RECOMMENDATIONS
// ─────────────────────────────────────────

exports.getMovieRecommendations = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}/recommendations`,
      { params: { api_key: TMDB_API_KEY } }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────
// PERSON DETAIL
// ─────────────────────────────────────────

exports.getPersonDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `${TMDB_BASE_URL}/person/${id}`,
      { params: { api_key: TMDB_API_KEY } }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─────────────────────────────────────────
// PERSON MOVIES
// ─────────────────────────────────────────

exports.getPersonMovies = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `${TMDB_BASE_URL}/person/${id}/movie_credits`,
      { params: { api_key: TMDB_API_KEY } }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
