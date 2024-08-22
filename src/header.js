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
            
            <NavLink  to="/previous-week" 
                className="navbar__menu"
                onClick={() => handleButtonClick('previous-week')} >
                  <button className={activeButton === 'previous-week' ? 'active' : ''}>📅 15 - 19 Aug.</button>
            </NavLink>
            

            
            <NavLink  to="/" 
                className="navbar__menu"
                onClick={() => handleButtonClick('current-week')}>
                  <button className={activeButton === 'current-week' ? 'active' : ''}>📅 23 - 26 Aug.</button>
            </NavLink>
            
        </div>
    )
        
    
}

export default TopMenu;
