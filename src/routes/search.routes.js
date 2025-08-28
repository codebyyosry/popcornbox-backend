// src/routes/search.routes.js

import express from "express";
import { query } from "express-validator";
import {
  searchMultiController,
  searchMoviesController,
  searchPersonsController,
  searchTVController,
} from "../controllers/search.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

// Multi search
router.get(
  "/multi",
  [
    query("query").notEmpty().withMessage("Query parameter is required"),
    query("page").optional().isInt({ min: 1 }),
    validate,
  ],
  searchMultiController
);

// Movie search
router.get(
  "/movie",
  [
    query("query").notEmpty().withMessage("Query parameter is required"),
    query("page").optional().isInt({ min: 1 }),
    validate,
  ],
  searchMoviesController
);

// Person search
router.get(
  "/person",
  [
    query("query").notEmpty().withMessage("Query parameter is required"),
    query("page").optional().isInt({ min: 1 }),
    validate,
  ],
  searchPersonsController
);

// TV search
router.get(
  "/tv",
  [
    query("query").notEmpty().withMessage("Query parameter is required"),
    query("page").optional().isInt({ min: 1 }),
    validate,
  ],
  searchTVController
);

export default router;
