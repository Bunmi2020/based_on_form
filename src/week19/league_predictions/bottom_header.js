import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../Home.css';

import './style.css';
import { NavLink } from 'react-router-dom';

function BottomHeader() {

const [isScrollingUp, setIsScrollingUp] = useState(true);
const [prevScrollPos, setPrevScrollPos] = useState(0);
        
        
          useEffect(() => {
            const handleScroll = () => {
              const currentScrollPos = window.pageYOffset;
              setIsScrollingUp(prevScrollPos > currentScrollPos);
              setPrevScrollPos(currentScrollPos);
            };
        
            window.addEventListener('scroll', handleScroll);
            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
          }, [prevScrollPos]);
    
          const handleToTop = () => {
            window.scrollTo(0, 0); // Scroll to top
           
          };

        

    return (
        <header 
            style={{
                flexDirection: 'row',
                display: 'flex',
                position: isScrollingUp ? 'sticky' : 'relative',
                top: isScrollingUp ? '0' : 'auto',
                transition: 'top 0.5s ease-in',
            }}
            className="bottom_header"
        >
            <li style={{ margin: 'auto', cursor: 'pointer' }}>
                <NavLink to="/serie_a_predictions_week_26" className="navbar__a" onClick={handleToTop}>
                    Serie A Predictions
                    </NavLink>
                </li>
                <li style={{ margin: 'auto', cursor: 'pointer' }}>
                    <NavLink to="/pl_predictions_week_26" className="navbar__a" onClick={handleToTop}>
                    Premier League Predictions
                    </NavLink>
                </li>
                <li style={{ margin: 'auto', cursor: 'pointer' }}>
                    <NavLink to="/laliga_predictions_week_25" className="navbar__a" onClick={handleToTop}>
                    La Liga Predictions
                    </NavLink>
                </li>
                <li style={{ margin: 'auto', cursor: 'pointer' }}>
                    <NavLink to="/ligue_1_predictions_week_23" className="navbar__a" onClick={handleToTop}>
                    Ligue One Predictions
                    </NavLink>
                </li>
                <li style={{ margin: 'auto', cursor: 'pointer' }}>
                    <NavLink to="/bundesliga_predictions_week_23" className="navbar__a" onClick={handleToTop}>
                    Bundesliga Predictions
                    </NavLink>
                </li>
        </header>
    );
}


export default BottomHeader;
