function Logout({ setToken }) {
  function handleLogout() {
    setToken("");
  }

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
