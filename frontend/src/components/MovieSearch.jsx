import { useState } from "react";

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch() {
    const response = await fetch(
      `http://localhost:3000/tmdb/search?query=${encodeURIComponent(searchTerm)}`,
    );

    console.log(response.status);
    const data = await response.json();
    console.log(data);
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
      <ul>
        {results.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
