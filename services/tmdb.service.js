// services/tmdb.service.js

const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Language → TMDB language codes mapping
const LANGUAGE_MAP = {
  Telugu: "te-IN",
  English: "en-US",
  Hindi: "hi-IN",
  Tamil: "ta-IN",
  Malayalam: "ml-IN",
  Kannada: "kn-IN",
  Bengali: "bn-IN",
  Gujarati: "gu-IN",
  Japanese: "ja-JP",
  Korean: "ko-KR",
  Silent: "xx",
};

// Original language codes
const ORIGINAL_LANGUAGE_MAP = {
  "te-IN": "te",
  "en-US": "en",
  "hi-IN": "hi",
  "ta-IN": "ta",
  "ml-IN": "ml",
  "kn-IN": "kn",
  "bn-IN": "bn",
  "gu-IN": "gu",
  "ja-JP": "ja",
  "ko-KR": "ko",
  "xx": "xx",
};

async function fetchMoviesByLanguage(language = "All", category = "now_showing") {
  const langCode = LANGUAGE_MAP[language] || "en-US";
  const originalLang = ORIGINAL_LANGUAGE_MAP[langCode] || "en";

  try {
    let params = {
      api_key: TMDB_API_KEY,
      region: "IN",
      page: 1,
    };

    // Filter by language
    if (language !== "All") {
      params.with_original_language = originalLang;
    }

    const today = new Date().toISOString().split("T")[0];

    // =============================
    // CATEGORY LOGIC
    // =============================

    if (category === "coming_soon") {

      // FUTURE MOVIES
      params["primary_release_date.gte"] = today;
      params.sort_by = "primary_release_date.asc";

    } else if (category === "new_release") {

      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      params["primary_release_date.gte"] =
        sixMonthsAgo.toISOString().split("T")[0];

      params["vote_count.gte"] = 10;
      params.sort_by = "popularity.desc";

    } else if (category === "re_release") {

      params["primary_release_date.lte"] = "2020-01-01";
      params["vote_count.gte"] = 100;
      params.sort_by = "popularity.desc";

    } else if (category === "action") {

      params.with_genres = 28;
      params["primary_release_date.gte"] = "2023-01-01";
      params.sort_by = "popularity.desc";

    } else {
      // NOW SHOWING (default)
      params["primary_release_date.lte"] = today;
      params["vote_count.gte"] = 10;
      params.sort_by = "popularity.desc";
    }

    const response = await axios.get(
      `${TMDB_BASE_URL}/discover/movie`,
      { params }
    );

    const movies = response.data.results;

    return movies.map((movie) => {
      const voteCount = movie.vote_count || 0;

      let likesText = "New";
      if (voteCount >= 1000) {
        likesText = `${(voteCount / 1000).toFixed(1)}K+ likes`;
      } else if (voteCount > 0) {
        likesText = `${voteCount} likes`;
      }

      return {
        id: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "",
        backdropUrl: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
          : "",
        rating: movie.vote_average || 0,
        votes: `${movie.vote_count || 0}+ votes`,
        likes: likesText,
        language: language,
        category: category,
      };
    });

  } catch (error) {
    console.error("❌ TMDB Error:", error.message);
    return [];
  }
}

module.exports = { fetchMoviesByLanguage };
