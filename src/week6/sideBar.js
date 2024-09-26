import React, { useEffect, useState } from 'react';
import '../App.css';
import { Helmet } from 'react-helmet';

function Sidebar() {
  const [cornerPicks, setCornerPicks] = useState([]);
  const [goalPicks, setGoalPicks] = useState([]);
  const [cardPicks, setCardPicks] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://bunmi2020.github.io/bnf_data/week_six/side_bar.json';

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
      <h3>Our Top Picks</h3>

      <ul className="top_picks">
        <p>Corners top picks</p>
        {cornerPicks.map((match, index) => (
          <li key={index}>
            {match.matchLabel}:
            <br />
            <i className="bold">{match.matchDetail}</i>
          </li>
        ))}
      </ul>

      <ul className="top_picks">
        <p>Goals top picks</p>
        {goalPicks.map((match, index) => (
          <li key={index}>
            {match.matchLabel}:
            <br />
            <i className="bold">{match.matchDetail}</i>
          </li>
        ))}
      </ul>

      <ul className="top_picks">
        <p>Cards top picks</p>
        {cardPicks.map((match, index) => (
          <li key={index}>
            {match.matchLabel}:
            <br />
            <i className="bold">{match.matchDetail}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
