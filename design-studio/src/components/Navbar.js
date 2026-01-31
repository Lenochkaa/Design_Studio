import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log("Menu state:", isOpen);
    
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; 
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleLinkClick();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Design Empire</h1>

        <div className="burger-menu" onClick={toggleMenu}>
          <div className={`line line1 ${isOpen ? "active" : ""}`}></div>
          <div className={`line line2 ${isOpen ? "active" : ""}`}></div>
          <div className={`line line3 ${isOpen ? "active" : ""}`}></div>
        </div>

        <div className={`menu-links ${isOpen ? "active" : ""}`}>
          <Link
            to="/"
            className={`menu-item ${activeLink === "/" ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`menu-item ${activeLink === "/about" ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            About Us
          </Link>

          <Link
            to="/portfolio"
            className={`menu-item ${activeLink === "/portfolio" ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            Portfolio
          </Link>
          <Link
            to="/feedback"
            className={`menu-item ${activeLink === "/feedback" ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            Reviews
          </Link>
          <Link
            to="/contact"
            className={`menu-item ${activeLink === "/contact" ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            Contacts
          </Link>

          {!auth?.token ? (
            <Link
              to="/login"
              className={`menu-item ${activeLink === "/login" ? "active" : ""}`}
              onClick={handleLinkClick}
            >
              Login
            </Link>
          ) : (
            <Link
              to={auth.role === "admin" ? "/admin-dashboard" : "/client-dashboard"}
              className={`menu-item ${
                activeLink === "/client-dashboard" || activeLink === "/admin-dashboard"
                  ? "active"
                  : ""
              }`}
              onClick={handleLinkClick}
            >
              Profile
            </Link>
          )}


        </div>
      </div>
    </nav>
  );
}

export default Navbar;
