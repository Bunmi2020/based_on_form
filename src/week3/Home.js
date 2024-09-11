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

function HomeNew () {

  ReactGA.send({
    hitType:"pageview",
    page:"/",
    title:"Home",
});

    const [activeComponent, setActiveComponent] = useState('corners'); // State to track active component
    const [isToggle, setIsToggle] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [content, setContent] = useState(null); // State to track the selected fixture content
    
    const [isVisible, setIsVisible] = useState(true);

    
  useEffect(() => {
    const handleScroll = () => {
      const shouldShowButton = window.pageYOffset < 50 || window.pageYOffset > 900; // change this number as needed
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
          <meta name="description" content="Explore this week's football score predictions with accurate betting tips, corner statistics, and match analysis to elevate your sports betting strategy." />
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
            <header >
                {screenWidth < 960 && (
                    <div
                        className="mobile-menu-button"
                        onClick={() => {
                            setIsToggle(!isToggle);
                        }}
                        style={{ width: '45px', height: '30px', background: 'none' , float: 'left'}}
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
                       
                        <Ligue1Menu setContent={handleMenuItemClick} />
                        <SerieAMenu setContent={handleMenuItemClick} />
                        <PLMenu setContent={handleMenuItemClick} />                   
                        
                        <LaligaMenu setContent={handleMenuItemClick} />
                        
                        
                    </div>
                )}
                {!content ? (
                  <div className='content_default' id='default'>
                    <Helmet>
                      <meta name="description" content="Explore this week's football score predictions with accurate betting tips, corner statistics, and match analysis to elevate your sports betting strategy." />
                      <meta name="keywords" content="football score predictions, accurate betting tips, corner statistics, football match analysis, sports betting insights, weekly prediction scorecard" />

                    </Helmet>
                      <h3>🔍 This Week's Prediction Scorecard</h3>
                      <dl title='77% accuracy'>🎯 Out of 153 weekend predictions, 117 hit the mark!</dl>
                      <ul>
                          <li className='high_accuracy'>🏹 Corners: <strong>34/45</strong></li>
                          <li className='high_accuracy'>⚽ Goals: <strong>36/51</strong></li>
                          <li className='high_accuracy'>🔴 Cards: <strong>47/57</strong></li>
                      </ul>
                      <dl>🌟 Top Performing Predictions</dl>
                      <ul>
                          <li className='high_accuracy'>🇮🇹 Serie A - Corners: <strong>9/11</strong></li>
                          <li className='high_accuracy'>🇮🇹 Serie A - Cards: <strong>14/16</strong></li>
                          <li className='high_accuracy'>🇪🇸 La Liga - Corners: <strong>10/11</strong></li>
                          <li className='high_accuracy'>🇪🇸 La Liga - Cards: <strong>14/16</strong></li>
                          
                          <li className='high_accuracy'>🇫🇷 Ligue 1 - Cards: <strong>10/12</strong></li>
                          
                      </ul>
                      <p className='highlight_p'>📊 Select a fixture from the menu to compare our predictions with actual results!</p>
                    </div>
                ) : (
                    <div className='content' id='main'>
                        
                        <ul className="content-menu"
                              style={{
                                  position: isScrollingUp ? 'sticky' : 'relative',
                                  top: isScrollingUp ? '5%' : 'auto',
                                  transition: 'top 0.5s ease-in',
                              }}
                        >
                            
                            <li
                                className={activeComponent === 'corners' ? 'active' : ''}
                                onClick={() => setActiveComponent('corners')}
                            >
                                Corners
                            </li>
                            <li
                                className={activeComponent === 'goals' ? 'active' : ''}
                                onClick={() => setActiveComponent('goals')}
                            >
                                Goals
                            </li>
                            <li
                                className={activeComponent === 'cards' ? 'active' : ''}
                                onClick={() => setActiveComponent('cards')}
                            >
                                Cards
                            </li>
                        </ul>

                        <div className='content_body'>
                            
                            {activeComponent === 'corners' && <Corners content={content} />}
                            {activeComponent === 'goals' && <Goals content={content} />}
                            {activeComponent === 'cards' && <Cards content={content} />}
                           
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
                            padding: '0.5em 1em'}}>{activeComponent}'s prediction</span></HashLink>

                    </div>
                )}

                <div className='Side_bar'>
                    <Sidebar />
                </div>
            </div>
            
            <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/47013782.js"></script>
           
        </div>
    );
}

export default HomeNew;
