import FilmCard from "./FilmCard";

function MovieList({ movies }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <FilmCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
