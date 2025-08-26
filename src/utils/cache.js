// src/utils/cache.js

import NodeCache from "node-cache";
import axios from "axios";
import logger from "./logger.js";
import env from "../config/env.js"; // Import the new config file

const cache = new NodeCache({ stdTTL: 600 });

export function setCache(key, value) {
  const data = { value, cachedAt: Date.now() };
  cache.set(key, data);
  logger.info(`Cache set for key: ${key}`);
}

export function getCache(key) {
  const cached = cache.get(key);
  if (cached) {
    logger.info(`Cache hit for key: ${key}`);
  } else {
    logger.info(`Cache miss for key: ${key}`);
  }
  return cached ? cached.value : null;
}

export function printCacheKeys() {
  return cache.keys().map(key => {
    const entry = cache.get(key);
    return {
      key,
      cachedAt: entry?.cachedAt,
      expiresAt: entry ? entry.cachedAt + cache.options.stdTTL * 1000 : null,
    };
  });
}

export async function fetchWithCache(cacheKey, path, params = {}) {
  const cached = cache.get(cacheKey);
  const BASE_URL = env.tmdb.baseUrl;
  const API_KEY = env.tmdb.apiKey;

  if (!BASE_URL || !API_KEY) {
    logger.error("BASE_URL or TMDB_API_KEY not set in .env");
    throw new Error("BASE_URL or TMDB_API_KEY not set in .env");
  }
  params.api_key = API_KEY;

  if (cached) {
    const now = Date.now();
    const expireTime = cached.cachedAt + cache.options.stdTTL * 1000;
    if (expireTime - now <= 1000) {
      // Refresh the cache asynchronously
      logger.info(`Refreshing cache for key: ${cacheKey}`);
      axios.get(`${BASE_URL}${path}`, { params })
        .then(res => setCache(cacheKey, res.data))
        .catch(err => logger.error(`Failed to refresh cache for key ${cacheKey}: ${err.message}`));
    }
    return cached.value;
  }

  try {
    const response = await axios.get(`${BASE_URL}${path}`, { params });
    setCache(cacheKey, response.data);
    logger.info(`Successfully fetched and cached data for key: ${cacheKey}`);
    return response.data;
  } catch (err) {
    logger.error(`API call failed for path ${path}. Error: ${err.message}`, { stack: err.stack });
    throw err;
  }
}
