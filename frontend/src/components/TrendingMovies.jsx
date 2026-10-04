import { useEffect, useState } from "react";
import "./TrendingMovies.css";

const API_URL = import.meta.env.VITE_API_URL;

function TrendingMovies({ onMovieSelected }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getTrendingMovies() {
      const response = await fetch(`${API_URL}/tmdb/trending`);
      const data = await response.json();

      if (response.ok) {
        setMovies(data.slice(0, 6));
      }
    }

    getTrendingMovies();
  }, []);

  return (
    <section className="trending-section">
      <h2>Trending Now</h2>

      <div className="trending-grid">
        {movies.map((movie) => (
          <article
            className="trending-card"
            key={movie.id}
            onClick={() => onMovieSelected(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
              alt={movie.title}
            />

            <h3>{movie.title}</h3>

            {movie.releaseDate && <p>{movie.releaseDate.slice(0, 4)}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export default TrendingMovies;
