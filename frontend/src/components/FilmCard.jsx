import "./FilmCard.css";

function FilmCard({ movie, onMovieSelected }) {
  return (
    <div className="film-card" onClick={() => onMovieSelected(movie)}>
      <img
        className="film-poster"
        src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
      />
      <div className="film-details">
        <h2 className="film-title">{movie.title}</h2>
        {movie.releaseDate && (
          <p className="film-year">({movie.releaseDate.slice(0, 4)})</p>
        )}
        <p className="film-description">{movie.description}</p>
      </div>
    </div>
  );
}

export default FilmCard;
