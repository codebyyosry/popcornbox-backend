import express from "express";
import { param, query } from "express-validator";
import {
  getTrendingTV,
  getPopularTV,
  getTopRatedTV,
  getOnTheAirTV,
  getAiringTodayTV,
  getTVDetails,
  getTVRecommendations,
  getTVSimilar,
  getTVVideos,
  getTVCredits,
} from "../controllers/tv.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

// Trending TV
router.get(
  "/trending/:timeWindow",
  [
    param("timeWindow").isIn(["day", "week"]).withMessage("timeWindow must be 'day' or 'week'"),
    query("page").optional().isInt({ min: 1 }),
    validate,
  ],
  getTrendingTV
);

// Popular TV
router.get("/popular", [query("page").optional().isInt({ min: 1 }), validate], getPopularTV);

// Top rated TV
router.get("/top-rated", [query("page").optional().isInt({ min: 1 }), validate], getTopRatedTV);

// On the air
router.get("/on_the_air", [query("page").optional().isInt({ min: 1 }), validate], getOnTheAirTV);

// Airing today
router.get("/airing_today", [query("page").optional().isInt({ min: 1 }), validate], getAiringTodayTV);

// TV details
router.get("/:id", [param("id").isInt(), validate], getTVDetails);

// Recommendations
router.get("/:id/recommendations", [param("id").isInt(), validate], getTVRecommendations);

// Similar TV
router.get("/:id/similar", [param("id").isInt(), validate], getTVSimilar);

// Videos (trailer)
router.get("/:id/videos", [param("id").isInt(), validate], getTVVideos);

// Credits
router.get("/:id/credits", [param("id").isInt(), validate], getTVCredits);

export default router;
