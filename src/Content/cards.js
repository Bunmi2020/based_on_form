import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';

import './../App.css';
import './content.css';

import RefIcon from './../media/whistle.png';

import { auth } from '../week14/comment/firebaseConfig';
import { Helmet } from 'react-helmet';
import AuthPre from '../week14/comment/Authpre';


function Cards({ content }) {

    ReactGA.send({
        hitType:"pageview",
        page:"/",
        title:"Cards",
    });

      const [user, setUser] = useState(null);
    
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
        });
    
        return () => unsubscribe();
      }, []);

    if (!content) return null;

    const { home_team, away_team, league, referee, type_of_match, head_to_head, prediction, fixture } = content;
    const { fouls, HT_cards, FT_cards, teams } = head_to_head;
    const { recent_matches: home_recent, provocative_players: home_provocative, aggressive_players: home_aggressive } = home_team;
    const { recent_matches: away_recent, provocative_players: away_provocative, aggressive_players: away_aggressive } = away_team;

    return (
        <div className="content_body" id={`${fixture}_cards`}>
        <Helmet>
          <title>{fixture} - Cards: free betting prediction and insights </title>
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
            <div className="match_info">
                <div className="match_info_head">
                    <TeamInfo team={home_team} />
                    <MatchDetails league={league} referee={referee} type_of_match={type_of_match} />
                    <TeamInfo team={away_team} />
                </div>
                
                
            </div>
            
            <ProvocativePlayers home_provocative={home_provocative} away_provocative={away_provocative} />
             
            <AggressivePlayers home_aggressive={home_aggressive} away_aggressive={away_aggressive} />
            <HeadToHeadFouls home_team={home_team} away_team={away_team} fouls={fouls} HT_cards={HT_cards} FT_cards={FT_cards} teams={teams}/>
            <RecentMatches title={home_team.name} logo={home_team.team_logo} recent={home_recent} teams={home_team.teams}/>
            <RecentMatches title={away_team.name} logo={away_team.team_logo} recent={away_recent} teams={away_team.teams}/>
            <div className="prediction"  id ="prediction">
                <h5>{fixture} Cards' Prediction</h5>
                {user ? (
                    <Summary fixture={fixture} prediction={prediction.cards} id ="prediction"/>
                    ) : (
                        
                        <AuthPre />
                    )}
            </div>
           
            
        </div>
    );
}

function TeamInfo({ team }) {
    return (
        <div className="team_info">
            <img src={team.team_logo} alt={team.name} />
            <h5>{team.name}</h5>
           
        </div>
    );
}

function MatchDetails({ league, referee, type_of_match }) {
    return (
        <table className="match_info_table">
            <tbody>
                <tr>
                    
                    <td id="stadium">{league}</td>
                </tr>
                
                <tr>
                    <td id="type_of_match"><span className='type_of_match' title='Type of Match'>ToM: </span>{type_of_match}</td>
                </tr>
                <tr>
                    <td id="referee"><span id="icon" title='Referee'><img src={RefIcon} alt="referee" /></span>
                    {referee.name}</td>
                </tr>
                <tr>
                    
                    <td id="referee" title='fouls per tackle'>f/tkl: {referee.fouls_per_tackle}</td>
                </tr>
                <tr>
                    
                    <td id="referee" title='yellow per game'>y/gm: {referee.yellow_per_game}</td>
                </tr>
            </tbody>
        </table>
    );
}

function HeadToHeadFouls({ home_team, away_team, fouls, HT_cards, FT_cards, teams }) {
    return (
        <div className="head_to_head">

        <h3>Head to Head</h3>
            <table>
                <thead>
                    <tr>
                        <th id="Small_icon"></th>
                        <th>Fouls</th>
                        <th id="stadium">Cards</th>
                        <th>Fouls</th>
                        <th id="Small_icon"></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(fouls).map((match, index) => (
                        <tr key={index}>
                            <td id="team_name">{teams[match][0]}</td>
                            <td>{fouls[match][0]}</td>
                            <td title='HT/FT'>{HT_cards[match][0]}/{FT_cards[match][0]} : {HT_cards[match][1]}/{FT_cards[match][1]}</td>
                            <td>{fouls[match][1]}</td>
                            <td id="team_name">{teams[match][1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ProvocativePlayers({ home_provocative, away_provocative }) {
    if (!home_provocative.length || !away_provocative.length) return null;
    return (
        <div className="provocative_players">
            <table>
                <thead>
                    <tr><th></th><th>Provocative Players</th><th></th></tr>
                </thead>
                <tbody>
                    {home_provocative.map((player, index) => (
                        <tr key={index}>
                            <td>{player}</td>
                            <td></td>
                            <td>{away_provocative[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AggressivePlayers({ home_aggressive, away_aggressive }) {
    if (!home_aggressive.length || !away_aggressive.length) return null;
    return (
        <div className="aggressive_players">
            <table>
                <thead>
                    <tr><th></th><th>Aggressive Players</th><th></th></tr>
                </thead>
                <tbody>
                    {home_aggressive.map((player, index) => (
                        <tr key={index}>
                            <td>{player}</td>
                            <td></td>
                            <td>{away_aggressive[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function RecentMatches({ title, recent }) {
    return (
        <div className="recent_matches">
        <h3>Recent {title} Matches</h3>
            <table>
                <thead>
                    <tr>
                        <th id="Small_icon"> </th>
                        <th>Fouls</th>
                        <th id="stadium">Cards</th>
                        <th>Fouls</th>
                        <th id="Small_icon"> </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(recent.fouls).map((match, index) => (
                        <tr key={index}>
                            <td id="team_name">{recent.teams[match][0]}</td>
                            <td>{recent.fouls[match][0]}</td>
                            <td title='HT/FT' className='recent_cards'>{recent.HT_cards[match][0]}/{recent.FT_cards[match][0]} : {recent.HT_cards[match][1]}/{recent.FT_cards[match][1]}</td>
                            <td>{recent.fouls[match][1]}</td>
                            <td id="team_name">{recent.teams[match][1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Summary ({ fixture, prediction }) {
    return (
        <div >
        
            <p>{prediction.discuss}</p>
            <ul className='prediction_list'>
                <li>Halftime - total-cards/Booking: <span className='bold'>{prediction.ht}</span> </li>
                <li>Fulltime - total-cards/Bookings: <span className='bold'>{prediction.ft}</span></li>
            </ul>
        </div>
    );
}

export default Cards;
