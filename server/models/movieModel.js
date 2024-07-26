const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    apiId: {
      type: String,
      required: true,
      unique: true,
    },
    runtime: {
      type: Number,
      required: true,
    },
    release_date: Date,
    poster_path: String,
    backdrop_path: String,
    overview: String,
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
