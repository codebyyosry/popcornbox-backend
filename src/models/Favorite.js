
// models/favorite.js

import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tmdbId: {
    type: Number,
    required: true, // TMDB ID (movie, tv, person)
  },
  type: {
    type: String,
    enum: ["movie", "tv", "person"],
    required: true, // specify what this favorite is
  },
  title: {
    type: String, // Movie or TV name/title
  },
  posterUrl: {
    type: String, // Poster image URL
  },
  releaseDate: {
    type: String, // Release date for movie or firstAirDate for TV
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a user cannot add the same movie twice
favoriteSchema.index({ user: 1, tmdbId: 1, type: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
