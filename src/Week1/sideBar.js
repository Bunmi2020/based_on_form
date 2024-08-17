import React, { useEffect, useState } from 'react';
import '../App.css';
import AdSenseComponent from '../AdSense ';

function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState(''); // State for the name

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL_SIDEBAR;

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
      const topTenPicks = data[0].top_ten_picks; // Accessing the top_ten_picks object
      const formattedMenuItems = Object.values(topTenPicks).map((match, index) => ({
        matchLabel: match[0],
        matchDetail: match[1],
      }));
      setMenuItems(formattedMenuItems);

      const fetchedName = data[0].name; // Accessing the name
      setName(fetchedName); // Setting the name in state
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return ( 
    <div id="Side_bar">
      <h3>{name}'s Top Ten Picks</h3> 
      <AdSenseComponent />
      <ul className="top_picks">
        {menuItems.map((match, index) => (
          <li key={index}>
            {match.matchLabel}: 
            <br></br>
            <i className='bold'>{match.matchDetail}</i> 
          </li>
        ))}
      </ul>
      <AdSenseComponent />
    </div>
  );
}

export default Sidebar;
