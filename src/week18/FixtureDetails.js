import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Corners from '../Content/corners';
import Goals from '../Content/goals';
import Cards from '../Content/cards';
import WinOrDraw from '../Content/win_or_draw';
import SearchBar from './search';
import { HashLink } from 'react-router-hash-link';
import '../App.css';
import './Home.css';

function FixtureDetails() {
    const { fixtureSlug } = useParams();
    const [fixtureData, setFixtureData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeComponent, setActiveComponent] = useState('corners'); // Default active tab
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // List of fixture sources
    const urls = [
        'https://bunmi2020.github.io/bnf_data/week_eighteen/serie_a.json',
        'https://bunmi2020.github.io/bnf_data/week_eighteen/ligue_1.json',
        'https://bunmi2020.github.io/bnf_data/week_eighteen/bundesliga.json',
        'https://bunmi2020.github.io/bnf_data/week_eighteen/la_liga.json',
        'https://bunmi2020.github.io/bnf_data/week_eighteen/pl.json'
    ];

    useEffect(() => {
        const fetchFixtures = async () => {
            try {
                const responses = await Promise.all(urls.map(url => fetch(url)));
                const data = await Promise.all(responses.map(response => response.json()));

                // Flatten data from all sources
                const allFixtures = data.flat();

                // Find the matching fixture
                const match = allFixtures.find(fixture =>
                    encodeURIComponent(fixture.fixture.replace(/\s+/g, '-').toLowerCase()) === fixtureSlug
                );

                setFixtureData(match || null);
            } catch (error) {
                console.error('Error fetching fixtures:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFixtures();
    }, [fixtureSlug]);

    const closePopup = () => {
        setIsPopupOpen(false);
        setFixtureData(null); // Ensure default content comes back
    };
    
    function handleReload(url) {
        window.location.href = url;
        window.scrollTo(0, 0);
    }

    return (
        <div className="fixture-container">
            {loading ? (
                <p>Loading fixture details...</p>
            ) : fixtureData ? (
                <div className='content' id='main'>
                    <div className='content_header'>
                        {/* Pass fixtureData as an array to SearchBar to prevent errors */}
                        <SearchBar fixtures={fixtureData ? [fixtureData] : []} setContent={setFixtureData} id='search'/>
                        <button title='close this fixture tab' className="close-btn" onClick={closePopup}>
                            Close fixture
                        </button>
                    </div>

                    <ul className="content-menu"
                        style={{
                            position: isScrollingUp ? 'sticky' : 'relative',
                            top: isScrollingUp ? '5%' : 'auto',
                            transition: 'top 0.5s ease-in',
                        }}
                    >
                        <li className={activeComponent === 'corners' ? 'active' : ''} onClick={() => setActiveComponent('corners')}>Corners</li>
                        <li className={activeComponent === 'goals' ? 'active' : ''} onClick={() => setActiveComponent('goals')}>Goals</li>
                        <li className={activeComponent === 'cards' ? 'active' : ''} onClick={() => setActiveComponent('cards')}>Cards</li>
                        <li className={activeComponent === 'win_or_draw' ? 'active' : ''} onClick={() => setActiveComponent('win_or_draw')}>Win/Draw</li>
                    </ul>

                    <div className='content_body'>
                        {activeComponent === 'corners' && <Corners content={fixtureData} />}
                        {activeComponent === 'cards' && <Cards content={fixtureData} />}
                        {activeComponent === 'goals' && <Goals content={fixtureData} />}
                        {activeComponent === 'win_or_draw' && <WinOrDraw content={fixtureData} />}
                    </div>

                    <HashLink smooth to="/#prediction">
                        <span style={{
                            width: '4.5em', 
                            display: isVisible ? 'none' : 'flex', 
                            position: 'fixed',
                            flexDirection: 'column',
                            justifyContent: 'center', 
                            zIndex: 9, 
                            boxShadow: '3px, 2px, gray',
                            bottom: '0%',
                            background: 'linear-gradient(90deg, var(--highlight-color), red)',
                            borderRadius: '10px',
                            className:'prediction_button',
                            right: '0%',
                            fontSize: '17px',
                            cursor: 'pointer',
                            color: 'white',
                            margin: '1em 0.5em',
                            padding: '0.5em 1em'
                        }}>
                            Check Prediction
                        </span>
                    </HashLink>
                </div>
            ) : (
                <p>Fixture not found.</p>
            )}
        </div>
    );
}

export default FixtureDetails;
