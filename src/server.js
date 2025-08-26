// src/server.js

import app from "./app.js";
import { connectDB } from "./config/db.js";
import logger from "./utils/logger.js";
import env from "./config/env.js"; // Import the new config file

// Log the current environment
logger.info(`Running in ${env.env} environment`);

connectDB();

app.get("/", (req, res) => {
  res.send("🍿 PopcornBox Backend is running!");
});

const port = env.port || 5000;
app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
