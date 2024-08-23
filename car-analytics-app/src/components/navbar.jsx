import React from 'react';
import { Link } from 'react-router-dom';
import './stylesheets/navbar.css'; // Create and style this CSS file as needed

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/highlight">Highlighted Cars</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;