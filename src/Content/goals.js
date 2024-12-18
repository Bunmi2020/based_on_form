import React from 'react';
import ReactGA from 'react-ga4';

import './../App.css';
import './content.css';

import { Helmet } from 'react-helmet';



function Goals({ content }) {

    ReactGA.send({
        hitType:"pageview",
        page:"/",
        title:"Goals",
    });

   
    if (!content) return null;

    const { home_team, away_team, league, type_of_match, head_to_head, summary, fixture } = content;
    const { goals, x_goals, teams } = head_to_head;
    const { recent_matches: home_recent, unavailable_attacking_players: home_unavailable } = home_team;
    const { recent_matches: away_recent, unavailable_attacking_players: away_unavailable } = away_team;

    return (
        <div className="content_body" id={`${fixture}_goals`}>
        <Helmet>
          <title>{fixture} - Goals: free prediction and insights </title>
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
                <TeamInfo team={home_team} />
                <MatchDetails league={league} type_of_match={type_of_match} />
                <TeamInfo team={away_team} />
            </div>
           <UnavailablePlayers home_unavailable={home_unavailable} away_unavailable={away_unavailable} />
             
            <HeadToHeadGoals home_team={home_team} away_team={away_team} goals={goals} x_goals={x_goals} teams={teams}/>
            <RecentMatches title={home_team.name} logo={home_team.team_logo} recent={home_recent} teams={home_team.teams}/>
            <RecentMatches title={away_team.name} logo={away_team.team_logo} recent={away_recent} teams={away_team.teams}/>
             <Summary summary={summary.goals} id ="prediction"/>
             
            
            
        </div>
    );
}

function TeamInfo({ team }) {
    return (
        <div className="team_info">
            <img src={team.team_logo} alt={team.name} />
            <h5>{team.name}</h5>
            <ul className='style_of_play'>
                <li title='Playing style'>{team.playing_style}</li>
                <li title='Attacking style'>{team.attacking_style}</li>
                <li title='Defensive style'>{team.defensive_style}</li>
            </ul>
        </div>
    );
}

function MatchDetails({ stadium, weather, league, pitch_condition, type_of_match }) {
    return (
        <table className="match_info_table">
            <tbody>
                <tr>
                    
                    <td id="stadium">{league}</td>
                </tr>
               
                <tr>
                    
                    
                    <td id="type_of_match"><span className='type_of_match' title='Type of Match'>ToM: </span>{type_of_match}</td>
                </tr>
            </tbody>
        </table>
    );
}

function HeadToHeadGoals({ goals, x_goals, teams }) {
    return (
        <div className="head_to_head">
        <h3>Head to Head</h3>
            <table>
                <thead>
                    <tr>
                        <th id="Small_icon"> </th>
                        <th>X-goals</th>
                        <th id="stadium">Goals</th>
                        <th>X-goals</th>
                        <th id="Small_icon"> </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(goals).map((match, index) => (
                        <tr key={index}>
                            <td id="team_name">{teams[match][0]}</td>
                            <td>{x_goals[match][0]}</td>
                            <td>{goals[match][0]} : {goals[match][1]}</td>
                            <td>{x_goals[match][1]}</td>
                            <td id="team_name">{teams[match][1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function UnavailablePlayers({ home_unavailable, away_unavailable }) {
    if (!home_unavailable.length || !away_unavailable.length) return null;
    return (
        <div className="unavailable_players">
            <table>
                <thead>
                    <tr><th>Unavailable Key Players</th></tr>
                </thead>
                <tbody>
                    {home_unavailable.map((player, index) => (
                        <tr key={index}>
                            <td>{player}</td>
                            <td>{away_unavailable[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function RecentMatches({ title, logo, recent }) {
    return (
        <div className="recent_matches">
        <h3>Recent {title} Matches</h3>
            <table>
                <thead>
                    <tr>
                        <th id="Small_icon"> </th>
                        <th>X-goals</th>
                        <th id="stadium">Goals</th>
                        <th>X-goals</th>
                        <th id="Small_icon"> </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(recent.goals).map((match, index) => (
                        <tr key={index}>
                            <td id="team_name">{recent.teams[match][0]} </td>
                            <td>{recent.x_goals[match][0]}</td>
                            <td>{recent.goals[match][0]} : {recent.goals[match][1]}</td>
                            <td>{recent.x_goals[match][1]}</td>
                            <td id="team_name">{recent.teams[match][1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Summary ({ fixture, summary }) {
    return (
        <div className="prediction"  id ="prediction">
        <h4>{fixture} Goal's Prediction</h4>
            <p>{summary.discuss}</p>
            <ul className='prediction_list'>
                <li>BTS/GG: <span className='bold'>{summary.ht}</span></li>
                <li>FT total goals: <span className='bold'>{summary.ft}</span></li>
            </ul>
        </div>
    );
}

export default Goals;
