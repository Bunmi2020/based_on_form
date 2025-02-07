import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Home.css';
import '../Content/content.css';
import ReactGA from 'react-ga4';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Cards from '../Content/cards';
import Corners from '../Content/corners';
import Goals from '../Content/goals';
import WinOrDraw from '../Content/win_or_draw';
import { auth } from '../week14/comment/firebaseConfig';
import AuthPre from '../week14/comment/Authpre';
import { HashLink } from 'react-router-hash-link';
function BundesligaPredictions() {

    ReactGA.send({
        hitType:"pageview",
        page:"/bundesliga_predictions",
        title:"Bundelsiga Predictions",
    });

    const [fixtures, setFixtures] = useState({
        friday: [],
        saturday: [],
        sunday: [],
        monday: []
    });
    
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

   
    const handleToTop = () => {
        window.scrollTo(0, 0); // Scroll to top
    };

    const [user, setUser] = useState(null);
        
          useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
              setUser(user);
            });
        
            return () => unsubscribe();
          }, []);
    
        if (!content) return null;

    return (
        <div>
        <Helmet>
            <title>Based on Form - FAQ | Football Prediction & Betting Tips</title>
            <meta name="description" content="Find answers to your questions about Based on Form's football prediction services, betting tips, and match analysis." />
            <meta name="keywords" content="football predictions, betting tips, football match analysis, sports betting FAQ, football betting insights" />
            <script id="hydro_config" type="text/javascript">
      {`
        window.Hydro_tagId = "829d3b89-0fc4-424c-8477-ee88eb2ed1aa";
      `}
        </script>
        <script type="text/javascript" async src="https://platform.foremedia.net/code/55519/analytics"></script>
        <script id="hydro_script" src="https://track.hydro.online/"></script>
        </Helmet>

        <header 
            style={{
                position: isScrollingUp ? 'sticky' : 'relative',
                top: isScrollingUp ? '0' : 'auto',
                transition: 'top 0.5s ease-in',
            }}
        >
            <h1 style={{ margin: 'auto', cursor: 'pointer' }}>
                <NavLink to="/" className="navbar__a" onClick={handleToTop}>
                    Based on Form
                </NavLink>
            </h1>
        </header>
        <div>
            {Object.keys(fixtures).map(day => (
                <div key={day} id={`${day}_menu`} className="content">
                    
                    <div className="content_body">
                        {fixtures[day].map((match, index) => (
                        <div>
                            <li
                                key={index}
                                id={`${match.fixture}`}
                                className='active'
                            >
                                {match.fixture}
                                
                               
                            </li>
                            {user ? (
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
                                ) : (
                                
                                <AuthPre />
                            )}

                        </div>
                        ))}

                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}

export default BundesligaPredictions;
