import React, {useState} from "react";
import { NavLink } from 'react-router-dom';
import './App.css';


function TopMenu () {
const [activeButton, setActiveButton] = useState(null);

    const handleToTop = () => {
        window.scrollTo(0, 0); // Scroll to top
    };

    const handleButtonClick = (button) => {
        setActiveButton(button);
        handleToTop();
    };

    return (
        <div className="top_header">
            
            <NavLink  to="/30-1_sept" 
                className="navbar__menu"
                onClick={() => handleButtonClick('old-week')}>
                  <button className={activeButton === 'old-week' ? 'active' : ''}>📅30 Aug - 1 Sept.</button>
            </NavLink>
            <NavLink  to="/13-16_sept" 
                className="navbar__menu"
                onClick={() => handleButtonClick('previous-week')}>
                  <button className={activeButton === 'previous-week' ? 'active' : ''}>📅13 - 16 Sept.</button>
            </NavLink>

            <NavLink  to="/20-23_sept" 
                className="navbar__menu"
                onClick={() => handleButtonClick('current-week')}>
                  <button className={activeButton === 'current-week' ? 'active' : ''}>📅20 - 23 Sept.</button>
            </NavLink>
            
            
        </div>
    )
        
    
}

export default TopMenu;
