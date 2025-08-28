// src/controllers/movies.controller.js

import {
  fetchPopularMovies,
  fetchMovieDetails,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchGenres,
  fetchMovieCredits,
  fetchMoviesByGenre,
  fetchNowPlayingMovies,
  fetchTrendingMovies
} from "../services/movies.service.js";

import { sendSuccess, sendError } from "../utils/response.js";
import {
  mapTMDBMovieDetails,
  mapTMDBCredits,
  formatPaginatedResponse,
} from "../utils/tmdbMapper.js";
import logger from "../utils/logger.js";

export async function getGenres(req, res) {
  try {
    const genres = await fetchGenres();
    logger.info("Successfully fetched movie genres");
    return sendSuccess(res, "Genres retrieved", genres.genres);
  } catch (error) {
    logger.error(`Error fetching genres: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch genres", error.message);
  }
}

// --- Movie details ---
export async function getMovieDetails(req, res) {
  try {
    const { id } = req.params;
    const movie = await fetchMovieDetails(id);
    logger.info(`Successfully fetched movie details for ID: ${id}`);
    return sendSuccess(res, "Movie details retrieved", mapTMDBMovieDetails(movie));
  } catch (error) {
    logger.error(`Error fetching movie details for ID ${req.params.id}: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch movie details", error.message);
  }
}

// --- Credits ---
export async function getMovieCredits(req, res) {
  try {
    const { id } = req.params;
    const credits = await fetchMovieCredits(id);
    logger.info(`Successfully fetched movie credits for ID: ${id}`);
    return sendSuccess(res, "Movie credits retrieved", mapTMDBCredits(credits));
  } catch (error) {
    logger.error(`Error fetching movie credits for ID ${req.params.id}: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch movie credits", error.message);
  }
}
export async function getPopularMovies(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const movies = await fetchPopularMovies(page);
    logger.info(`Successfully fetched popular movies for page ${page}`);
    return sendSuccess(res, "Popular movies retrieved", formatPaginatedResponse(movies));
  } catch (error) {
    logger.error(`Error fetching popular movies: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch popular movies", error.message);
  }
}



export async function getNowPlayingMovies(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const movies = await fetchNowPlayingMovies(page);
    logger.info(`Successfully fetched now playing movies for page ${page}`);
    return sendSuccess(res, "Now Playing movies retrieved", formatPaginatedResponse(movies));
  } catch (error) {
    logger.error(`Error fetching now playing movies: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch now playing movies", error.message);
  }
}

export async function getTopRatedMovies(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const movies = await fetchTopRatedMovies(page);
    logger.info(`Successfully fetched top-rated movies for page ${page}`);
    return sendSuccess(res, "Top rated movies retrieved", formatPaginatedResponse(movies));
  } catch (error) {
    logger.error(`Error fetching top-rated movies: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch top rated movies", error.message);
  }
}

export async function getUpcomingMovies(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const movies = await fetchUpcomingMovies(page);
    logger.info(`Successfully fetched upcoming movies for page ${page}`);
    return sendSuccess(res, "Upcoming movies retrieved", formatPaginatedResponse(movies));
  } catch (error) {
    logger.error(`Error fetching upcoming movies: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch upcoming movies", error.message);
  }
}

export async function getMoviesByGenre(req, res) {
  try {
    const { genreId } = req.params;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;

    // Validation is now handled by the route middleware

    const movies = await fetchMoviesByGenre(genreId, page);
    logger.info(`Successfully fetched movies for genre ID ${genreId} on page ${page}`);
    return sendSuccess(res, "Movies by genre retrieved", formatPaginatedResponse(movies));
  } catch (error) {
    logger.error(`Error fetching movies by genre ID ${req.params.genreId}: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch movies by genre", error.message);
  }
}

// --- Trending persons ---
export async function getTrendingMovies(req, res) {
  try {
    const { timeWindow } = req.params; // day | week
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;

    const movies = await fetchTrendingMovies(timeWindow, page);
    logger.info(`Fetched trending movies for timeWindow: ${timeWindow}, page ${page}`);
    return sendSuccess(res, "Trending Movies retrieved", formatPaginatedResponse(movies));
  } catch (error) {
    logger.error(`Error fetching trending movies: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch trending movies", error.message);
  }
}
