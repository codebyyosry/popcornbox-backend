// src/app.js

import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/error.middleware.js";
import logger from "./utils/logger.js";

const app = express();

app.use(cors());
// Use Morgan to log requests, piping the output to our Winston logger
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
app.use(express.json());

app.use("/api", routes);

// Error handler
app.use(errorHandler);

export default app;