import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { HashLink } from 'react-router-hash-link';
import '../App.css';
import './Home.css';

import facebook from '../media/facebook.png';
import twitter from '../media/twitter.png';

import Cards from '../Content/cards';
import Corners from '../Content/corners';
import Goals from '../Content/goals';
import WinOrDraw from '../Content/win_or_draw';
import PLMenu from './league_menu/pl';
import SerieAMenu from './league_menu/serie_a';
import Ligue1Menu from './league_menu/ligue_1';
import Sidebar from './sideBar';
import menu from '../media/menu-bar.png';
import chat from '../media/chat.png';

import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SearchBar from './search';
import BundesligaMenu from './league_menu/bundesliga';
import LaligaMenu from './league_menu/la_liga';
import WeekendFixtures from './day_fixture/weekend';


 

function FebOne () {
  ReactGA.send({
    hitType: "pageview",
    page: "/",
    title: "First Feb Home",
  });

  const [activeComponent, setActiveComponent] = useState('corners'); // State to track active component
  const [isToggle, setIsToggle] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedContent, setSelectedContent] = useState(null); // State for popup content
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [content, setContent] = useState(null); // State to track the selected fixture content
  const [fixtures, setFixtures] = useState([]); // Store flattened fixtures
  const [isVisible, setIsVisible] = useState(true);

  // Fetch data from multiple URLs
  const urls = [
      'https://bunmi2020.github.io/bnf_data/week_seventeen/serie_a.json',
        'https://bunmi2020.github.io/bnf_data/week_seventeen/ligue_1.json',
        'https://bunmi2020.github.io/bnf_data/week_seventeen/bundesliga.json',
        'https://bunmi2020.github.io/bnf_data/week_seventeen/la_liga.json'
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
    setSelectedContent(item);  // Add this line
    setIsPopupOpen(true); // Open the popup
    if (screenWidth < 960) {
      setIsToggle(false); // Close the mobile menu
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedContent(null);
    setContent(null); // Ensure default content comes back
};

  function handleReload(url) {
    window.location.href = url;
    window.scrollTo(0, 0);
  }

  return (
    <div className="App">
      <Helmet>
      <title>Based on Form | Free 200+ Football Predictions & Betting Tips</title>
        <meta name="description" content="Explore this week's free 200+ football predictions with accurate football betting tips, corner statistics, and match data and analysis, across the top five leagues and the Eredivisie, to elevate your football betting strategy." />
          <meta name="keywords" content="football predictions, free betting prediction and insights, free football predictions, free football betting tips, free football betting predictions, football match analysis, sports betting insights, best football prediction site, accurate football betting tips, free football predictions, football betting form, football betting predictions today, Premier League predictions, La Liga predictions, UEFA Champions League predictions, Europa League predictions, Europa conference League predictions, Serie A predictions, Ligue one, Ligue 1 predictions, based on form, base on form, Eredivisie predictions, basedonform.com" />

          <script type="text/javascript" async src="https://platform.foremedia.net/code/55519/analytics"></script>
          
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
            
            <SerieAMenu setContent={handleMenuItemClick} />
            <BundesligaMenu setContent={handleMenuItemClick} />
            <LaligaMenu setContent={handleMenuItemClick} />
            <Ligue1Menu setContent={handleMenuItemClick} />
          </div>
        )}
        {!content && !isPopupOpen && !selectedContent ? (
                     
          <div className='content_default' id='default'>
            <h3>Welcome to Based on Form!</h3>
            <h5>Check our social media pages for the top picks</h5>
            <div className='side_socials'>
                
                <a href="https://www.x.com/basedonform" target="_blank" rel="noreferrer">
                    <img src={twitter} alt="twitter" />
                </a>
                <a href="https://www.facebook.com/basedonform" target="_blank" rel="noreferrer">
                    <img src={facebook} alt="facebook" />
                </a>
            </div>
            <WeekendFixtures fixtures={fixtures} setContent={handleMenuItemClick} />
                      
            
          </div>
          
        ) : isPopupOpen && selectedContent && (
          <div className='content' id='main'>
            <div className='content_header'>
            <SearchBar fixtures={fixtures} setContent={setContent} id='search'/>
            <button title='close this fixture tab' className="close-btn" onClick={closePopup}>Close fixture</button>
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
        <div className='Side_bar'>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default FebOne;
