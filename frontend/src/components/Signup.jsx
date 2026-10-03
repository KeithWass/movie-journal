import { useState } from "react";

function Signup({ onClose, setToken, setUsername, onSignupSuccess }) {
  const [signupUsername, setSignupUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    const response = await fetch(
      "https://movie-journal-o7uq.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signupUsername,
          email,
          password,
        }),
      },
    );

    const data = await response.json();

    console.log("Signup response:", response.status, data);

    if (response.ok) {
      setToken(data.token);
      setUsername(data.user.username);
      onSignupSuccess(data.user.username);
      onClose();
    }
  }

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button className="modal-close" type="button" onClick={onClose}>
          x
        </button>

        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
          />

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

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
