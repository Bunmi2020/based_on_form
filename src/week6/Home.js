import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { HashLink } from 'react-router-hash-link';

import './Home.css';

import Cards from '../Content/cards';
import Corners from '../Content/corners';
import Goals from '../Content/goals';
import PLMenu from './league_menu/pl';
import SerieAMenu from './league_menu/serie_a';
import Ligue1Menu from './league_menu/ligue_1';
import LaligaMenu from './league_menu/la_liga';
import Sidebar from './sideBar';
import menu from '../media/menu-bar.png';
import chat from '../media/chat.png';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SearchBar from './search';
import EredivisieMenu from './league_menu/eredivisie';
import BundesligaMenu from './league_menu/bundesliga';
 
import Friday from './day_fixture/friday';
import Saturday from './day_fixture/saturday';
import Sunday from './day_fixture/sunday';
import Monday from './day_fixture/monday';

function SeptThree () {
  ReactGA.send({
    hitType: "pageview",
    page: "/27-30_sept",
    title: "SeptThree Home",
  });

  const [activeComponent, setActiveComponent] = useState('corners'); // State to track active component
  const [isToggle, setIsToggle] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [content, setContent] = useState(null); // State to track the selected fixture content
  const [fixtures, setFixtures] = useState([]); // Store flattened fixtures
  const [isVisible, setIsVisible] = useState(true);

  // Fetch data from multiple URLs
  const urls = [
    'https://bunmi2020.github.io/bnf_data/week_six/serie_a.json',
    'https://bunmi2020.github.io/bnf_data/week_six/pl.json',
    'https://bunmi2020.github.io/bnf_data/week_six/ligue_1.json',
    'https://bunmi2020.github.io/bnf_data/week_six/eredivisie.json',
    'https://bunmi2020.github.io/bnf_data/week_six/la_liga.json',
    'https://bunmi2020.github.io/bnf_data/week_six/bundesliga.json'
  ];

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));

        // Flatten the data (merge arrays into a single array)
        const flattenedFixtures = data.flat();
        setFixtures(flattenedFixtures); // Store the flattened fixtures

      } catch (error) {
        console.error('Error fetching fixtures:', error);
      }
    };

    fetchFixtures();
  });

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

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth > 959) {
      setIsToggle(false); // Close mobile menu if screen width is greater than 960px
    }
  }, [screenWidth]);

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

  const handleMenuItemClick = (item) => {
    setContent(item);
    if (screenWidth < 960) {
      setIsToggle(false); // Close the mobile menu
    }
  };

  function handleReload(url) {
    window.location.href = url;
    window.scrollTo(0, 0);
  }

  return (
    <div className="App">
      <Helmet>
      <title>Based on Form | Free 200+ Football Predictions & Betting Tips</title>
          <meta name="description" content="Explore this week's free 200+ football predictions with accurate betting tips, corner statistics, and match data and analysis, across the top five leagues and the Eredivisie, to elevate your sports betting strategy." />
          <meta name="keywords" content="football score predictions, accurate betting tips, corner statistics, football match analysis, sports betting insights, weekly prediction scorecard" />

          <script id="hydro_config" type="text/javascript">
          {`
            window.Hydro_tagId = "829d3b89-0fc4-424c-8477-ee88eb2ed1aa";
          `}
            </script>
            <script id="hydro_script" src="https://track.hydro.online/"></script>

            <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4268079192646406"
            crossorigin="anonymous"
            ></script>
            <meta name="google-adsense-account" content="ca-pub-4268079192646406"></meta>
      </Helmet>
      <header>
        {screenWidth < 960 && (
          <div
            className="mobile-menu-button"
            onClick={() => {
              setIsToggle(!isToggle);
            }}
            style={{ width: '45px', height: '30px', background: 'none', float: 'left' }}
          >
            <img src={menu} alt="Menu" style={{ width: '40px', height: '35px' }} />
          </div>
        )}
        <h1 style={{ margin: 'auto', cursor: 'pointer' }}>
          <NavLink to="/" className="navbar__a" onClick={() => handleReload('/')}>
            Based on Form
          </NavLink>
        </h1>
        <HashLink smooth to="/#comments"><img className='comment_button' src={chat} alt="Comment_button" title="Comment" /></HashLink>
      </header>
      <div className="Home">
        {(isToggle || screenWidth > 959) && (
          <div className='Side_menu'>
            <BundesligaMenu setContent={handleMenuItemClick} />
            <PLMenu setContent={handleMenuItemClick} />
            <SerieAMenu setContent={handleMenuItemClick} />
            
            <LaligaMenu setContent={handleMenuItemClick} />
            <EredivisieMenu setContent={handleMenuItemClick} />
            <Ligue1Menu setContent={handleMenuItemClick} />
            
            
          </div>
        )}
        {!content ? (
                     
          <div className='content_default' id='default'>
          <h3>🔍 Weekend's Prediction Scorecard</h3>
                      <dl title='75% accuracy'>🎯 Out of 208 weekend predictions, 155 hit the mark!</dl>
                      <ul>
                          <li title='70% accuracy' className='medium_accuracy'>🏹 Corners: <strong>45/65</strong></li>
                          <li title='74% accuracy' className='medium_accuracy'>⚽ Goals: <strong>53/72</strong></li>
                          <li title='80% accuracy' className='high_accuracy'>🔴 Cards: <strong>57/71</strong></li>
                      </ul>
                      <dl>🌟 Top Performing Predictions</dl>
                      <ul>
                          
                      <li className='high_accuracy'>🇬🇧 Premier League - Corners: <strong>9/11</strong></li>
                      <li className='high_accuracy'>🇬🇧 Premier League - Cards: <strong>13/14</strong></li>
                    
                      <li className='high_accuracy'>🇪🇸 La Liga - Goals: <strong>14/14</strong></li>
                      
                      <li className='high_accuracy'>🇫🇷 Ligue 1 - Cards: <strong>9/11</strong></li>
                      <li className='high_accuracy'>🇩🇪 Bundesliga - Cards: <strong>8/9</strong></li>
                      <li className='high_accuracy'>🇳🇱 Eredivisie - Cards: <strong>8/9</strong></li>
                      <li className='high_accuracy'>🇳🇱 Eredivisie - Corners: <strong>10/12</strong></li>

                      </ul>
                      <p className='highlight_p'>📊 Select a fixture from the menu to compare our predictions with actual results!</p>
            <Friday fixtures={fixtures} setContent={setContent} />
            <Saturday fixtures={fixtures} setContent={setContent} />
            <Sunday fixtures={fixtures} setContent={setContent} />
            <Monday fixtures={fixtures} setContent={setContent} />
           
          </div>
          
        ) : (
          <div className='content' id='main'>
            <SearchBar fixtures={fixtures} setContent={setContent} />
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
            </ul>
            <div className='content_body'>
              {activeComponent === 'corners' && <Corners content={content} />}
              {activeComponent === 'cards' && <Cards content={content} />}
              {activeComponent === 'goals' && <Goals content={content} />}
            </div>
            <HashLink smooth to="/#prediction"><span style={{ width: '4.5em', display: isVisible ? 'none' : 'flex', position: 'fixed',flexDirection: 'column',justifyContent: 'center', zIndex: 9, boxShadow: '3px, 2px, gray',
                            bottom: '0%',
                            background: 'linear-gradient(90deg, var(--highlight-color), red)',
                            borderRadius: '10px',
                            className:'prediction_button',
                            right: '0%',
                            fontSize: '20px',
                            cursor: 'pointer',
                            color: 'white',
                            margin: '1em 0.5em',
                            padding: '0.5em 1em'}}>{activeComponent}' prediction</span></HashLink>

            </div>
        )}
        <div className='Side_bar'>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default SeptThree;