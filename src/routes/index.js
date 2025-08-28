//src/routes/index.js

import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import moviesRoutes from "./movies.routes.js";
import authRoutes from "./auth.routes.js";
import favoritesRoutes from "./favorites.routes.js";
import personRoutes from "./person.routes.js";
import tvRoutes from "./tv.routes.js";
import searchRoutes from "./search.routes.js";
import { printCacheKeys } from "../utils/cache.js";

const router = express.Router();
router.use("/auth", authRoutes);
// Debug endpoint to see cache keys

router.get("/cache/debug", (req, res) => {
  const keys = printCacheKeys();
  res.json({ cachedKeys: keys });
});

// Apply auth middleware to all routes
router.use(protect);

router.use("/movies", moviesRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/person", personRoutes);
router.use("/tv", tvRoutes);
router.use("/search", searchRoutes);
export default router;
