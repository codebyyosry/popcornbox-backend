// src/controllers/favorites.controller.js

import Favorite from "../models/Favorite.js";
import { sendSuccess, sendError } from "../utils/response.js";
import logger from "../utils/logger.js";

// helper to map favorite into same format as TMDB movie
function mapFavorite(fav) {
  return {
    id: fav.movieId,
    title: fav.title,
    posterUrl: fav.posterUrl,
    releaseDate: fav.releaseDate,
    addedAt: fav.addedAt,
  };
}

// Add a movie to favorites
export async function addFavorite(req, res) {
  try {
    const userId = req.user._id;
    const { movieId, title, posterUrl, releaseDate } = req.body;

    const existing = await Favorite.findOne({ user: userId, movieId });
    if (existing) {
      logger.warn(`User ${userId} attempted to add duplicate favorite: ${movieId}`);
      return sendError(res, "Movie already in favorites", null, 400);
    }

    const newFavorite = await Favorite.create({
      user: userId,
      movieId,
      title,
      posterUrl,
      releaseDate,
    });

    logger.info(`User ${userId} added new favorite: ${title} (ID: ${movieId})`);
    return sendSuccess(res, "New Favorite Added", mapFavorite(newFavorite), 201);
  } catch (err) {
    logger.error(`User ${req.user._id} failed to add favorite. Error: ${err.message}`, { stack: err.stack });
    return sendError(res, "Failed to add favorite", err.message, 500);
  }
}

// Get all favorites for logged-in user
export async function getFavorites(req, res) {
  try {
    const userId = req.user._id;
    const favorites = await Favorite.find({ user: userId }).sort({ addedAt: -1 });
    logger.info(`User ${userId} retrieved ${favorites.length} favorites`);
    return sendSuccess(
      res,
      "Favorites retrieved successfully",
      favorites.map(mapFavorite),
      200
    );
  } catch (err) {
    logger.error(`User ${req.user._id} failed to get favorites. Error: ${err.message}`, { stack: err.stack });
    return sendError(res, "Failed to get favorites", err.message, 500);
  }
}

// Remove a movie from favorites
export async function removeFavorite(req, res) {
  try {
    const userId = req.user._id;
    const { movieId } = req.params;

    const deleted = await Favorite.findOneAndDelete({ user: userId, movieId });
    if (!deleted) {
      logger.warn(`User ${userId} attempted to remove a non-existent favorite: ${movieId}`);
      return sendError(res, "Favorite not found", null, 404);
    }
    logger.info(`User ${userId} removed favorite: ${deleted.title} (ID: ${movieId})`);
    return sendSuccess(res, "Favorite removed successfully", mapFavorite(deleted), 200);
  } catch (err) {
    logger.error(`User ${req.user._id} failed to remove favorite. Error: ${err.message}`, { stack: err.stack });
    return sendError(res, "Failed to remove favorite", err.message, 500);
  }
}