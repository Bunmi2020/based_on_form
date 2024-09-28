import React, { useEffect, useState } from 'react';
import './../../App.css';

function Monday ({ setContent }) {
    const [menuItems, setMenuItems] = useState([]);
    const [activeItem, setActiveItem] = useState(null);
    
    
    useEffect(() => {
        
        const apiUrl = 'https://bunmi2020.github.io/bnf_data/week_six/days/monday.json';

        fetch(apiUrl, {
            method: 'GET',
            
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setMenuItems(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const handleItemClick = (item) => {
        setContent(item);
        setActiveItem(item.fixture);
        window.scrollTo(0, 0); 
    };

    return (
        <div id="days_menu" className="days_menu">
            <h5 id='Monday'>
                30/09 - Monday 
            </h5>
            <ul className="all_fixtures">
                        {menuItems.map((match, index) => (
                            <li
                            key={index}
                            onClick={() => handleItemClick(match)}
                            id={`${index}_name`}
                            className={activeItem === match.fixture ? 'active' : ''}
                        >
                            {match.fixture}
                        </li>
                        ))}
                    </ul>
        </div>
    );
}

export default Monday;
