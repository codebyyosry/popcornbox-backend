// src/services/search.service.js

import { fetchWithCache } from "../utils/cache.js";

// --- Multi-type search across movies, TV, people ---
export const searchMulti = (query, page = 1) =>
  fetchWithCache(`search_multi_${query}_${page}`, "/search/multi", {
    language: "en-US",
    query,
    page,
  });

// --- Search for movies ---
export const searchMovies = (query, page = 1) =>
  fetchWithCache(`search_movie_${query}_${page}`, "/search/movie", {
    language: "en-US",
    query,
    page,
  });

// --- Search for people ---
export const searchPersons = (query, page = 1) =>
  fetchWithCache(`search_person_${query}_${page}`, "/search/person", {
    language: "en-US",
    query,
    page,
  });

// --- (Optional) Search for TV shows ---
export const searchTV = (query, page = 1) =>
  fetchWithCache(`search_tv_${query}_${page}`, "/search/tv", {
    language: "en-US",
    query,
    page,
  });