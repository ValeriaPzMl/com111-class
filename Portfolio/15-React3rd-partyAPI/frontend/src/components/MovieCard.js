import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
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

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        textAlign: "center",
        width: "250px",
      }}
    >
      <img src={movie.poster} alt={movie.title} style={{ width: "150px" }} />
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <button onClick={handleLike}>👍 {likes}</button>
      <button onClick={handleDislike}>👎 {dislikes}</button>
      <Link to={`/movies/${movie.episode}`}>
        <button>More...</button>
      </Link>
    </div>
  );
}

export default MovieCard;
