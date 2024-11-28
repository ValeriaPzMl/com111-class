import React, { useState } from "react";

function MovieCard({ movie }) {
  const [showDetails, setShowDetails] = useState(false); // Controla si se muestran los detalles
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <div
      className="movie-card"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        textAlign: "center",
        width: "300px", // Asegúrate de que las tarjetas tengan un ancho consistente
      }}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        style={{
          width: "150px",
        }}
      />
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
      <button onClick={() => setDislikes(dislikes + 1)}>👎 {dislikes}</button>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "More..."}
      </button>

      {showDetails && (
        <div
          style={{
            marginTop: "10px",
            textAlign: "left",
          }}
        >
          <h4>{movie.best_character.name}</h4>
          <img
            src={movie.best_character.image}
            alt={movie.best_character.name}
            style={{
              width: "100px",
              borderRadius: "5px",
            }}
          />
          <p>
            <strong>Affiliation:</strong> {movie.best_character.affiliation}
          </p>
          <p>{movie.best_character.bio}</p>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
