import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Logout from "./components/Logout";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import MovieSearch from "./components/MovieSearch";
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  useEffect(() => {
    if (token) {
      getMovies();
    }
  }, [token]);

  return (
    <>
      <Header />

      {!token && <Login setToken={setToken} />}

      <MovieSearch onMovieSelected={setSelectedMovie} />

      {token && (
        <div>
          <Logout setToken={setToken} />
          <MovieList movies={movies} />
          <AddMovie
            token={token}
            onMovieAdded={getMovies}
            selectedMovie={selectedMovie}
          />
        </div>
      )}
    </>
  );
}

export default App;
