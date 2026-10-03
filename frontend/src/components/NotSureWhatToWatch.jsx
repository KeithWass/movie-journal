import { useState } from "react";
import "./NotSureWhatToWatch.css";

function NotSureWhatToWatch({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  function chooseMovie() {
    const unwatchedMovies = movies.filter((movie) => !movie.watched);

    if (unwatchedMovies.length === 0) {
      setSelectedMovie(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * unwatchedMovies.length);

    setSelectedMovie(unwatchedMovies[randomIndex]);
  }

  return (
    <section className="watch-suggestion">
      <div className="watch-suggestion-header">
        <h2>Not sure what to watch?</h2>
        <p>Let your dossier decide.</p>
      </div>

      <button className="surprise-button" onClick={chooseMovie}>
        Surprise Me
      </button>

      {selectedMovie && (
        <div className="suggested-film">
          <img
            src={`https://image.tmdb.org/t/p/w200${selectedMovie.posterPath}`}
            alt={selectedMovie.title}
          />

          <div className="suggested-film-details">
            <p className="suggested-label">YOUR NEXT FILM</p>

            <h3>{selectedMovie.title}</h3>

            {selectedMovie.releaseDate && (
              <p className="suggested-year">
                {selectedMovie.releaseDate.slice(0, 4)}
              </p>
            )}

            <button className="another-button" onClick={chooseMovie}>
              Another film
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default NotSureWhatToWatch;
