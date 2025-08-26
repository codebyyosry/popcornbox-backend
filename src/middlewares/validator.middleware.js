// src/middlewares/validator.middleware.js

import { validationResult } from "express-validator";
import logger from "../utils/logger.js";
import { sendError } from "../utils/response.js";

// Middleware to handle validation results
export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    logger.warn(`Validation failed for route: ${req.originalUrl}, Errors: ${JSON.stringify(errorMessages)}`);
    return sendError(res, "Validation failed", errorMessages, 400);
  }
  next();
}
