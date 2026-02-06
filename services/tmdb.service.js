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
  Silent: "xx", // Special code for silent films
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

// Fetch movies by language and category
async function fetchMoviesByLanguage(language, category = "now_showing") {
  const langCode = LANGUAGE_MAP[language] || "en-US";
  const originalLang = ORIGINAL_LANGUAGE_MAP[langCode] || "en";

  try {
    let params = {
      api_key: TMDB_API_KEY,
      sort_by: "popularity.desc",
      region: "IN",
      page: 1,
    };

    // Add language filter (except for "All")
    if (language !== "All") {
      params.with_original_language = originalLang;
    }

    // Handle different categories
    if (category === "new_release") {
      // Movies released in last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      params["primary_release_date.gte"] = sixMonthsAgo.toISOString().split('T')[0];
      params["vote_count.gte"] = 10;
    } else if (category === "re_release") {
      // Classic movies (before 2020) that are popular
      params["primary_release_date.lte"] = "2020-01-01";
      params["vote_count.gte"] = 100;
    } else if (category === "action") {
      // Action genre (genre_id: 28)
      params.with_genres = 28;
      params["primary_release_date.gte"] = "2023-01-01";
    } else {
      // Default: Recent popular movies
      params["primary_release_date.gte"] = "2023-01-01";
      params["vote_count.gte"] = 10;
    }

    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: params,
    });

    let movies = response.data.results;
    
    // Fallback if no results
    if (movies.length === 0) {
      console.log(`⚠️ No movies found for ${language}/${category}, trying with relaxed filters...`);
      const fallbackParams = {
        api_key: TMDB_API_KEY,
        sort_by: "popularity.desc",
        region: "IN",
        page: 1,
      };
      
      if (language !== "All") {
        fallbackParams.with_original_language = originalLang;
      }
      
      const fallbackResponse = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
        params: fallbackParams,
      });
      movies = fallbackResponse.data.results;
    }

    console.log(`✅ Found ${movies.length} ${language} movies (${category})`);

    return movies.map(movie => {
      // Format likes from vote count
      const voteCount = movie.vote_count || 0;
      let likesText = "";
      
      if (voteCount >= 1000) {
        likesText = `${(voteCount / 1000).toFixed(1)}K+ likes`;
      } else if (voteCount > 0) {
        likesText = `${voteCount} likes`;
      } else {
        likesText = "New";
      }

      return {
        id: movie.id,
        title: movie.title,
        // Use backdrop for banners (wider image)
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
    console.error(`❌ Error fetching ${language} movies (${category}):`, error.message);
    return [];
  }
}

module.exports = { fetchMoviesByLanguage };
