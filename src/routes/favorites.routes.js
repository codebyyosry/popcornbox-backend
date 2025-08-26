// src/routes/favorite.routes.js

import express from "express";
import { body, param } from "express-validator";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favorites.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

// All routes here are protected, but the main index.js applies it

// Add movie to favorites
router.post(
  "/add",
  [
    body("movieId").isInt().withMessage("movieId must be an integer"),
    body("title").notEmpty().withMessage("title is required"),
    body("posterUrl").optional().isURL().withMessage("Invalid poster URL format"),
    body("releaseDate").optional().isDate().withMessage("Invalid date format"),
    validate,
  ],
  addFavorite
);

// Get all favorites
router.get("/", getFavorites);

// Remove a movie from favorites
router.delete(
  "/:movieId",
  [
    param("movieId").isInt().withMessage("movieId must be an integer"),
    validate,
  ],
  removeFavorite
);

export default router;