import React, { useState } from 'react';

function SearchBar({ fixtures, setContent }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredFixtures = fixtures.filter(fixture =>
        fixture.fixture.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFixtureClick = (fixture) => {
        setContent(fixture);
        setSearchTerm(''); // Optional: Clear the search after selection
    };

    return (
        <div className="search-bar" id='search'>
            <input
                type="text"
                placeholder="Search fixtures..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ minWidth: '300px', maxWidth: '360px', padding: '10px', marginBottom: '0px', borderRadius: '10px' }}
            />
            {searchTerm ? (
                filteredFixtures.length > 0 ? (
                    <ul className="search-results">
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
                ) : (
                    <p>No fixtures found</p>
                )
            ) : null}
           
        </div>
    );
}

export default SearchBar;
