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
    <div>
      <h2>Search for a film</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search for a film..."
      />
      <button onClick={handleSearch}>Search</button>
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
              <p className="film-description">{movie.overview}</p>
            </div>
          </li>
        ))}
      </ul>
      {selectedMovie && (
        <div>
          <h3>Selected Film</h3>
          <p>{selectedMovie.title}</p>
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
