// src/routes/auth.routes.js

import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

// Auth
router.post(
  "/register",
  [
    // Email validation to ensure a valid format
    body("email").isEmail().withMessage("Invalid email format"),
    body("fullName").notEmpty().withMessage("Full name is required"),
    // A stronger password policy
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[^a-zA-Z0-9]/)
      .withMessage("Password must contain at least one special character"),
    // Confirm password validation
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }),
    body("dateOfBirth").optional().isDate().withMessage("Invalid date format"),
    body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
    validate, // This middleware stops the request if validation fails
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
    validate,
  ],
  login
);

export default router;
