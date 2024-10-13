import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="responsive-navbar">
      <div className="logo">
        <Link to="/">Event Management Platform</Link>
      </div>
      <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
      </div>
      <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default ResponsiveNavbar;
