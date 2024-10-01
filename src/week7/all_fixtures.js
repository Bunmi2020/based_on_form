import React, { useState } from 'react';

function AllFixtures({ fixtures, setContent }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFixtures = fixtures.filter(fixture =>
        fixture.fixture.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFixtureClick = (fixture) => {
        setContent(fixture);
        setSearchTerm(''); // Optional: Clear the search after selection
    };

    return (
        <div className="search-bar">
           <h3>Welcome to Based on Form!</h3>
            <h5>Your Ultimate Football Betting Companion</h5>
            
            <p className='highlight_p'>Ready to elevate your betting game? Simply search or select a fixture to access match-specific betting insights and predictions.</p>
            
                    <ul className="all_fixtures">
                        {filteredFixtures.map((fixture, index) => (
                            <li
                                key={index}
                                onClick={() => handleFixtureClick(fixture)}
                                className="search-result-item"
                            >
                                {fixture.fixture}
                            </li>
                        ))}
                    </ul>
                
           
        </div>
    );
}

export default AllFixtures;