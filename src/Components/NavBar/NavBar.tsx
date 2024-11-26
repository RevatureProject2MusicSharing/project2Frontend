import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext/AppContext';
import { GiPokerHand } from "react-icons/gi";
import { motion } from 'motion/react';

const Navbar: React.FC = () => {
  const context = useAppContext();
  const navigate = useNavigate();
  return (
    <>
    {context.isLoggedIn ? (
    <div className="navbar">
      {/* Company Name/Logo */}
      <div  className="navbar__logo">
       <motion.div
       whileHover={{ scale: 1.1 }}
       whileTap={{ scale: 0.9 }}
       transition={{ type: "spring", stiffness: 400, damping: 10 }}>
       <GiPokerHand onClick={() => {navigate("/")}} id="icon" />
       </motion.div>
       
      </div>

      {/* Navigation Buttons */}
      <div className="navbar__buttons">
        <button onClick={() => navigate("/playlists")} className="navbar__button">Playlists</button>
        <button onClick={() => navigate("/songs")} className="navbar__button">Songs</button>
        <button onClick={() => navigate("/users")} className="navbar__button">Users</button>
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