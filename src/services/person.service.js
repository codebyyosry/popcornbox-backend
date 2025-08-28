// src/services/person.service.js

import { fetchWithCache } from "../utils/cache.js";

// --- Popular persons ---
export const fetchPopularPersons = (page = 1) =>
  fetchWithCache(`persons_popular_${page}`, "/person/popular", {
    language: "en-US",
    page,
  });

// --- Person details ---
export const fetchPersonDetails = (personId) =>
  fetchWithCache(`person_details_${personId}`, `/person/${personId}`, {
    language: "en-US",
  });

// --- Person movie credits ---
export const fetchPersonMovieCredits = (personId) =>
  fetchWithCache(`person_movie_credits_${personId}`, `/person/${personId}/movie_credits`, {
    language: "en-US",
  });

// --- Person TV credits ---
export const fetchPersonTVCredits = (personId) =>
  fetchWithCache(`person_tv_credits_${personId}`, `/person/${personId}/tv_credits`, {
    language: "en-US",
  });

// --- Search persons ---
export const searchPersons = (query, page = 1) =>
  fetchWithCache(`search_person_${query}_${page}`, "/search/person", {
    language: "en-US",
    query,
    page,
  });

// --- Trending persons ---
export const fetchTrendingPersons = (timeWindow = "day", page = 1) =>
  fetchWithCache(`trending_person_${timeWindow}_${page}`, `/trending/person/${timeWindow}`, {
    language: "en-US",
    page,
  });