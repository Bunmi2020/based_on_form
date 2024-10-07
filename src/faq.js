import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

import './about.css';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';


function PrivacyPolicy() {
    ReactGA.send({
        hitType:"pageview",
        page:"/FAQ",
        title:"FAQ",
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

            <div id='faq' className='main_faq'>
                <h3 className="pitch">Frequently Asked Questions</h3>
                <i>Last updated: 01/08/2024</i>

                <p>
                    Welcome to Based on Form, your go-to football match predictive web app. Here are the answers to the most common questions about our football prediction services, betting tips, and how we help you make smarter betting decisions.
                </p>

                <ol className="faq_list" id='FAQ'>
                    <li>What services does Based on Form offer?</li>
                    <p className='answer'>
                        BasedOnForm.com offers expert predictions, insights, analyzed factors, and recent data for football betting, analyzing bookings, corners, goals, fouls, and shots per match. Our predictions are based on the latest team form, player statistics, and other critical match factors to give you the most accurate betting advice.
                    </p>

                    <li>What data are using for your analysis?</li>
                    <p className='answer'>
                        We use the most recent data. We presently rely on data from last season, these data would be updated as the new season progresses. The ref's card per games and fouls per tackle, team's aggressive and provocative players, would be recalculated after week 5, and continually updated as the season progresses. All data are calculated manually, but verified from various reputable platforms on the web.
                    </p>

                    <li>How can I become a Top Ten Picker?</li>
                    <p className='answer'>
                        To become a Top Ten Picker, submit your top ten picks in this week's comments. If you're the first or the only person to make the most correct picks, you'll be featured as a Top Ten Picker for the following week.
                    </p>

                    <li>How does BasedOnForm.com make predictions?</li>
                    <p className='answer'>
                        Our predictions combine advanced data analytics with expert knowledge, assessing teams' recent form, player performance, historical data, and other crucial factors to deliver reliable betting insights.
                    </p>
                     
                    <li>Who can benefit from Based on Form?</li>
                    <p className='answer'>
                        Football enthusiasts and bettors, both casual and professional, can benefit from our services. Our tools and analyses are designed to enhance your football betting experience and increase your chances of success.
                    </p>

                    <li>How often is the data updated on BasedOnForm.com?</li>
                    <p className='answer'>
                        We update our data regularly to ensure you have access to the latest trends, predictions, and match insights.
                    </p>

                    <li>Can I access predictions for any football match?</li>
                    <p className='answer'>
                        We offer in-depth analysis and predictions for matches in the five major leagues: Premier League, Ligue 1, Serie A, La Liga, and Bundesliga, as well as the three major European competitions: UEFA Champions League, Europa League, and Europa Conference League. We are planning to expand our coverage to include more leagues soon.
                    </p>
                     
                    <li>Is there a subscription fee to use BasedOnForm.com?</li>
                    <p className='answer'>
                        BasedOnForm.com is completely free to use. All of our services are currently free and will remain free for the foreseeable future.
                    </p>

                    <li>How accurate are BasedOnForm.com's predictions?</li>
                    <p className='answer'>
                        While no prediction can be 100% accurate, our combination of data analytics and expert analysis ensures a high level of accuracy and reliability in our football predictions.
                    </p>

                    <li>How do I get started with BasedOnForm.com?</li>
                    <p className='answer'>
                        Simply visit our website, select a fixture, and explore our predictions for various betting options. You'll then have access to our comprehensive football betting insights, related data, and predictions.
                    </p>

                    <li>What makes BasedOnForm.com different from other betting analysis websites?</li>
                    <p className='answer'>
                        We offer a wide range of predictions using a proven formula that has been refined over time. We continually improve our methods, learning from outcomes to enhance our prediction accuracy. We also provide you with data, analyzed factors needed to make your prediction per the betting option.
                    </p>
                     

                    <li>I have other questions</li>
                    <p className='answer'>
                        Reach out to us on any of our social media pages or use the comment section on our website.
                    </p>
                </ol>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
