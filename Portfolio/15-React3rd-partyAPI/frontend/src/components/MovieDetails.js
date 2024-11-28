import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieDetails({ movies }) {
  const { episode } = useParams();
  const movie = movies.find((m) => m.episode === episode);

  const [likes, setLikes] = useState(movie.likes || 0);
  const [dislikes, setDislikes] = useState(movie.dislikes || 0);

  const handleLike = () => {
    axios.post(`http://localhost:5000/movies/${movie.episode}/like`).then((response) => {
      setLikes(response.data.likes); // Actualiza los likes desde el backend
    });
  };

  const handleDislike = () => {
    axios.post(`http://localhost:5000/movies/${movie.episode}/dislike`).then((response) => {
      setDislikes(response.data.dislikes); // Actualiza los dislikes desde el backend
    });
  };

  if (!movie) {
    return <h2 style={{ textAlign: "center" }}>Movie not found</h2>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{movie.title}</h1>
      <img src={movie.poster} alt={movie.title} style={{ width: "300px" }} />
      <h2>Best Character: {movie.best_character.name}</h2>
      <img
        src={movie.best_character.image}
        alt={movie.best_character.name}
        style={{ width: "150px", margin: "20px 0" }}
      />
      <p><strong>Affiliation:</strong> {movie.best_character.affiliation}</p>
      <p style={{ maxWidth: "600px", margin: "0 auto" }}>{movie.best_character.bio}</p>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleLike}>👍 {likes}</button>
        <button onClick={handleDislike}>👎 {dislikes}</button>
      </div>
    </div>
  );
}

export default MovieDetails;
