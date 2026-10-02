import { useState } from "react";

function MovieSearch({ onMovieSelected }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function handleSearch() {
    const response = await fetch(
      `http://localhost:3000/tmdb/search?query=${encodeURIComponent(searchTerm)}`,
    );

    const data = await response.json();

    setResults(data);
  }

  return (
    <div className="movie-search">
      <div className="search-hero">
        <h2>Welcome to the film archive</h2>

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
            className="film-card"
            key={movie.id}
            onClick={() => {
              setSelectedMovie(movie);
              onMovieSelected(movie);
            }}
          >
            <img
              className="film-poster"
              src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
            />
            <div className="film-details">
              <h2 className="film-title">{movie.title}</h2>
              <p className="film-year">({movie.releaseDate.slice(0, 4)})</p>
              <p className="film-description">{movie.overview}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
