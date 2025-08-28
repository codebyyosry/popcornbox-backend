// src/routes/favorite.routes.js

import express from "express";
import { body, param } from "express-validator";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favorites.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

// All routes here are protected, main index.js applies auth middleware

// Add a favorite (movie, TV, or person)
router.post(
  "/",
  [
    body("tmdbId").isInt().withMessage("tmdbId must be an integer"),
    body("type")
      .notEmpty()
      .isIn(["movie", "tv", "person"])
      .withMessage("type must be one of 'movie', 'tv', 'person'"),
    body("title").notEmpty().withMessage("title is required"),
    body("posterUrl").optional().isURL().withMessage("Invalid poster URL format"),
    body("releaseDate").optional().isDate().withMessage("Invalid date format"),
    validate,
  ],
  addFavorite
);

// Get all favorites
router.get("/", getFavorites);

// Remove a favorite by type and tmdbId
router.delete(
  "/:type/:tmdbId",
  [
    param("type").isIn(["movie", "tv", "person"]).withMessage("type must be 'movie', 'tv', or 'person'"),
    param("tmdbId").isInt().withMessage("tmdbId must be an integer"),
    validate,
  ],
  removeFavorite
);

export default router;
