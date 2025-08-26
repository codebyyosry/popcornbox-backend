// middlewares/error.middleware.js

import logger from "../utils/logger.js";

export default (err, req, res, next) => {
  logger.error(
    `An unhandled error occurred for route: ${req.originalUrl}, Message: ${err.message}`, {
      stack: err.stack,
      requestBody: req.body,
    }
  );
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
};
