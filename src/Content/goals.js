import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';

import './../App.css';
import './content.css';

import { auth } from '../week19/comment/firebaseConfig';
import { Helmet } from 'react-helmet';
import AuthPre from '../week19/comment/Authpre';


function Goals({ content }) {

    ReactGA.send({
        hitType:"pageview",
        page:"/",
        title:"Goals",
    });

    const [user, setUser] = useState(null);
    
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
        });
    
        return () => unsubscribe();
      }, []);

   
    if (!content) return null;

    const { home_team, away_team, league, type_of_match, head_to_head, prediction, fixture } = content;
    const { goals, x_goals, teams } = head_to_head;
    const { recent_matches: home_recent } = home_team;
    const { recent_matches: away_recent } = away_team;

    return (
        <div className="content_body" id={`${fixture}_goals`}>
        <Helmet>
          <title>{fixture} - Goals: free betting prediction and insights </title>
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
                    <MatchDetails league={league} type_of_match={type_of_match} />
                    <TeamInfo team={away_team} />
                </div>
                <div className="match_info_style">
                    <TeamStyle team={home_team} />
                    
                    <TeamStyle team={away_team} />
                </div>
                
            </div>

            <HeadToHeadGoals home_team={home_team} away_team={away_team} goals={goals} x_goals={x_goals} teams={teams}/>
            <RecentMatches title={home_team.name} logo={home_team.team_logo} recent={home_recent} teams={home_team.teams}/>
            <RecentMatches title={away_team.name} logo={away_team.team_logo} recent={away_recent} teams={away_team.teams}/>
            <div className="prediction"  id ="prediction">
                <h5>{fixture} Goal's Prediction</h5>
                {user ? (
                    <Summary fixture={fixture} prediction={prediction.goals} id ="prediction"/>
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

function TeamStyle({ team }) {
    return (
                    
           <ul className='style_of_play'>
                <li title='Goal scored per game'><i className='small_letter'>GS pg:</i> {team.goal_scored_pg}</li>
                <li title='Goal conceded per game'><i className='small_letter'>GC pg:</i> {team.goals_concede_pg}</li>
                
            </ul>
        
    );
}

function MatchDetails({ league, type_of_match }) {
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


function RecentMatches({ title, recent }) {
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

function Summary ({ fixture, prediction }) {
    return (
        <div >
        
            <p>{prediction.discuss}</p>
            <div className='prediction_list'>
                <pre><b>FT Total Goal: </b>{prediction.fulltime_total_goals}</pre>
                <hr/>
                <pre>{prediction.Both_teams_to_score}</pre>
                <hr/>
                
            </div>
        </div>
    );
}

export default Goals;
