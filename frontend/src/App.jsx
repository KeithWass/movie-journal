import "./App.css";

function App() {
  async function checkApi() {
    const response = await fetch(
      "https://movie-journal-production.up.railway.app/healthcheck",
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <button onClick={checkApi}>Check API</button>
    </>
  );
}

export default App;
