import FilmCard from "./FilmCard";

function MovieList({ movies }) {
  return (
    <section id="dossier" className="dossier-section">
      <h2 className="dossier-title">My Dossier</h2>

      <div className="movie-grid">
        {movies.map((movie) => (
          <FilmCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieList;
