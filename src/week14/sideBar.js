import React, { useEffect, useState } from 'react';
import '../App.css';
import { Helmet } from 'react-helmet';
import facebook from '../media/facebook.png';
import twitter from '../media/twitter.png';
function Sidebar() {
  const [cornerPicks, setCornerPicks] = useState([]);
  const [goalPicks, setGoalPicks] = useState([]);
  const [cardPicks, setCardPicks] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://bunmi2020.github.io/bnf_data/week_eleven/side_bar.json';

    fetch(apiUrl, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const topData = data[0]; // Accessing the top pick data

        // Format the picks for each category
        const formattedCornerPicks = Object.values(topData.corners_top_picks).map(match => ({
          matchLabel: match[0],
          matchDetail: match[1],
        }));

        const formattedGoalPicks = Object.values(topData.goals_top_picks).map(match => ({
          matchLabel: match[0],
          matchDetail: match[1],
        }));

        const formattedCardPicks = Object.values(topData.cards_top_picks).map(match => ({
          matchLabel: match[0],
          matchDetail: match[1],
        }));

        // Set the state with the formatted picks
        setCornerPicks(formattedCornerPicks);
        setGoalPicks(formattedGoalPicks);
        setCardPicks(formattedCardPicks);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
        <h3>Our Top Picks</h3>

          <p>Check our social media pages for the top picks</p>
          <a href="https://www.x.com/basedonform" target="_blank" rel="noreferrer">
              <img src={twitter} alt="twitter" />
          </a>
          <a href="https://www.facebook.com/basedonform" target="_blank" rel="noreferrer">
              <img src={facebook} alt="facebook" />
          </a>
      </div>
      <div className='side_picks'>
        <h3>How to check predictions</h3>
            <h5>Ensure to signup below</h5>
            <ul>
              <li>Click on each fixture and see up to 7 predictions per match,</li>
              <li>Use the menu to check the fixture per their respective league,</li>
              <li>Or use the search bar when on an of the fixture page to search for a particular fixture</li>
            </ul>
              
      </div>
      
    </div>
  );
}

export default Sidebar;
