import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">🏫 SchoolApp</h2>
      <div className="nav-links">
        <Link to="/add">Add School</Link>
        <Link to="/show">Schools list</Link>
      </div>
    </nav>
  );
};

export default Navbar;
