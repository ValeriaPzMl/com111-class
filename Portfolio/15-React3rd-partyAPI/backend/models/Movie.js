const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  poster: String,
  best_character: {
    name: String,
    affiliation: String,
    image: String,
    bio: String,
  },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [{ name: String, comment: String }],
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
