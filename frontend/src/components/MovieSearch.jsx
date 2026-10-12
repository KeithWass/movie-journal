import { useState } from "react";
import "./MovieSearch.css";

const API_URL = import.meta.env.VITE_API_URL;

function MovieSearch({ onMovieSelected }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function handleSearch() {
    const response = await fetch(
      `${API_URL}/tmdb/search?query=${encodeURIComponent(searchTerm)}`,
    );

    const data = await response.json();

    setResults(data);
  }

  return (
    <div className="movie-search">
      <div className="search-hero">
        <h2>Welcome to the DFD film archive</h2>

        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search for a film..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <ul className="search-results">
        {results.map((movie) => (
          <li
            className="search-result-card"
            key={movie.id}
            onClick={() => {
              setSelectedMovie(movie);
              onMovieSelected(movie);
            }}
          >
            <img
              className="search-result-poster"
              src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
              alt={movie.title}
            />

            <div className="search-result-details">
              <h2 className="search-result-title">{movie.title}</h2>

              <p className="search-result-year">
                ({movie.releaseDate.slice(0, 4)})
              </p>

              <p className="search-result-description">{movie.overview}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
