import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub Logo"
        />
        <h3>GitHub</h3>
      </Link>

      <div className="navbar-links">
        <Link
          to="/create"
          className={location.pathname === "/create" ? "active" : ""}
        >
          Create a Repository
        </Link>
        <Link
          to="/profile"
          className={location.pathname === "/profile" ? "active" : ""}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;