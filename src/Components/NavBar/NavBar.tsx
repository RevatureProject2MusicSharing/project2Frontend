import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext/AppContext';

const Navbar: React.FC = () => {
  const context = useAppContext();
  const navigate = useNavigate();
  return (
    <>
    {context.isLoggedIn ? (
    <div className="navbar">
      {/* Company Name/Logo */}
      <div className="navbar__logo">
        <h1>CompanyLogo</h1>
      </div>

      {/* Navigation Buttons */}
      <div className="navbar__buttons">
        <button className="navbar__button">Playlists</button>
        <button onClick={() => navigate("/songs")} className="navbar__button">Songs</button>
        <button className="navbar__button">Users</button>
      </div>

      {/* Logout Button */}
      <div className="navbar__logout">
        <button onClick={() => {context.logout(); navigate("/login");}} className="navbar__button logout">Logout</button>
      </div>
    </div>) : null}
  </>
  );
};

export default Navbar;