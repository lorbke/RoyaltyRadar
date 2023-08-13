import React from 'react';
import Link from 'next/link';
import './navbar.css';

const NavBar = () => {
  return (
    <div className="navBar">
      <nav className="navMenu">
        <Link href="../">Home</Link>
        <Link href="../about/">About</Link>
        <div className="dot"></div>
      </nav>
    </div>
    
  )
}

export default NavBar;