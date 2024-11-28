import React from "react";

function MovieDetails({ movie }) {
    console.log("MovieDetails received movie:", movie); // Depuración
    if (!movie || !movie.best_character) {
      return <p>No details available.</p>;
    }
  
    const { name, affiliation, image, bio } = movie.best_character;
  
    return (
      <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
        <h2>{name}</h2>
        <img
          src={image}
          alt={name}
          style={{ width: "200px", borderRadius: "10px" }}
        />
        <p>
          <strong>Affiliation:</strong> {affiliation}
        </p>
        <p>{bio}</p>
      </div>
    );
  }
  
  export default MovieDetails;
  
