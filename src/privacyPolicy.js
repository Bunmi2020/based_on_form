import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

import './about.css';
import { NavLink } from 'react-router-dom';
import {Helmet} from "react-helmet";
function PrivacyPolicy () {
  ReactGA.send({
    hitType:"pageview",
    page:"/privacy_policy",
    title:"Privacy Policy",
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
            <title>Based on Form - Privacy Policy</title>
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

          <div id='privacy_policy' className='main_privacy_policy'>
          
              <h3 class="pitch">Privacy Policy for Base on Form</h3>
              <i>Effective Date: 01/08/2024</i>
              
              <p>Welcome to Base on Form, a football match predictive web app. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website and use our services.</p>
              <ol class="privacy_policy">
                  <li class="subheading">Information We Collect</li>
                  <p>We collect information from you only when you log in through Google or Facebook authenticator for the purpose of commenting on our website. The types of information we may collect include:</p>
                  <ul>
                      <li><span class="bold_list">Personal Information:</span> Your name, email address, and profile picture as provided by your Google or Facebook account.</li>
                  </ul>
                  <p></p>
                  <li class="subheading">How We Use Your Information</li>
                  
                  <p>We use the information we collect from you in the following ways:</p>
                  <ul>
                      <li>To allow you to comment on our website and participate in discussions.</li>
                      <li>To improve our website and services.</li>
                      <li>To ensure a secure and personalized experience.</li>
                      <li>To alert you when a new week' predictions are updated</li>
                  </ul>
                  <p></p>
                  <li class="subheading">Sharing Your Information</li>
                  <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. However, we may share your information in the following circumstances:</p>
                  <ul>
                      <li><span class="bold_list">With your consent:</span> We may share your information if you give us explicit permission to do so.</li>
                      <li><span class="bold_list">For legal reasons:</span> We may share your information to comply with any applicable laws, regulations, legal processes, or governmental requests.</li>
                  </ul>
                  <p></p>
                  <li class="subheading">Data Security</li>
                  <p>We implement a variety of security measures to maintain the safety of your personal information. Your information is stored in a secure environment and is accessible only to those authorized with special access rights to our systems.</p>
                  <li class="subheading">Third-Party Links</li>
                  <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of these websites. We encourage you to read the privacy policies of any third-party websites you visit.</p>
                  <li class="subheading">Your Consent</li>
                  <p>By using our website, you consent to our Privacy Policy.</p>
                  <li class="subheading">Changes to Our Privacy Policy</li>
                  <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
                  <li class="subheading">Contact Us</li>
                  <p>If you have any questions about this Privacy Policy, please <a href="mailto:admin@basedonform.com">Contact Us</a></p>
                  
                  
              </ol>
          </div>

        </div>
    )
}

export default PrivacyPolicy;