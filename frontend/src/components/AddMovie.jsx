import { useState } from "react";

function AddMovie({ token }) {
  const [tmdbId, setTmdbId] = useState(0);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [personalRating, setPersonalRating] = useState(0);
  const [journal, setJournal] = useState("");

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
          status,
          personalRating,
          journal,
        }),
      },
    );

    const data = await response.json();
    console.log(data);
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
