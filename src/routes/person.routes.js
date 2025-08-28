// src/routes/person.routes.js

import express from "express";
import { param, query } from "express-validator";
import {
  getPopularPersons,
  getPersonDetails,
  getPersonMovieCredits,
  getPersonTVCredits,
  searchPersonsController,
  getTrendingPersons,
} from "../controllers/person.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

// Popular persons
router.get(
  "/popular",
  [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    validate,
  ],
  getPopularPersons
);

// Search persons
router.get(
  "/search",
  [
    query("query").notEmpty().withMessage("Query parameter is required"),
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    validate,
  ],
  searchPersonsController
);

// Trending persons
router.get(
  "/trending/:timeWindow",
  [
    param("timeWindow").isIn(["day", "week"]).withMessage("timeWindow must be 'day' or 'week'"),
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    validate,
  ],
  getTrendingPersons
);

// Person details
router.get(
  "/:id",
  [
    param("id").isInt().withMessage("Person ID must be an integer"),
    validate,
  ],
  getPersonDetails
);

// Person movie credits
router.get(
  "/:id/movie_credits",
  [
    param("id").isInt().withMessage("Person ID must be an integer"),
    validate,
  ],
  getPersonMovieCredits
);

// Person TV credits
router.get(
  "/:id/tv_credits",
  [
    param("id").isInt().withMessage("Person ID must be an integer"),
    validate,
  ],
  getPersonTVCredits
);

export default router;
