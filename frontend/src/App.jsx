import { useState } from "react";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState("");
  const [movies, setMovies] = useState([]);

  async function checkApi() {
    const response = await fetch(
      "https://movie-journal-o7uq.onrender.com/healthcheck",
    );
    const data = await response.json();
    console.log(data);
  }

  async function getMovies() {
    const response = await fetch(
      "https://movie-journal-o7uq.onrender.com/movies",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    setMovies(data);
  }

  return (
    <>
      <button onClick={checkApi}>Check API</button>

      {!token && <Login setToken={setToken} />}

      {token && (
        <div>
          <button onClick={getMovies}>Get Movies</button>
          {movies.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
