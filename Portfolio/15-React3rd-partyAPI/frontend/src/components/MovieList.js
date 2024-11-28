import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Movie List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {movies.map((movie) => (
          <MovieCard key={movie.episode} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
