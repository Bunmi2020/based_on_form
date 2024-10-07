import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

import './about.css';
import { NavLink } from 'react-router-dom';
import {Helmet} from "react-helmet";
import safari from './media/to_do/iph_1.jpg';
import visit from './media/to_do/iph_2.jpg';
import share from './media/to_do/iph_3.jpg';
import home from './media/to_do/iph_4.jpg';
import add from './media/to_do/iph_5.jpg';
import done from './media/to_do/iph_6.jpg';

import chrome from './media/to_do/and_1.jpg';
import visite2 from './media/to_do/and_2.jpg';
import done2 from './media/to_do/and_6.jpg';
import add2 from './media/to_do/and_3.jpg';
import install from './media/to_do/and_4.jpg';

import install2 from './media/to_do/desktop1.PNG';
function InstallBaseOnForm () {
  ReactGA.send({
    hitType: "pageview",
    page: "/install_base_on_form",
    title: "Install Based on Form, on Mobile and Desktop",
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
            <title>Install Based on Form, on Mobile and Desktop</title>
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

          <div id='install_app' className='main_install_app'>
          
          <h2 className="pitch">How to Install "Based on Form" on Mobile and Desktop</h2>
                <i>Last Updated: 01/08/2024</i>

                <h3>Installing on iPhone or iPad</h3>
                 
                <ol>
                    <li>Open Safari</li>
                    <img src={safari} alt="open safari"/>
                    <li>Go to <a href="https://basedonform.com" target="_blank" rel="noreferrer">basedonform.com</a></li>
                    <img src={visit} alt="go to basedonform.com"/>
                    <li>Tap the Share Icon (Located at the bottom of the screen)</li>
                    <img src={share} alt="tap share"/>
                    <li>Select "Add to Home Screen"</li>
                    <img src={home} alt="add to home screen"/>
                    <li>Confirm or Edit the Name (Optional) and tap "Add"</li>
                    <img src={add} alt="tap add"/>
                </ol>
                <p>After installation, you can access the web app directly from your home screen. Safari can be closed, but the "Based on Form" web app will remain accessible.</p>
                <img src={done} alt="done with install"/>
                <h3>Installing on Android</h3>
                 
                <ol>
                    <li>Open Chrome</li>
                    <img src={chrome} alt="open chrome"/>
                    <li>Go to <a href="https://basedonform.com" target="_blank" rel="noreferrer">basedonform.com</a></li>
                    <img src={visite2} alt="go to basedonform.com"/>
                    <li>Tap the Menu Icon (Three dots at the top right corner)</li>
                    
                    <li>Select "Add to Home Screen"</li>
                    <img src={add2} alt="add to home screen"/>
                    <li>Tap "Install"</li>
                    <img src={install} alt="tap install"/>
                </ol>
                <p>The "Based on Form" web app will now be available on your home screen. You can launch it just like any other app.</p>
                <img src={done2} alt="done with install"/>
                <h3>Installing on Desktop (Windows/Mac)</h3>
                 
                <ol>
                    <li>Open Chrome or Edge</li>
                    {/* Placeholder for Open Browser Image */}
                    <li>Visit <a href="https://basedonform.com" target="_blank" rel="noreferrer">basedonform.com</a></li>
                    {/* Placeholder for Go to Website Image */}
                    <li>Click on the Install Icon (Located at the right end of the address bar)</li>
                    <img src={install2} alt="tap install"/>
                    <li>Confirm Installation by clicking "Install" in the prompt</li>
                    {/* Placeholder for Confirm Installation Image */}
                </ol>
                <p>Now, you can access the "Based on Form" web app directly from your desktop without needing a browser.</p>
            </div>

        </div>
    )
}

export default InstallBaseOnForm;