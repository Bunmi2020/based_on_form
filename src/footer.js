import React from 'react';

import { NavLink } from 'react-router-dom';
import './footer.css';
import logo from './media/logo.png';
import facebook from './media/facebook.png';
import twitter from './media/twitter.png';
import email from './media/mail.png';
import linkedin from './media/linkedin.png';
import Comment from './week18/comment/comment';

function Footer () {
  
     
  const handleToTop = () => {
    window.scrollTo(0, 0); // Scroll to top
   
  };

    return (
        <div className='footer' id='footer'>
            <div className='footer_header'> 
                <div className="footer_logo">
                    <span className="divider" style={{}}></span>

                        <img className='footer_logo' src={logo} alt="BnF" style={{ minWidth: '10vw', minHeight:'10vw', maxWidth: '100px', maxHeight: '100px', margin: 'auto 0%' }} />
                    <span className="divider" style={{}}></span>
                </div>

                <div className="socials">
                    <a href="https://www.x.com/basedonform" target="_blank" rel="noreferrer">
                        <img src={twitter} alt="twitter" />
                    </a>
                    <a href="https://www.facebook.com/basedonform" target="_blank" rel="noreferrer">
                        <img src={facebook} alt="facebook" />
                    </a>
                    <a href="https://www.linkedin.com/company/basedonform" target="_blank" rel="noreferrer">
                        <img src={linkedin} alt="linked" />
                    </a>
                    <a href="mailto:admin@basedonform.com" target="_blank" rel="noreferrer">
                        <img src={email} alt="email" />
                    </a>
                </div>
            </div>
           
            <div className='footer_body'>  
             
                <div className='footer_left'>  
                    <Comment />

                </div>
                
                <div className='footer_right'> 
                    <h3>Company</h3>
                    <li>
                        <NavLink to="/" className="navbar__a" onClick={handleToTop}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="navbar__a" onClick={handleToTop}>
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/install_app" className="navbar__a" onClick={handleToTop}>
                            Install Based on Form
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/FAQ" className="navbar__a" onClick={handleToTop}>
                            FAQ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/privacy_policy" className="navbar__a" onClick={handleToTop}>
                            Privacy Policy
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/terms_of_use" className="navbar__a" onClick={handleToTop}>
                            Terms of Use
                        </NavLink>
                    </li>
                </div>
                 
            </div>
            <div className="copyrights">
                <p>&copy; 2024 Based on Form.  All rights reserved</p>
            </div>
        </div>
    );
}


export default Footer;
