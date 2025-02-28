import React, { useEffect, useState } from 'react';
import '../App.css';
import { Helmet } from 'react-helmet';
import facebook from '../media/facebook.png';
import twitter from '../media/twitter.png';
import { NavLink } from 'react-router-dom';
function Sidebar() {

  const handleToTop = () => {
    window.scrollTo(0, 0); // Scroll to top
   
  };

  return (
    <div id="Side_bar">
      <Helmet>
        <meta
          name="description"
          content="Explore this week's free 200+ football predictions with accurate betting tips, corner statistics, and match data and analysis, across the top five leagues and the Eredivisie, to elevate your sports betting strategy."
        />
        <meta
          name="keywords"
          content="football score predictions, accurate betting tips, corner statistics, football match analysis, sports betting insights, weekly prediction scorecard"
        />

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
      </Helmet>

      <div className='side_socials'>

      <div>
      <h3>Predictions only</h3>                                
            <li>
                <NavLink to="/ligue_1_predictions_week_24" className="navbar__a" onClick={handleToTop}>
                Ligue One Predictions
                </NavLink>
            </li>
            <li>
                <NavLink to="/bundesliga_predictions_week_24" className="navbar__a" onClick={handleToTop}>
                Bundesliga Predictions
                </NavLink>
            </li>
            <li style={{ margin: 'auto', cursor: 'pointer' }}>
                <NavLink to="/serie_a_predictions_week_27" className="navbar__a" onClick={handleToTop}>
                Serie A Predictions
                </NavLink>
            </li>
            <li style={{ margin: 'auto', cursor: 'pointer' }}>
                <NavLink to="/laliga_predictions_week_26" className="navbar__a" onClick={handleToTop}>
                La Liga Predictions
                </NavLink>
            </li>
                            
      </div>
       

          <p>Check our social media pages for top picks</p>
          <a href="https://www.x.com/basedonform" target="_blank" rel="noreferrer">
              <img src={twitter} alt="twitter" />
          </a>
          <a href="https://www.facebook.com/basedonform" target="_blank" rel="noreferrer">
              <img src={facebook} alt="facebook" />
          </a>
      </div>
      <div className='side_picks'>
      <h4>How to check predictions</h4>
        <a href="https://poawooptugroo.com/4/7950188" target="_blank" rel="noreferrer">
          <h5>Ensure to signup below</h5>
          </a>
          
            <ul>
              <li><a href="https://poawooptugroo.com/4/7950188" target="_blank" rel="noreferrer">Click on each fixture and see up to 7 predictions per match,</a></li>
              <li><a href="https://poawooptugroo.com/4/7950188" target="_blank" rel="noreferrer">Use the menu to check the fixture per their respective league,</a></li>
              <li><a href="https://poawooptugroo.com/4/7950188" target="_blank" rel="noreferrer">Or use the search bar when on an of the fixture page to search for a particular fixture</a></li>
            </ul>
              
      </div>
      
    </div>
  );
}

export default Sidebar;
