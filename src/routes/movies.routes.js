// src/routes/movies.routes.js

import express from "express";
import { param, query } from "express-validator";
import {
  getPopularMovies,
  getMovieDetails,
  searchMoviesController,
  getTopRatedMovies,
  getUpcomingMovies,
  getGenres,
  getMovieCredits,
  getMoviesByGenre,
} from "../controllers/movies.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

// Specific routes


// Movie genres
router.get("/genres", getGenres);

// Search movies
router.get(
  "/search",
  [
    query("query").notEmpty().withMessage("Query parameter is required"),
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    validate,
  ],
  searchMoviesController
);

// Popular movies
router.get(
  "/popular",
  [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    validate,
  ],
  getPopularMovies
);

// Top Rated movies
router.get(
  "/top-rated",
  [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    validate,
  ],
  getTopRatedMovies
);

// Upcoming movies
router.get(
  "/upcoming",
  [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    validate,
  ],
  getUpcomingMovies
);

// Parameterized routes

// Filter movies by genre
router.get(
  "/genre/:genreId",
  [
    param("genreId").isInt().withMessage("genreId must be an integer"),
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    validate,
  ],
  getMoviesByGenre
);

// Movie credits (cast & crew)
router.get(
  "/:id/credits",
  [
    param("id").isInt().withMessage("Movie ID must be an integer"),
    validate,
  ],
  getMovieCredits
);

// Movie details by ID
router.get(
  "/:id",
  [
    param("id").isInt().withMessage("Movie ID must be an integer"),
    validate,
  ],
  getMovieDetails
);

export default router;