import { useState } from "react";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState("");

  async function checkApi() {
    const response = await fetch(
      "https://movie-journal-o7uq.onrender.com/healthcheck",
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <button onClick={checkApi}>Check API</button>
      <Login setToken={setToken} />
    </>
  );
}

export default App;
