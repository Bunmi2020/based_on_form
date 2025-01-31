import React, { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import './App.css';

function TopMenu () {
  const [activeButton, setActiveButton] = useState(null);
  const topMenuRef = useRef(null); // Ref to the menu for scrolling

  useEffect(() => {
    // Scroll to the rightmost position (current week) on load
    if (topMenuRef.current) {
      topMenuRef.current.scrollLeft = topMenuRef.current.scrollWidth;
    }
  }, []);

  const handleToTop = () => {
    window.scrollTo(0, 0); // Scroll to top
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
    handleToTop();
  };

  return (
    <div className="top_header" ref={topMenuRef}>
      
      
      <NavLink  to="/08-10_Nov" 
          className="navbar__menu"
          onClick={() => handleButtonClick('older-week')}>
            <button className={activeButton === 'older-week' ? 'active' : ''}>08-10 Nov.</button>
      </NavLink>
      <NavLink  to="/14-15_Jan" 
          className="navbar__menu"
          onClick={() => handleButtonClick('old-week')}>
            <button className={activeButton === 'old-week' ? 'active' : ''}>14-16 Jan.</button>
      </NavLink>
      <NavLink  to="/17-20_Jan" 
          className="navbar__menu"
          onClick={() => handleButtonClick('previous-week')}>
            <button className={activeButton === 'previous-week' ? 'active' : ''}>17-20 Jan.</button>
      </NavLink>
      <NavLink  to="/24-27_Jan" 
          className="navbar__menu"
          onClick={() => handleButtonClick('last-week')}>
            <button className={activeButton === 'last-week' ? 'active' : ''}>24-27 Jan.</button>
      </NavLink>
      <NavLink  to="/31-3_Feb" 
          className="navbar__menu"
          onClick={() => handleButtonClick('current-week')}>
            <button className={activeButton === 'current-week' ? 'active' : ''}>31-3 Feb.</button>
      </NavLink>
      
    </div>
  );
}

export default TopMenu;
