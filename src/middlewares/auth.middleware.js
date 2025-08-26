// middlewares/auth.middleware.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendError } from "../utils/response.js";
import logger from "../utils/logger.js";

export async function protect(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      logger.warn("Authorization token not provided");
      return sendError(res, "Not authorized", null, 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      logger.warn("Token provided but user not found in database");
      return sendError(res, "User not found", null, 401);
    }

    req.user = user;
    logger.info(`Auth successful for user ID: ${user._id}`);
    next();
  } catch (err) {
    logger.error(`Auth middleware error: ${err.message}`, { stack: err.stack });
    return sendError(res, "Invalid token", err.message, 401);
  }
}