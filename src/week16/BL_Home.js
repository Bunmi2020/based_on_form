import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import BundesligaPredictions from './bundelsigat';


function BLHome() {
    ReactGA.send({
        hitType:"pageview",
        page:"/bundesliga_predictions_week_22",
        title:"Bundelsiga Predictions",
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

            <BundesligaPredictions />
        </div>
    );
}

export default BLHome;
