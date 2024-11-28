const express = require("express");
const cors = require("cors");
const movies = require("./data");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Ruta para obtener las películas
app.get("/movies", (req, res) => {
  res.json(movies);
});

app.post("/movies/:episode/like", (req, res) => {
  const movie = movies.find((m) => m.episode === req.params.episode);
  if (movie) {
    movie.likes = (movie.likes || 0) + 1;
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.post("/movies/:episode/dislike", (req, res) => {
  const movie = movies.find((m) => m.episode === req.params.episode);
  if (movie) {
    movie.dislikes = (movie.dislikes || 0) + 1;
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});


// Iniciar el servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
