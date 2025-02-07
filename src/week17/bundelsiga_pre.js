import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Home.css';

import Cards from '../Content/cards';
import Corners from '../Content/corners';
import Goals from '../Content/goals';
import WinOrDraw from '../Content/win_or_draw';
import { HashLink } from 'react-router-hash-link';

function BundesligaPredictions() {
    const [fixtures, setFixtures] = useState({
        friday: [],
        saturday: [],
        sunday: [],
        monday: []
    });
    const [activeItem, setActiveItem] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null); // State for popup content
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
    const [activeComponent, setActiveComponent] = useState('corners'); // State to track active component
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [content, setContent] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    const urls = ['https://bunmi2020.github.io/bnf_data/week_seventeen/bundesliga.json'];
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
                    friday: [],
                    saturday: [],
                    sunday: [],
                    monday: []
                };

                allFixtures.forEach(match => {
                    const day = match.day?.toLowerCase();
                    if (day === 'friday') {
                        categorizedFixtures.friday.push(match);
                    } else if (day === 'saturday') {
                        categorizedFixtures.saturday.push(match);
                    } else if (day === 'sunday') {
                        categorizedFixtures.sunday.push(match);
                    } else if (day === 'monday') {
                        categorizedFixtures.monday.push(match);
                    }
                });

                setFixtures(categorizedFixtures);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllFixtures();
    }, [urls]);

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

       useEffect(() => {
          const handleScroll = () => {
            const shouldShowButton = window.pageYOffset < 20 || window.pageYOffset > 900; // change this number as needed
            setIsVisible(shouldShowButton);
          };
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);

    const handleItemClick = (item) => {
        setContent(item);
        setActiveItem(item.id);
        setActiveItem(item.fixture);
        setIsPopupOpen(true); // Open the popup
        navigate(`/fixtures/${item.id}`); // Generate URL dynamically
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedContent(null);
        navigate('/'); // Reset URL when popup closes
    };

    return (
        <div>
            {Object.keys(fixtures).map(day => (
                <div key={day} id={`${day}_menu`} className="days_menu">
                    
                    <div className="all_fixtures">
                        {fixtures[day].map((match, index) => (
                            <div>
                            <li
                                key={index}
                                onClick={() => handleItemClick(match)}
                                id={`${match.fixture}`}
                                className={activeItem === match.fixture ? 'active' : ''}
                            >
                                {match.fixture}
                                
                               
                            </li>
                            <div className="prediction"  id ="prediction">
                                
                                    <div className='prediction_list'>
                                        <pre><b>Halftime Cards:</b> {match.prediction?.cards?.ht || 'N/A'}</pre>
                                        <hr/>
                                        <pre><b>Fulltime Cards:</b> {match.prediction?.cards?.ft || 'N/A'}</pre>
                                        <hr/>
                                    </div>
                                    <div className='prediction_list'>
                                        <pre><b>FT Total Corners:</b> {match.prediction?.corners.full_time_total_corners || 'N/A'}</pre>
                                        <hr/>
                                        <pre><b>Most Corners:</b> {match.prediction?.corners.win_corners || 'N/A'}</pre>
                                        <hr/>
                                    </div>
                                    <div className='prediction_list'>
                                        <pre><b>BTS/GG:</b> {match.prediction?.goals.Both_teams_to_score || 'N/A'}</pre>
                                        <hr/>
                                        <pre><b>FT Total Goals:</b> {match.prediction?.goals.fulltime_total_goals || 'N/A'}</pre>
                                        <hr/>
                                    </div>
                                    <div className='prediction_list'>
                                        <pre>{match.prediction?.win_draw.win_or_draw || 'N/A'}</pre>
                                        <hr/>
                                    </div>
                                </div>

                            </div>
                        ))}

                        {isPopupOpen && selectedContent && (
                            <div className='content' id='main'>
                            <button className="close-btn" onClick={closePopup}>X</button>
            
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
                                {activeComponent === 'corners' && <Corners content={content} />}
                                {activeComponent === 'cards' && <Cards content={content} />}
                                {activeComponent === 'goals' && <Goals content={content} />}
                                {activeComponent === 'win_or_draw' && <WinOrDraw content={content} />}
                                </div>
                                <HashLink smooth to="/#prediction"><span style={{ width: '4.5em', display: isVisible ? 'none' : 'flex', position: 'fixed',flexDirection: 'column',justifyContent: 'center', zIndex: 9, boxShadow: '3px, 2px, gray',
                                                bottom: '0%',
                                                background: 'linear-gradient(90deg, var(--highlight-color), red)',
                                                borderRadius: '10px',
                                                className:'prediction_button',
                                                right: '0%',
                                                fontSize: '17px',
                                                cursor: 'pointer',
                                                color: 'white',
                                                margin: '1em 0.5em',
                                                padding: '0.5em 1em'}}>Check Prediction</span></HashLink>

                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BundesligaPredictions;
