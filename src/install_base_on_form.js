import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

import './about.css';
import { NavLink } from 'react-router-dom';
import {Helmet} from "react-helmet";
import AdSenseComponent from './AdSense ';

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

          <div id='privacy_policy' className='main_privacy_policy'>
          
          <h3 className="pitch">How to Install "Based on Form" on Mobile and Desktop</h3>
                <i>Last Updated: 01/08/2024</i>

                <h4>Installing on iPhone or iPad</h4>
                <AdSenseComponent />
                <ol>
                    <li>Open Safari</li>
                    {/* Placeholder for Open Safari Image */}
                    <li>Go to <a href="https://basedonform.com" target="_blank" rel="noreferrer">basedonform.com</a></li>
                    {/* Placeholder for Go to Website Image */}
                    <li>Tap the Share Icon (Located at the bottom of the screen)</li>
                    {/* Placeholder for Share Icon Image */}
                    <li>Select "Add to Home Screen"</li>
                    {/* Placeholder for Add to Home Screen Image */}
                    <li>Confirm or Edit the Name (Optional) and tap "Add"</li>
                    {/* Placeholder for Confirm and Add Image */}
                </ol>
                <p>After installation, you can access the web app directly from your home screen. Safari can be closed, but the "Based on Form" web app will remain accessible.</p>

                <h4>Installing on Android</h4>
                <AdSenseComponent />
                <ol>
                    <li>Open Chrome</li>
                    {/* Placeholder for Open Chrome Image */}
                    <li>Go to <a href="https://basedonform.com" target="_blank" rel="noreferrer">basedonform.com</a></li>
                    {/* Placeholder for Go to Website Image */}
                    <li>Tap the Menu Icon (Three dots at the top right corner)</li>
                    {/* Placeholder for Menu Icon Image */}
                    <li>Select "Add to Home Screen"</li>
                    {/* Placeholder for Add to Home Screen Image */}
                    <li>Tap "Install"</li>
                    {/* Placeholder for Install Image */}
                </ol>
                <p>The "Based on Form" web app will now be available on your home screen. You can launch it just like any other app.</p>

                <h4>Installing on Desktop (Windows/Mac)</h4>
                <AdSenseComponent />
                <ol>
                    <li>Open Chrome or Edge</li>
                    {/* Placeholder for Open Browser Image */}
                    <li>Visit <a href="https://basedonform.com" target="_blank" rel="noreferrer">basedonform.com</a></li>
                    {/* Placeholder for Go to Website Image */}
                    <li>Click on the Install Icon (Located at the right end of the address bar)</li>
                    {/* Placeholder for Install Icon Image */}
                    <li>Confirm Installation by clicking "Install" in the prompt</li>
                    {/* Placeholder for Confirm Installation Image */}
                </ol>
                <p>Now, you can access the "Based on Form" web app directly from your desktop without needing a browser.</p>
            </div>

        </div>
    )
}

export default InstallBaseOnForm;