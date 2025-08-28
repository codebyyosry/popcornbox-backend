// src/controllers/search.controller.js

import {
  searchMulti,
  searchMovies,
  searchPersons,
  searchTV,
} from "../services/search.service.js";

import { sendSuccess, sendError } from "../utils/response.js";
import { formatPaginatedResponse, mapTMDBMovie, mapTMDBPerson, mapTMDBTV, mapTMDBMulti } from "../utils/tmdbMapper.js";
import logger from "../utils/logger.js";

// --- Multi search ---
export async function searchMultiController(req, res) {
  try {
    const { query } = req.query;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;

    const results = await searchMulti(query, page);
    logger.info(`Multi-search for "${query}" page ${page}`);
    return sendSuccess(res, "Multi search results", 
        formatPaginatedResponse(results, mapTMDBMulti));
  } catch (error) {
    logger.error(`Error multi-searching: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to search", error.message);
  }
}

// --- Movie search ---
export async function searchMoviesController(req, res) {
  try {
    const { query } = req.query;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;

    const results = await searchMovies(query, page);
    logger.info(`Movie search for "${query}" page ${page}`);
    return sendSuccess(res, "Movie search results", formatPaginatedResponse(results, mapTMDBMovie));
  } catch (error) {
    logger.error(`Error searching movies: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to search movies", error.message);
  }
}

// --- Person search ---
export async function searchPersonsController(req, res) {
  try {
    const { query } = req.query;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;

    const results = await searchPersons(query, page);
    logger.info(`Person search for "${query}" page ${page}`);
    return sendSuccess(res, "Person search results", formatPaginatedResponse(results, mapTMDBPerson));
  } catch (error) {
    logger.error(`Error searching persons: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to search persons", error.message);
  }
}

// --- TV search ---
export async function searchTVController(req, res) {
  try {
    const { query } = req.query;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;

    const results = await searchTV(query, page);
    logger.info(`TV search for "${query}" page ${page}`);
    return sendSuccess(res, "TV search results", formatPaginatedResponse(results, mapTMDBTV));
  } catch (error) {
    logger.error(`Error searching TV shows: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to search TV shows", error.message);
  }
}
