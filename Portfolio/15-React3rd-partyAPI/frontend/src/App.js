import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import movies from "./data"; // Importa los datos de las películas

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal que muestra la lista de películas */}
        <Route path="/" element={<MovieList movies={movies} />} />
        
        {/* Ruta dinámica que muestra los detalles de una película específica */}
        <Route path="/movies/:episode" element={<MovieDetails movies={movies} />} />
      </Routes>
    </Router>
  );
}

export default App;
