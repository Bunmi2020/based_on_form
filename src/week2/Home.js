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

function Home () {

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
          <title>Based on Form | Football Prediction & Betting Tips</title>
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
            <script async="async" data-cfasync="false" src="//thubanoa.com/1?z=7947173"></script>
        </Helmet>
            <header 
                style={{
                    position: isScrollingUp ? 'sticky' : 'relative',
                    top: isScrollingUp ? '0' : 'auto',
                    transition: 'top 0.5s ease-in',
                }}
            >
                {screenWidth < 960 && (
                    <div
                        className="mobile-menu-button"
                        onClick={() => {
                            setIsToggle(!isToggle);
                        }}
                        style={{ width: '45px', height: '30px', background: 'none' , float: 'left'}}
                    >
                        <img src={menu} alt="Menu" style={{ width: '30px', height: '25px' }} />
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
                        <LaligaMenu setContent={handleMenuItemClick} />
                        <Ligue1Menu setContent={handleMenuItemClick} />
                        <PLMenu setContent={handleMenuItemClick} />
                                                
                        <SerieAMenu setContent={handleMenuItemClick} />
                        
                        
                    </div>
                )}
                {!content ? (
                    <div className='content_default' id='default'>
                    <Helmet>
                      <meta name="description" content="Explore this week's football predictions with accurate betting tips, corner statistics, and match analysis to elevate your sports betting strategy." />
                      <meta name="keywords" content="football score predictions, accurate betting tips, corner statistics, football match analysis, sports betting insights, weekly prediction and insights" />

                    </Helmet>
                      <h3>Welcome to Based on Form,</h3>
                      <p>...where data meets intuition to bring you the most accurate football betting insights and predictions.🤑</p>
                      <p className='highlight_p'>🎰 Select a fixture from the menu to view the data and predictions!</p>
                    </div>
                ) : (
                    <div className='content' id='main'>
                        
                        <ul className="content-menu">
                            
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
            
        </div>
    );
}

export default Home;
