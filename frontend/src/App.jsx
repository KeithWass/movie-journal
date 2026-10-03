import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Logout from "./components/Logout";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import MovieSearch from "./components/MovieSearch";
import Header from "./components/Header";
import Signup from "./components/Signup";
import NotSureWhatToWatch from "./components/NotSureWhatToWatch";

function App() {
  const [token, setToken] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [username, setUsername] = useState("");

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
      <Header
        onLogin={() => setLoginOpen(true)}
        token={token}
        setToken={setToken}
        username={username}
      />

      {loginOpen && (
        <Login
          setToken={setToken}
          setUsername={setUsername}
          onClose={() => setLoginOpen(false)}
          onSignup={() => {
            setLoginOpen(false);
            setSignupOpen(true);
          }}
        />
      )}

      {signupOpen && <Signup onClose={() => setSignupOpen(false)} />}

      <MovieSearch onMovieSelected={setSelectedMovie} />

      {token && (
        <div>
          <NotSureWhatToWatch movies={movies} />

          <MovieList movies={movies} />

          <AddMovie
            token={token}
            onMovieAdded={getMovies}
            selectedMovie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        </div>
      )}
    </>
  );
}

export default App;
