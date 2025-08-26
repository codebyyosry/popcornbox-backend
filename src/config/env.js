// src/config/env.js

import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config({ path: "./.env" });
dotenvExpand.expand(myEnv);

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT,
  db: {
    mongoUri: process.env.MONGO_URI,
  },
  tmdb: {
    apiKey: process.env.TMDB_API_KEY,
    baseUrl: process.env.BASE_URL,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
  },
};

export default config;
