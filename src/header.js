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
      
      <NavLink  to="/4-7_Oct" 
          className="navbar__menu"
          onClick={() => handleButtonClick('oldest-week')}>
            <button className={activeButton === 'oldest-week' ? 'active' : ''}>4-7 Oct.</button>
      </NavLink>
      <NavLink  to="/18-21_Oct" 
          className="navbar__menu"
          onClick={() => handleButtonClick('old-week')}>
            <button className={activeButton === 'old-week' ? 'active' : ''}>18-21 Oct.</button>
      </NavLink>
      <NavLink  to="/25-28_Oct" 
          className="navbar__menu"
          onClick={() => handleButtonClick('previous-week')}>
            <button className={activeButton === 'previous-week' ? 'active' : ''}>25-28 Oct.</button>
      </NavLink>
      <NavLink  to="/01-04_Nov" 
          className="navbar__menu"
          onClick={() => handleButtonClick('last-week')}>
            <button className={activeButton === 'last-week' ? 'active' : ''}>01-04 Nov.</button>
      </NavLink>
      <NavLink  to="/08-10_Nov" 
          className="navbar__menu"
          onClick={() => handleButtonClick('current-week')}>
            <button className={activeButton === 'current-week' ? 'active' : ''}>08-10 Nov.</button>
      </NavLink>
      
    </div>
  );
}

export default TopMenu;
