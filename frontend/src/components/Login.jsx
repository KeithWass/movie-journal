import { useState } from "react";
import "./Login.css";

function Login({ setToken, setUsername, onClose, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch(
      "https://movie-journal-o7uq.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      },
    );

    const data = await response.json();
    setToken(data.token);

    const payload = JSON.parse(atob(data.token.split(".")[1]));

    setUsername(payload.username);
    console.log(payload.username);

    onClose();
    console.log(data);
  }
  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button className="modal-close" type="button" onClick={onClose}>
          x
        </button>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="login-button" type="submit">
            Login
          </button>
          <p className="signup-prompt">
            New to DFD?{" "}
            <button type="button" className="signup-link" onClick={onSignup}>
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
