import React from 'react';
import { Link } from 'react-router-dom';
import searchIcon from './pictures/search-icon.svg';
import './styles/Navbar.css';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="nav">
        <ul className="ul">
          <li className="li">
            <Link to="/" className="link"> Home </Link>
          </li>
          <li className="li">
            <Link to="/about" className="link"> About </Link>
          </li>
          <li className="dropdown">
            <Link to="/homeworks" className="dropbtn"> Homeworks </Link>
            <div className="dropdown-content">
              <Link to="/homework1">Homework 1</Link>
              <Link to="/homework2">Homework 2</Link>
            </div>
          </li>
        </ul>
        <img src={searchIcon} alt="Search Icon" className="search-icon" />
      </nav>
    );
  }
}

export default Navbar;


/* Замените содержимое тега svg на содержимое файла search.svg 
<svg
  xmlns="<URL>"
  viewBox="0 0 24 24"
  width="24"
  height="24"
  className="search-icon"
>
  <path d="<URL>" />
</svg>*/