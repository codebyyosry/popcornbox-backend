
// models/favorite.js

import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: {
    type: Number,
    required: true, // TMDB movie ID
  },
  title: {
    type: String,
    required: true, // Movie title
  },
  posterUrl: {
    type: String,   // Poster image URL
  },
  releaseDate: {
    type: String,   // Release date
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a user cannot add the same movie twice
favoriteSchema.index({ user: 1, movieId: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
