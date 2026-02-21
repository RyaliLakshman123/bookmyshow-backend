// services/tmdb.service.js

const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// ─────────────────────────────────────────────────────────────
// LANGUAGE MAPS
// ─────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function formatLikes(voteCount) {
  if (voteCount >= 1000) return `${(voteCount / 1000).toFixed(1)}K+ likes`;
  if (voteCount > 0) return `${voteCount} likes`;
  return "New";
}

function mapMovie(movie, language, category) {
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
    likes: formatLikes(movie.vote_count || 0),
    language,
    category,
    releaseDate: movie.release_date || "",
  };
}

function dedupeById(movies) {
  const seen = new Set();
  return movies.filter((m) => {
    if (seen.has(m.id)) return false;
    seen.add(m.id);
    return true;
  });
}

// ─────────────────────────────────────────────────────────────
// MAIN FUNCTION
// ─────────────────────────────────────────────────────────────

async function fetchMoviesByLanguage(language = "All", category = "now_showing") {
  const langCode = LANGUAGE_MAP[language] || "en-US";
  const originalLang = ORIGINAL_LANGUAGE_MAP[langCode] || "en";

  try {
    const today = new Date().toISOString().split("T")[0];

    // ============================================================
    // COMING SOON
    // ============================================================
    if (category === "coming_soon") {
      console.log(`🔵 Fetching Coming Soon movies for ${language}`);

      // For All → use TMDB official upcoming endpoint
      if (language === "All") {
        const pages = await Promise.all(
          [1, 2].map((page) =>
            axios.get(`${TMDB_BASE_URL}/movie/upcoming`, {
              params: {
                api_key: TMDB_API_KEY,
                language: "en-US",
                region: "IN",
                page,
              },
            })
          )
        );

        const movies = pages.flatMap((r) => r.data.results);
        const uniqueMovies = dedupeById(movies);

        console.log(`✅ Coming Soon (All): ${uniqueMovies.length} movies`);

        return uniqueMovies.map((m) =>
          mapMovie(m, language, category)
        );
      }

      // For specific language
      const params = {
        api_key: TMDB_API_KEY,
        region: "IN",
        sort_by: "primary_release_date.asc",
        "primary_release_date.gte": today,
        with_original_language: originalLang,
        page: 1,
      };

      const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie`,
        { params }
      );

      let movies = response.data.results;

      console.log(
        `✅ Coming Soon (${language}): ${movies.length} movies`
      );

      return movies.map((m) =>
        mapMovie(m, language, category)
      );
    }

    // ============================================================
    // NOW SHOWING (DEFAULT)
    // ============================================================

    let params = {
      api_key: TMDB_API_KEY,
      region: "IN",
      sort_by: "popularity.desc",
      page: 1,
    };

    if (language !== "All") {
      params.with_original_language = originalLang;
    }

    if (category === "new_release") {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      params["primary_release_date.gte"] =
        sixMonthsAgo.toISOString().split("T")[0];
      params["vote_count.gte"] = 10;

    } else if (category === "re_release") {
      params["primary_release_date.lte"] = "2020-01-01";
      params["vote_count.gte"] = 100;

    } else if (category === "action") {
      params.with_genres = 28;
      params["primary_release_date.gte"] = "2023-01-01";

    } else {
      // now_showing
      params["primary_release_date.lte"] = today;
      params["vote_count.gte"] = 10;
    }

    const response = await axios.get(
      `${TMDB_BASE_URL}/discover/movie`,
      { params }
    );

    let movies = response.data.results;

    console.log(
      `✅ Found ${movies.length} ${language} movies (${category})`
    );

    return movies.map((m) =>
      mapMovie(m, language, category)
    );

  } catch (error) {
    console.error(
      `❌ Error fetching ${language} movies (${category}):`,
      error.message
    );
    return [];
  }
}

module.exports = { fetchMoviesByLanguage };
