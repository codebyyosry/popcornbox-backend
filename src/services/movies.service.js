//src/services/movies.service.js

import { fetchWithCache } from "../utils/cache.js";


// Movie details
export const fetchMovieDetails = (movieId) =>
  fetchWithCache(`details_${movieId}`, `/movie/${movieId}`, { language: "en-US" });

// Genres
export const fetchGenres = () =>
  fetchWithCache("genres", "/genre/movie/list", { language: "en-US" });


// Credits
export const fetchMovieCredits = (movieId) =>
  fetchWithCache(`credits_${movieId}`, `/movie/${movieId}/credits`, { language: "en-US" });



// Popular movies
export const fetchPopularMovies = (page = 1) =>
  fetchWithCache(`popular_${page}`, "/movie/popular", { language: "en-US", page });

// Popular movies
export const fetchNowPlayingMovies = (page = 1) =>
  fetchWithCache(`now_playing_${page}`, "/movie/now_playing", { language: "en-US", page });


// Top rated movies
export const fetchTopRatedMovies = (page = 1) =>
  fetchWithCache(`topRated_${page}`, "/movie/top_rated", { language: "en-US", page });

// Upcoming movies
export const fetchUpcomingMovies = (page = 1) =>
  fetchWithCache(`upcoming_${page}`, "/movie/upcoming", { language: "en-US", page });

// By genre
export const fetchMoviesByGenre = (genreId, page = 1) =>
  fetchWithCache(`genre_${genreId}_${page}`, "/discover/movie", {
    language: "en-US",
    sort_by: "popularity.desc",
    with_genres: genreId,
    page,
  });


  // --- Trending movies ---
export const fetchTrendingMovies = (timeWindow = "day", page = 1) =>
  fetchWithCache(`trending_movie_${timeWindow}_${page}`, `/trending/movie/${timeWindow}`, {
    language: "en-US",
    page,
  });