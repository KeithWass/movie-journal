import FilmCard from "./FilmCard";

function MovieList({ movies, onMovieSelected }) {
  const watchedMovies = movies.filter((movie) => movie.watched);
  const unwatchedMovies = movies.filter((movie) => !movie.watched);

  return (
    <section id="dossier" className="dossier-section">
      <h2 className="dossier-title">My Dossier</h2>

      {watchedMovies.length > 0 && (
        <section className="dossier-category">
          <h3>Films you've watched</h3>

          <div className="movie-grid">
            {watchedMovies.map((movie) => (
              <FilmCard
                key={movie.id}
                movie={movie}
                onMovieSelected={onMovieSelected}
              />
            ))}
          </div>
        </section>
      )}

      {unwatchedMovies.length > 0 && (
        <section className="dossier-category">
          <h3>Films Yet to Watch</h3>

          <div className="movie-grid">
            {unwatchedMovies.map((movie) => (
              <FilmCard
                key={movie.id}
                movie={movie}
                onMovieSelected={onMovieSelected}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default MovieList;
