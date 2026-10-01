import { useEffect, useState } from "react";

function AddMovie({ token, onMovieAdded, selectedMovie }) {
  const [tmdbId, setTmdbId] = useState(0);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
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
          status,
          personalRating,
          journal,
        }),
      },
    );

    const data = await response.json();

    console.log("Add movie response:", response.status, data);

    if (response.ok) {
      onMovieAdded();
    }
  }
  return (
    <form onSubmit={handleAddMovie}>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Status
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </label>
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
  );
}

export default AddMovie;
