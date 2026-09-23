import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Logout from "./components/Logout";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";

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
      {/* <button onClick={checkApi}>Check API</button> */}

      {!token && <Login setToken={setToken} />}

      {token && (
        <div>
          <button onClick={getMovies}>Get Movies</button>
          <Logout setToken={setToken} />
          <MovieList movies={movies} />
          <AddMovie token={token} />
        </div>
      )}
    </>
  );
}

export default App;
