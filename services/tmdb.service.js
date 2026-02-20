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

// Original language codes for TMDB filtering
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

// Helper: format vote count into likes text
function formatLikes(voteCount) {
  if (voteCount >= 1000) return `${(voteCount / 1000).toFixed(1)}K+ likes`;
  if (voteCount > 0) return `${voteCount} likes`;
  return "New";
}

// Helper: map a raw TMDB movie object to our DTO shape
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
    language: language,
    category: category,
    releaseDate: movie.release_date || "",
  };
}

// Fetch movies by language and category
async function fetchMoviesByLanguage(language, category = "now_showing") {
  const langCode = LANGUAGE_MAP[language] || "en-US";
  const originalLang = ORIGINAL_LANGUAGE_MAP[langCode] || "en";

  try {
    // ─── COMING SOON ─────────────────────────────────────────────────────────
    // Uses /movie/upcoming for "All", or /discover/movie with future dates
    // for a specific language.
    if (category === "coming_soon") {
      const today = new Date().toISOString().split("T")[0];

      // For "All" languages use the dedicated /movie/upcoming endpoint
      if (language === "All") {
        const pages = await Promise.all(
          [1, 2, 3].map((page) =>
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
        const unique = dedupeById(movies);
        console.log(`✅ Coming Soon (All): ${unique.length} movies`);
        return unique.map((m) => mapMovie(m, language, category));
      }

      // For a specific language, use discover with future release dates
      const params = {
        api_key: TMDB_API_KEY,
        sort_by: "primary_release_date.asc",
        region: "IN",
        "primary_release_date.gte": today,
        with_original_language: originalLang,
        page: 1,
      };

      const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
        params,
      });

      let movies = response.data.results;

      // Fallback: widen the date window a bit (next 6 months) if empty
      if (movies.length === 0) {
        console.log(
          `⚠️ No upcoming ${language} movies, relaxing to next 6 months…`
        );
        const sixMonthsAhead = new Date();
        sixMonthsAhead.setMonth(sixMonthsAhead.getMonth() + 6);
        params["primary_release_date.lte"] = sixMonthsAhead
          .toISOString()
          .split("T")[0];
        delete params["primary_release_date.gte"]; // remove strict future gate

        const fallback = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
          params,
        });
        movies = fallback.data.results;
      }

      console.log(
        `✅ Coming Soon (${language}): ${movies.length} movies`
      );
      return movies.map((m) => mapMovie(m, language, category));
    }

    // ─── ALL OTHER CATEGORIES ─────────────────────────────────────────────────
    let params = {
      api_key: TMDB_API_KEY,
      sort_by: "popularity.desc",
      region: "IN",
      page: 1,
    };

    if (language !== "All") {
      params.with_original_language = originalLang;
    }

    if (category === "new_release") {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      params["primary_release_date.gte"] = sixMonthsAgo
        .toISOString()
        .split("T")[0];
      params["vote_count.gte"] = 10;
    } else if (category === "re_release") {
      params["primary_release_date.lte"] = "2020-01-01";
      params["vote_count.gte"] = 100;
    } else if (category === "action") {
      params.with_genres = 28;
      params["primary_release_date.gte"] = "2023-01-01";
    } else {
      // now_showing / default
      params["primary_release_date.gte"] = "2023-01-01";
      params["vote_count.gte"] = 10;
    }

    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params,
    });

    let movies = response.data.results;

    // Fallback if no results
    if (movies.length === 0) {
      console.log(
        `⚠️ No movies for ${language}/${category}, trying relaxed filters…`
      );
      const fallbackParams = {
        api_key: TMDB_API_KEY,
        sort_by: "popularity.desc",
        region: "IN",
        page: 1,
      };
      if (language !== "All") {
        fallbackParams.with_original_language = originalLang;
      }
      const fallback = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
        params: fallbackParams,
      });
      movies = fallback.data.results;
    }

    console.log(`✅ Found ${movies.length} ${language} movies (${category})`);
    return movies.map((m) => mapMovie(m, language, category));
  } catch (error) {
    console.error(
      `❌ Error fetching ${language} movies (${category}):`,
      error.message
    );
    return [];
  }
}

// Remove duplicate movies by id
function dedupeById(movies) {
  const seen = new Set();
  return movies.filter((m) => {
    if (seen.has(m.id)) return false;
    seen.add(m.id);
    return true;
  });
}

module.exports = { fetchMoviesByLanguage };
