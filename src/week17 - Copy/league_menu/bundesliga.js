import React, { useEffect, useState } from 'react';
import './../../App.css';
import up from './../../media/drop-up.png';
import down from './../../media/drop-down.png';
import { useNavigate } from 'react-router-dom';

function BundesligaMenu({ setContent }) {
    const [menuItems, setMenuItems] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [arrow, setArrow] = useState(down);
    const navigate = useNavigate(); // Hook to programmatically navigate
    
    useEffect(() => {
        
        const apiUrl = 'https://bunmi2020.github.io/bnf_data/week_sixteen/bundesliga.json';

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

    const toggleDropdown = () => { 
        setDropdownVisible(!isDropdownVisible);
        setArrow(isDropdownVisible ? down : up); // Toggle arrow direction
    };

    const handleItemClick = (item) => {
        const fixtureSlug = encodeURIComponent(item.fixture.replace(/\s+/g, '-').toLowerCase()); 
        navigate(`/fixture/${fixtureSlug}`); // Navigate to fixture permalink
        setContent(item);
        setActiveItem(item.fixture);
    };

    return (
        <div id="League_menu" className="League_menu">
            <li id='league' className='League_menu' onClick={toggleDropdown}>
                Bundesliga <img src={arrow} alt="Menu" style={{ width: '20px', margin: 'auto 10px', padding: '5px', float: 'right'}} />
            </li>
            {isDropdownVisible && (
                <ul className="dropdown_menu">
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
            )}
        </div>
    );
}

export default BundesligaMenu;
