// src/controllers/tv.controller.js

import {
  fetchTrendingTV,
  fetchPopularTV,
  fetchTopRatedTV,
  fetchOnTheAirTV,
  fetchAiringTodayTV,
  fetchTVDetails,
  fetchTVRecommendations,
  fetchTVSimilar,
  fetchTVVideos,
  fetchTVCredits,
} from "../services/tv.service.js";

import { sendSuccess, sendError } from "../utils/response.js";
import { formatPaginatedResponse, mapTMDBTV, mapTMDBTVDetails, mapTMDBCredits } from "../utils/tmdbMapper.js";
import logger from "../utils/logger.js";

// --- Trending ---
export async function getTrendingTV(req, res) {
  try {
    const { timeWindow } = req.params;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;

    const tv = await fetchTrendingTV(timeWindow, page);
    logger.info(`Fetched trending TV for timeWindow=${timeWindow}, page=${page}`);
    return sendSuccess(res, "Trending TV retrieved", formatPaginatedResponse(tv, mapTMDBTV));
  } catch (error) {
    logger.error(`Error fetching trending TV: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch trending TV", error.message);
  }
}

// --- Popular ---
export async function getPopularTV(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const tv = await fetchPopularTV(page);
    logger.info(`Fetched popular TV for page=${page}`);
    return sendSuccess(res, "Popular TV retrieved", formatPaginatedResponse(tv, mapTMDBTV));
  } catch (error) {
    logger.error(`Error fetching popular TV: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch popular TV", error.message);
  }
}

// --- Top rated ---
export async function getTopRatedTV(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const tv = await fetchTopRatedTV(page);
    logger.info(`Fetched top rated TV for page=${page}`);
    return sendSuccess(res, "Top rated TV retrieved", formatPaginatedResponse(tv, mapTMDBTV));
  } catch (error) {
    logger.error(`Error fetching top rated TV: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch top rated TV", error.message);
  }
}

// --- On the air ---
export async function getOnTheAirTV(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const tv = await fetchOnTheAirTV(page);
    logger.info(`Fetched on the air TV for page=${page}`);
    return sendSuccess(res, "On the air TV retrieved", formatPaginatedResponse(tv, mapTMDBTV));
  } catch (error) {
    logger.error(`Error fetching on the air TV: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch on the air TV", error.message);
  }
}

// --- Airing today ---
export async function getAiringTodayTV(req, res) {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const tv = await fetchAiringTodayTV(page);
    logger.info(`Fetched airing today TV for page=${page}`);
    return sendSuccess(res, "Airing today TV retrieved", formatPaginatedResponse(tv, mapTMDBTV));
  } catch (error) {
    logger.error(`Error fetching airing today TV: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch airing today TV", error.message);
  }
}

// --- TV details ---
export async function getTVDetails(req, res) {
  try {
    const { id } = req.params;
    const tv = await fetchTVDetails(id);
    logger.info(`Fetched TV details for ID=${id}`);
    return sendSuccess(res, "TV details retrieved", mapTMDBTVDetails(tv));
  } catch (error) {
    logger.error(`Error fetching TV details for ID=${req.params.id}: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch TV details", error.message);
  }
}

// --- Recommendations ---
export async function getTVRecommendations(req, res) {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;

    const tv = await fetchTVRecommendations(id, page);
    logger.info(`Fetched recommendations for TV ID=${id}, page=${page}`);
    return sendSuccess(res, "TV recommendations retrieved", formatPaginatedResponse(tv, mapTMDBTV));
  } catch (error) {
    logger.error(`Error fetching TV recommendations for ID=${req.params.id}: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch TV recommendations", error.message);
  }
}

// --- Similar ---
export async function getTVSimilar(req, res) {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;

    const tv = await fetchTVSimilar(id, page);
    logger.info(`Fetched similar TV for ID=${id}, page=${page}`);
    return sendSuccess(res, "Similar TV retrieved", formatPaginatedResponse(tv, mapTMDBTV));
  } catch (error) {
    logger.error(`Error fetching similar TV for ID=${req.params.id}: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch similar TV", error.message);
  }
}

// --- Videos ---
export async function getTVVideos(req, res) {
  try {
    const { id } = req.params;
    const video = await fetchTVVideos(id);
    logger.info(`Fetched trailer video for TV ID=${id}`);
    return sendSuccess(res, "TV trailer retrieved", video);
  } catch (error) {
    logger.error(`Error fetching TV videos for ID=${req.params.id}: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch TV videos", error.message);
  }
}

// --- Credits ---
export async function getTVCredits(req, res) {
  try {
    const { id } = req.params;
    const credits = await fetchTVCredits(id);
    logger.info(`Fetched credits for TV ID=${id}`);
    return sendSuccess(res, "TV credits retrieved", mapTMDBCredits(credits));
  } catch (error) {
    logger.error(`Error fetching TV credits for ID=${req.params.id}: ${error.message}`, { stack: error.stack });
    return sendError(res, "Failed to fetch TV credits", error.message);
  }
}
