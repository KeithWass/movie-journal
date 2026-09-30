function FilmCard({ movie }) {
  console.log(movie);

  return (
    <div className="film-card">
      <img
        className="film-poster"
        src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
      />
      <div className="film-details">
        <h2 className="film-title">{movie.title}</h2>
        <p className="film-description">{movie.description}</p>
      </div>
    </div>
  );
}

export default FilmCard;
