import { useEffect, useState } from "react";
import "./AddMovie.css";

function AddMovie({ token, onMovieAdded, selectedMovie, onClose }) {
  const [tmdbId, setTmdbId] = useState(0);
  const [title, setTitle] = useState("");
  const [watched, setWatched] = useState("");
  const [personalRating, setPersonalRating] = useState(0);
  const [journal, setJournal] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  useEffect(() => {
    if (selectedMovie) {
      setTmdbId(selectedMovie.id);
      setTitle(selectedMovie.title);
      setPosterPath(selectedMovie.posterPath);
      setReleaseDate(selectedMovie.releaseDate);
    }
  }, [selectedMovie]);

  async function handleAddMovie(e) {
    e.preventDefault();
    const response = await fetch(
      "https://movie-journal-o7uq.onrender.com/movies",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tmdbId,
          title,
          releaseDate,
          posterPath,
          watched,
          personalRating,
          journal,
        }),
      },
    );

    const data = await response.json();

    console.log("Add movie response:", response.status, data);

    if (response.ok) {
      onMovieAdded();
      onClose();
    }
  }

  if (!selectedMovie) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="add-movie-modal">
        <button className="modal-close" type="button" onClick={onClose}>
          x
        </button>

        <h2>Add to Dossier</h2>

        <div className="selected-film">
          <img
            src={`https://image.tmdb.org/t/p/w200${posterPath}`}
            alt={title}
          />

          <div>
            <h3>{title}</h3>
            {releaseDate && <p>{releaseDate.slice(0, 4)}</p>}
          </div>
        </div>

        <form onSubmit={handleAddMovie}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <div className="watched-control">
            <p>Have you watched it?</p>

            <div className="watched-options">
              <button
                type="button"
                className={!watched ? "selected" : ""}
                onClick={() => setWatched(false)}
              >
                Not watched
              </button>

              <button
                type="button"
                className={watched ? "selected" : ""}
                onClick={() => setWatched(true)}
              >
                Watched
              </button>
            </div>
          </div>

          <label>
            Personal Rating
            <input
              type="number"
              value={personalRating}
              onChange={(e) => setPersonalRating(Number(e.target.value))}
            />
          </label>
          <label>
            Journal
            <textarea
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
            />
          </label>
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
