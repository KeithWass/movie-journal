import { useState } from "react";
import "./Header.css";
import Logout from "./Logout";

function Header({ onLogin, token, setToken }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="brand">
        <h1>DFD</h1>
        <p>Digital Film Dossier</p>
      </div>

      {token ? (
        <>
          <button
            className="user-initial"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            K
          </button>

          {token && menuOpen && (
            <div className="account-menu">
              <p>Keith</p>
              <button>My Dossier</button>
              <button>Account</button>
              <Logout
                setToken={setToken}
                closeMenu={() => setMenuOpen(false)}
              />
            </div>
          )}
        </>
      ) : (
        <button className="login-link" onClick={onLogin}>
          Login
        </button>
      )}
    </header>
  );
}

export default Header;
