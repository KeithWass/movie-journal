function Logout({ setToken, closeMenu }) {
  function handleLogout() {
    setToken("");
    closeMenu();
  }

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
