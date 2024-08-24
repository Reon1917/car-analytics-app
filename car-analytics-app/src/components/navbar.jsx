import React from 'react';
import { NavLink } from 'react-router-dom';
import './stylesheets/navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/highlighted" activeClassName="active-link">
            Highlighted Cars
          </NavLink>
        </li>
      </ul>
      <div className="animation-bar"></div>
    </nav>
  );
};

export default NavBar;