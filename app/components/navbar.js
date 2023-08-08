import React from 'react';
import styles from './navbar.css';

const NavBar = () => {
  return (
    <div className="navBar">
      <nav className="navMenu">
        <a href="#">Home</a>
        <a href="#">Profil</a>
        <a href="#">About</a>
        <div className="dot"></div>
      </nav>
    </div>
  )
}

export default NavBar;