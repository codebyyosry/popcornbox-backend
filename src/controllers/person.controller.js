// src/controllers/person.controller.js

import {
  fetchPopularPersons,
  fetchPersonDetails,
  fetchPersonMovieCredits,
  fetchPersonTVCredits,
  searchPersons,
  fetchTrendingPersons,
} from "../services/person.service.js";

import { sendSuccess, sendError } from "../utils/response.js";
import { formatPaginatedResponse, mapTMDBPerson, mapTMDBPersonDetails, mapTMDBCredits } from "../utils/tmdbMapper.js";
import logger from "../utils/logger.js";

// --- Popular persons ---
export async function getPopularPersons(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const persons = await fetchPopularPersons(page);
    logger.info(`Fetched popular persons for page ${page}`);
    return sendSuccess(res, "Popular persons retrieved", formatPaginatedResponse(persons, mapTMDBPerson));
  } catch (error) {
    logger.error(`Error fetching popular persons: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch popular persons", error.message);
  }
}

// --- Person details ---
export async function getPersonDetails(req, res) {
  try {
    const { id } = req.params;
    const person = await fetchPersonDetails(id);
    logger.info(`Fetched details for person ID: ${id}`);
    return sendSuccess(res, "Person details retrieved", mapTMDBPersonDetails(person));
  } catch (error) {
    logger.error(`Error fetching person details for ID ${req.params.id}: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch person details", error.message);
  }
}

// --- Movie credits ---
export async function getPersonMovieCredits(req, res) {
  try {
    const { id } = req.params;
    const credits = await fetchPersonMovieCredits(id);
    logger.info(`Fetched movie credits for person ID: ${id}`);
    return sendSuccess(res, "Person movie credits retrieved", mapTMDBCredits(credits));
  } catch (error) {
    logger.error(`Error fetching movie credits for person ID ${req.params.id}: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch person movie credits", error.message);
  }
}

// --- TV credits ---
export async function getPersonTVCredits(req, res) {
  try {
    const { id } = req.params;
    const credits = await fetchPersonTVCredits(id);
    logger.info(`Fetched TV credits for person ID: ${id}`);
    return sendSuccess(res, "Person TV credits retrieved", mapTMDBCredits(credits));
  } catch (error) {
    logger.error(`Error fetching TV credits for person ID ${req.params.id}: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch person TV credits", error.message);
  }
}

// --- Search persons ---
export async function searchPersonsController(req, res) {
  try {
    const { query } = req.query;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;

    const results = await searchPersons(query, page);
    logger.info(`Searched persons with query "${query}" page ${page}`);
    return sendSuccess(res, "Search results", formatPaginatedResponse(results, mapTMDBPerson));
  } catch (error) {
    logger.error(`Error searching persons with query "${req.query.query}": ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to search persons", error.message);
  }
}

// --- Trending persons ---
export async function getTrendingPersons(req, res) {
  try {
    const { timeWindow } = req.params; // day | week
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;

    const persons = await fetchTrendingPersons(timeWindow, page);
    logger.info(`Fetched trending persons for timeWindow: ${timeWindow}, page ${page}`);
    return sendSuccess(res, "Trending persons retrieved", formatPaginatedResponse(persons, mapTMDBPerson));
  } catch (error) {
    logger.error(`Error fetching trending persons: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch trending persons", error.message);
  }
}
