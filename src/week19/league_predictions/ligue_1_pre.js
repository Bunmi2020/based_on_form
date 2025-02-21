import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../Home.css';

import './style.css';
import ReactGA from 'react-ga4';
import '../comment/comment.css';
import { auth } from '../comment/firebaseConfig';
import AuthPre from '../comment/Authpre';
import { NavLink } from 'react-router-dom';
import {Helmet} from "react-helmet";
import BottomHeader from './bottom_header';

function LigueOnePredictionsN() {

    ReactGA.send({
        hitType:"pageview",
        page:"/ligue_1_predictions_week_22",
        title:"Week 23 Ligue One Predictions",
    });
    
    const [fixtures, setFixtures] = useState({
        friday: [],
        saturday: [],
        sunday: [],
        monday: []
    });
    

    const urls = ['https://bunmi2020.github.io/bnf_data/week_nineteen/ligue_1.json'];
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

    const [user, setUser] = useState(null);
        
          useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
              setUser(user);
            });
        
            return () => unsubscribe();
          }, []);

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

          function handleReload(url) {
            window.location.href = url;
            window.scrollTo(0, 0);
          }
        
    

    return (
        <div >
        <Helmet>
            <title>Week 23 Ligue One Predictions</title>
            <meta name="description" content="Explore all Ligue One Predictions predictions!! This week's Ligue One Predictions predictions, with accurate football betting tips, corner statistics, and match data and analysis, across the top five leagues and the Eredivisie, to elevate your football betting strategy." />
            <meta name="keywords" content="Week 23 Ligue One Predictions, this week's Ligue One Predictions predictions, football predictions, free betting prediction and insights, free football predictions, free football betting tips, free football betting predictions, football match analysis, sports betting insights, best football prediction site, accurate football betting tips, free football predictions, football betting form, football betting predictions today, basedonform.com" />

            <script id="hydro_config" type="text/javascript">
          {`
            window.Hydro_tagId = "829d3b89-0fc4-424c-8477-ee88eb2ed1aa";
          `}
            </script>
            <script type="text/javascript" async src="https://platform.foremedia.net/code/55519/analytics"></script>
            <script id="hydro_script" src="https://track.hydro.online/"></script>

            <meta name="google-adsense-account" content="ca-pub-4268079192646406"></meta>
            <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4268079192646406"
            crossorigin="anonymous"
            ></script>
          </Helmet>

          <header>
        <h1 style={{ margin: 'auto', cursor: 'pointer' }}>
          <NavLink to="/" className="navbar__a" onClick={() => handleReload('/')}>
            Based on Form
          </NavLink>
        </h1>
        </header>
        
        <BottomHeader />
            <div className="Home">
                {Object.keys(fixtures).map(day => (
                    <div key={day} id={`${day}_menu`} className="days_menu">
                    <h5 id={day} className='day_title'>
                        {day.charAt(0).toUpperCase() + day.slice(1)} 
                    </h5>
                    {user ? (
                        <div className="all_fixtures">
                            {fixtures[day].map((match, index) => (
                                <div>
                                <li
                                    key={index}
                                    id={`${match.fixture}`}
                                    className=""
                                >
                                    {match.fixture}
                                    
                                
                                </li>
                                
                            <div className="prediction"  id ="prediction">
                                
                                <div className='prediction_list'>
                                    <pre> {match.prediction?.cards?.ht || 'N/A'}</pre>
                                    <hr/>
                                    <pre> {match.prediction?.cards?.ft || 'N/A'}</pre>
                                    <hr/>
                                </div>
                                <div className='prediction_list'>
                                    <pre> {match.prediction?.corners.full_time_total_corners || 'N/A'}</pre>
                                    <hr/>
                                    <pre> {match.prediction?.corners.win_corners || 'N/A'}</pre>
                                    <hr/>
                                </div>
                                <div className='prediction_list'>
                                    <pre> {match.prediction?.goals.Both_teams_to_score || 'N/A'}</pre>
                                    <hr/>
                                    <pre> {match.prediction?.goals.fulltime_total_goals || 'N/A'}</pre>
                                    <hr/>
                                </div>
                                <div className='prediction_list'>
                                    <pre>{match.prediction?.win_draw.win_or_draw || 'N/A'}</pre>
                                    <hr/>
                                </div>
                            </div>

                                </div>
                            ))}

                        </div>
                    ) : (
                                    
                        <AuthPre />
                    )}
                    </div>
                ))}

                
        </div>
        </div>
    );
}

export default LigueOnePredictionsN;
