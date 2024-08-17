import React, { useEffect, useState } from 'react';

import ReactGA from 'react-ga4';
import './about.css';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import logo from './media/logo.png';
import AdSenseComponent from './AdSense ';

function About() {
    ReactGA.send({
        hitType:"pageview",
        page:"/about",
        title:"About Us",
    });
    

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

    return (
        <div>
            <Helmet>
                <title>Based on Form - About Us | Football Prediction & Betting Insights</title>
                <meta name="description" content="Learn about Based on Form, your go-to platform for expert football predictions, betting tips, and in-depth analysis based on the latest team form and match factors." />
                <meta name="keywords" content="football predictions, betting tips, team form analysis, match insights, football betting, sports predictions" />
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

            <div id='about' className='about_body'>
                <img src={logo} alt="Based on Form logo" title="Based on Form - Football Predictions" />
                <p className="pitch">
                    Looking to enhance your football betting strategy? Based on Form provides expert predictions and insights, analyzing every aspect of the game, from bookings to goals, fouls, and more. Our data-driven approach helps you bet smarter, with predictions based on the latest team form and critical match factors.
                </p>
                <AdSenseComponent />
                <h3 className="red_lettered">We are live!</h3>
                <p>
                    Welcome to BasedOnForm.com – your premier destination for accurate football predictions and betting insights. Our platform delivers in-depth analysis on bookings, corners, goals, fouls, and other match statistics, ensuring you make informed betting decisions. By evaluating recent team form, player statistics, and historical data, we offer reliable advice to boost your football betting success.
                </p>
                <p>
                    Our team of seasoned analysts and football enthusiasts combines advanced data analytics with expert knowledge to give you the edge in your betting game. Whether you're a casual bettor or a seasoned pro, our comprehensive tools and analyses are designed to elevate your betting experience and increase your chances of winning.
                </p>
                <h3>We are hiring...</h3>
                <p>Check out <a href="https://wellfound.com/company/basedonform" target="_blank" rel="noreferrer">our Wellfound page</a> for an opportunity to work with us</p>
            </div>
        </div>
    );
}

export default About;
