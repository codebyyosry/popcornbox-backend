// src/services/tv.service.js

import { fetchWithCache } from "../utils/cache.js";

// --- Trending TV ---
export const fetchTrendingTV = (timeWindow = "day", page = 1) =>
  fetchWithCache(`tv_trending_${timeWindow}_${page}`, `/trending/tv/${timeWindow}`, {
    language: "en-US",
    page,
  });

// --- Popular TV ---
export const fetchPopularTV = (page = 1) =>
  fetchWithCache(`tv_popular_${page}`, "/tv/popular", {
    language: "en-US",
    page,
  });

// --- Top rated TV ---
export const fetchTopRatedTV = (page = 1) =>
  fetchWithCache(`tv_top_rated_${page}`, "/tv/top_rated", {
    language: "en-US",
    page,
  });

// --- On the air TV ---
export const fetchOnTheAirTV = (page = 1) =>
  fetchWithCache(`tv_on_the_air_${page}`, "/tv/on_the_air", {
    language: "en-US",
    page,
  });

// --- Airing today ---
export const fetchAiringTodayTV = (page = 1) =>
  fetchWithCache(`tv_airing_today_${page}`, "/tv/airing_today", {
    language: "en-US",
    page,
  });

// --- TV details ---
export const fetchTVDetails = (seriesId) =>
  fetchWithCache(`tv_details_${seriesId}`, `/tv/${seriesId}`, {
    language: "en-US",
  });

// --- Recommendations ---
export const fetchTVRecommendations = (seriesId, page = 1) =>
  fetchWithCache(`tv_recommendations_${seriesId}_${page}`, `/tv/${seriesId}/recommendations`, {
    language: "en-US",
    page,
  });

// --- Similar TV ---
export const fetchTVSimilar = (seriesId, page = 1) =>
  fetchWithCache(`tv_similar_${seriesId}_${page}`, `/tv/${seriesId}/similar`, {
    language: "en-US",
    page,
  });

// --- TV Videos ---
export const fetchTVVideos = async (seriesId) => {
  const response = await fetchWithCache(`tv_videos_${seriesId}`, `/tv/${seriesId}/videos`, {
    language: "en-US",
  });

  // Filter to find the best Trailer (official, YouTube, type=Trailer)
  const trailer = response.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube" && v.official
  );

  return trailer || null;
};

// --- TV Credits ---
export const fetchTVCredits = (seriesId) =>
  fetchWithCache(`tv_credits_${seriesId}`, `/tv/${seriesId}/credits`, {
    language: "en-US",
  });
