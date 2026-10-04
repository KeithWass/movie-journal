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
import TrendingMovies from "./components/TrendingMovies";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [token, setToken] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  function handleSignupSuccess(username) {
    setSignupMessage(`Account created successfully. Welcome, ${username}`);

    setTimeout(() => {
      setSignupMessage("");
    }, 3000);
  }

  async function checkApi() {
    const response = await fetch(`${API_URL}/healthcheck`);
    const data = await response.json();
    console.log(data);
  }

  async function getMovies() {
    const response = await fetch(`${API_URL}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

      {signupMessage && <div className="signup-success">{signupMessage}</div>}

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

      {signupOpen && (
        <Signup
          onClose={() => setSignupOpen(false)}
          setToken={setToken}
          setUsername={setUsername}
          onSignupSuccess={handleSignupSuccess}
        />
      )}

      <MovieSearch onMovieSelected={setSelectedMovie} />

      <TrendingMovies onMovieSelected={setSelectedMovie} />

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
