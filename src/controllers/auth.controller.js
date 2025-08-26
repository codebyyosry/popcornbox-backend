// src/controllers/auth.controller.js

import User from "../models/User.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";
import logger from "../utils/logger.js";
import { sendError } from "../utils/response.js"; // Import sendError utility
import {isValidEmail} from "../utils/validation.js"


// REGISTER
export async function register(req, res) {
  try {
    // Note: The confirmPassword field is handled by the route validator
    const { email, fullName, dateOfBirth, phone, password, profileImage } = req.body;

    // Failsafe check to ensure email format is valid
    if (!isValidEmail(email)) {
      logger.warn(`Registration attempt failed due to invalid email format: ${email}`);
      return sendError(res, "Invalid email format", null, 400);
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Registration attempt with existing email: ${email}`);
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashed = await hashPassword(password);
    const user = await User.create({
      email,
      fullName,
      dateOfBirth,
      phone,
      password: hashed,
      profileImage,
    });

    logger.info(`New user registered successfully with email: ${email}`);
    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    logger.error(`Failed to register user. Error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: "Failed to register" });
  }
}

// LOGIN
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login attempt failed for non-existent email: ${email}`);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      logger.warn(`Login attempt failed due to invalid password for email: ${email}`);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    logger.info(`User logged in successfully: ${email}`);
    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        dataOfBirth: user.dateOfBirth,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    logger.error(`Failed to login user. Error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: "Failed to login" });
  }
}
