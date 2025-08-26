// src/config/db.js

import mongoose from "mongoose";
import logger from "../utils/logger.js";
import env from "./env.js"; // Import the new config file

export async function connectDB() {
  try {
    const conn = await mongoose.connect(env.db.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error("❌ MongoDB connection error:", { message: error.message, stack: error.stack });
    process.exit(1);
  }
}
