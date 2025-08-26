// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional: virtual to count favorites if needed later
userSchema.virtual("favoritesCount", {
  ref: "Favorite",
  localField: "_id",
  foreignField: "user",
  count: true,
});

const User = mongoose.model("User", userSchema);

export default User;
