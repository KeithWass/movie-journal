import "./App.css";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  async function checkApi() {
    const response = await fetch(
      "https://movie-journal-production.up.railway.app/healthcheck",
    );
    const data = await response.json();
    console.log(data);
  }

  async function handleLogin() {
    const response = await fetch(
      "https://movie-journal-production.up.railway.app/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      },
    );
    const data = await response.json();
    setToken(data.token);
    console.log(data);
  }

  function handleRegister() {}
  return (
    <>
      <button onClick={checkApi}>Check API</button>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </form>
    </>
  );
}

export default App;
