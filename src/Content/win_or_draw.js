import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';

import './../App.css';
import './content.css';

import { auth } from '../week14/comment/firebaseConfig';
import { Helmet } from 'react-helmet';
import AuthPre from '../week14/comment/Authpre';


function WinOrDraw({ content }) {

    ReactGA.send({
        hitType:"pageview",
        page:"/",
        title:"Win or Draw",
    });

    const [user, setUser] = useState(null);
    
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
        });
    
        return () => unsubscribe();
      }, []);


   
    if (!content) return null;

    const { home_team, away_team, league, type_of_match, head_to_head, prediction, fixture, position } = content;
    const { goals, x_goals, teams, win_form } = head_to_head;
    const { recent_matches: home_recent } = home_team;
    const { recent_matches: away_recent } = away_team;

    return (
        <div className="content_body" id={`${fixture}_goals`}>
        <Helmet>
          <title>{fixture} - Win or Draw: free betting prediction and insights </title>
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
                
                <div className="form_h2h">
                    <H2HHomeForm form={win_form}/>
                    <i>H2H form</i>
                    <H2HAwayForm form={win_form}/>
                </div>
                <span id='position' className="form_h2h">
                    <button>{position[0]}</button>
                    <i>League Position</i>
                    <button>{position[1]}</button>
                </span>
                
            </div>

             
            <HeadToHeadGoals home_team={home_team} away_team={away_team} goals={goals} x_goals={x_goals} teams={teams} form={win_form} position={position}/>
            <RecentMatches title={home_team.name} logo={home_team.team_logo} recent={home_recent} teams={home_team.teams} form={home_team.win_form}/>
            <RecentMatches title={away_team.name} logo={away_team.team_logo} recent={away_recent} teams={away_team.teams} form={away_team.win_form}/>
            <div className="prediction"  id ="prediction">
                <h4>{fixture} Win or Draw Prediction</h4>
                {user ? (
                    <Summary fixture={fixture} prediction={prediction.win_draw} id ="prediction"/>
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

function H2HHomeForm({ form }) {
    return (
        <div className="form">
            {form[0].map((letter, index) => (
                <i key={index} className={`${letter}`}>
                    {letter}
                </i>
            ))}
        </div>
    );
}
function H2HAwayForm({ form }) {
    return (
        <div className="form">
            {form[1].map((letter, index) => (
                <i key={index} className={`${letter}`}>
                    {letter}
                </i>
            ))}
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

function HeadToHeadGoals({ goals, form, teams }) {
    return (
        <div className="head_to_head">
        <h3>Head to Head</h3>
            <table>
                <thead>
                    <tr>
                        <th id="Small_icon"> </th>
                        
                        <th id="stadium">Goals</th>
                        
                        <th id="Small_icon"> </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(goals).map((match, index) => (
                        <tr key={index}>
                            <td id="team_name">{teams[match][0]}</td>
                            
                            <td>{goals[match][0]} : {goals[match][1]}</td>
                            
                            <td id="team_name">{teams[match][1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function RecentMatches({ title, form, recent }) {
    return (
        <div className="recent_matches">
        <h3>Recent {title} Matches</h3>
            <table>
                <thead>
                    <tr>
                        <th id="Small_icon"> </th>
                        <th>Goals</th>
                        <th id="stadium">Form</th>
                        <th>Goals</th>
                        <th id="Small_icon"> </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(recent.goals).map((match, index) => (
                        <tr key={index}>
                            <td id="team_name">{recent.teams[match][0]} </td>
                            <td>{recent.goals[match][0]} </td>
                            <td className={form[index]}>{form[index]}</td>
                            <td>{recent.goals[match][1]}</td>
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
                <li><span className='bold'>{prediction.win_or_draw}</span></li>
                
            </ul>
        </div>
    );
}

export default WinOrDraw;
