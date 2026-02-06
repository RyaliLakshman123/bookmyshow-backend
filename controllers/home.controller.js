// controllers/home.controller.js

const { fetchMoviesByLanguage } = require("../services/tmdb.service");

// Simple in-memory cache
const cache = {
  data: null,
  timestamp: null,
  TTL: 5 * 60 * 1000 // 5 minutes
};

async function getHome(req, res) {
  try {
    const selectedLanguage = req.query.language || "All";
    const selectedCategory = req.query.category || "now_showing";

    let movies = [];

    // OPTIMIZATION: Use cache for "All" requests
    if (selectedLanguage === "All") {
      const now = Date.now();
      
      // Check if cache is valid
      if (cache.data && cache.timestamp && (now - cache.timestamp) < cache.TTL) {
        console.log("✅ Using cached data for 'All' languages");
        movies = cache.data;
      } else {
        console.log("🔄 Fetching fresh data for 'All' languages...");
        
        // Fetch from only 4 main languages for speed
        const languages = ["Telugu", "English", "Hindi", "Tamil"];
        
        const results = await Promise.all(
          languages.map(lang => fetchMoviesByLanguage(lang, selectedCategory))
        );
        
        movies = results.flat();
        
        // Update cache
        cache.data = movies;
        cache.timestamp = now;
        console.log(`✅ Cached ${movies.length} movies`);
      }
    } else {
      // Fetch single language (fast)
      movies = await fetchMoviesByLanguage(selectedLanguage, selectedCategory);
    }

    // Create banners from top 5 movies
    const banners = movies.slice(0, 5).map(movie => ({
      id: movie.id.toString(),
      imageUrl: movie.backdropUrl || movie.posterUrl,
    }));

    // Send response
    res.json({
      city: "Bengaluru",
      totalMovies: movies.length,
      banners: banners,
      filters: [
        "All",
        "New Release",
        "Re-release",
        "Action",
        "Telugu",
        "English",
        "Hindi",
        "Tamil",
        "Malayalam",
        "Kannada",
        "Bengali",
        "Gujarati",
        "Japanese",
        "Korean",
        "Silent"
      ],
      comingSoon: {
        title: "Coming Soon",
        subtitle: "Explore Upcoming Movies"
      },
      movies: movies
    });
  } catch (error) {
    console.error("❌ HOME API ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getHome };
