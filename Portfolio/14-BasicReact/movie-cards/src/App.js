import React, { useState } from "react";
import sw from "./data/data.js"; // Asegúrate de que esta ruta sea válida
import MovieCard from "./components/MovieCard";
import "./App.css";


function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  //console.log("Loaded movies:", sw); // Verifica que los datos se carguen al inicio

  return (
    <div className="app-container">
      <h1>Movie Cards</h1>
      <div className="movie-list">
        {sw.map((movie) => (
          <MovieCard
            key={movie.episode}
            movie={movie}
            onMoreClick={() => {
              console.log("More clicked for:", movie.title); // Depuración
              setSelectedMovie(movie); // Actualiza el estado
              console.log("Selected movie set to:", movie); // Verifica el estado actualizado
            }}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
