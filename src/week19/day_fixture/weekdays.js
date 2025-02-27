import React, { useEffect, useState } from 'react';
import './../../App.css';

function WeekdaysFixtures({ setContent }) {
    const [fixtures, setFixtures] = useState({
        friday: [],
        saturday: [],
        sunday: []
    });
    const [activeItem, setActiveItem] = useState(null);

    const urls = [
        'https://bunmi2020.github.io/bnf_data/week_thirteen/serie_a.json',
        'https://bunmi2020.github.io/bnf_data/week_thirteen/pl.json',
        'https://bunmi2020.github.io/bnf_data/week_thirteen/bundesliga.json'
    ];

    useEffect(() => {
        const fetchAllFixtures = async () => {
            try {
                const allData = await Promise.all(
                    urls.map(url => fetch(url).then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    }))
                );

                // Combine data from all sources
                const allFixtures = allData.flat();

                // Categorize fixtures by day
                const categorizedFixtures = {
                    tuesday: [],
                    wednesday: [],
                    thursday: []
                };

                allFixtures.forEach(match => {
                    const day = match.day?.toLowerCase();
                    if (day === 'tuesday') {
                        categorizedFixtures.friday.push(match);
                    } else if (day === 'wednesday') {
                        categorizedFixtures.saturday.push(match);
                    } else if (day === 'thursday') {
                        categorizedFixtures.sunday.push(match);
                    } 
                });

                setFixtures(categorizedFixtures);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllFixtures();
    }, []);

    const handleItemClick = (item) => {
        setContent(item);
        setActiveItem(item.fixture);
        window.scrollTo(0, 0);
    };

    return (
        <div>
            {Object.keys(fixtures).map(day => (
                <div key={day} id={`${day}_menu`} className="days_menu">
                    <h5 id={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)} 
                    </h5>
                    <ul className="all_fixtures">
                        {fixtures[day].map((match, index) => (
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
            ))}
        </div>
    );
}

export default WeekdaysFixtures;
