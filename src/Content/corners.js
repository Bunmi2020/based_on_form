import React from 'react';
import ReactGA from 'react-ga4';

import './../App.css';
import './content.css';
import StadiumIcon from './../media/stadium.png';
import WeatherIcon from './../media/cloudy_sunny.png';
import PitchIcon from './../media/football-field.png';
import { Helmet } from 'react-helmet';



function Corners({ content }) {

    ReactGA.send({
        hitType:"pageview",
        page:"/",
        title:"Home",
    });

    if (!content) return null;

    const { home_team, away_team, stadium, weather, pitch_condition, type_of_match, head_to_head, summary, fixture } = content;
    const { corners, teams } = head_to_head;
    const { recent_matches: home_recent, unavailable_attacking_players: home_unavailable } = home_team;
    const { recent_matches: away_recent, unavailable_attacking_players: away_unavailable } = away_team;

    return (
        <div className="content_body" id="corners_container">
        <Helmet>
          <title>{fixture} - Corners </title>
        </Helmet>
            <div className="match_info">
                <TeamInfo team={home_team} />
                <MatchDetails stadium={stadium} weather={weather} pitch_condition={pitch_condition} type_of_match={type_of_match} />
                <TeamInfo team={away_team} />
            </div>
            <UnavailablePlayers home_unavailable={home_unavailable} away_unavailable={away_unavailable} />
            
            <HeadToHeadCorners home_team={home_team} away_team={away_team} corners={corners} teams={teams}/>
            <RecentMatches title={home_team.name} logo={home_team.team_logo} recent={home_recent} teams={home_team.teams}/>
            <RecentMatches title={away_team.name} logo={away_team.team_logo} recent={away_recent} teams={away_team.teams}/>
            <Summary summary={summary.corners} id ="prediction"/>
            
        </div>
    );
}

function TeamInfo({ team }) {
    return (
        <div className="team_info">
            <img src={team.team_logo} alt={team.name} />
            <h5>{team.name}</h5>
            <h5 title='Coach'> <span>{team.coach}</span></h5>
            <ul className='style_of_play'>
                <li title='Playing style'>{team.playing_style}</li>
                <li title='Attacking style'>{team.attacking_style}</li>
                <li title='Defensive style'>{team.defensive_style}</li>
            </ul>
        </div>
    );
}

function MatchDetails({ stadium, weather, pitch_condition, type_of_match }) {
    return (
        <table className="match_info_table">
            <tbody>
                <tr>
                    <td id="icon" title='stadium'><img src={StadiumIcon} alt="stadium" /> </td>
                    <td id="stadium">{stadium}</td>
                </tr>
                <tr>
                    <td id="icon" title='weather'><img src={WeatherIcon} alt="weather" /> </td>
                    <td id="weather">{weather}</td>
                </tr>
                <tr>
                    <td id="icon" title='Pitch Condition'><img src={PitchIcon} alt="pitch" /> </td>
                    <td id="pitch">{pitch_condition}</td>
                </tr>
                <tr>
                    <td className='type_of_match' title='Type of Match'>ToM: </td>
                    <td id="type_of_match">{type_of_match}</td>
                </tr>
            </tbody>
        </table>
    );
}

function HeadToHeadCorners({ home_team, away_team, corners, teams }) {
    return (
        <div className="head_to_head">
        <h3>Head to Head</h3>
            <table>
                <thead>
                    <tr>
                        <th id="Small_icon"> </th>
                        <th id="stadium">Corners</th>
                        <th id="Small_icon"> </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(corners).map((match, index) => (
                        <tr key={index}>
                            <td id="team_name">{teams[match][0]}</td>
                            <td>{corners[match][0]} : {corners[match][1]}</td>
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


function RecentMatches({ title, recent }) {
    return (
        <div className="recent_matches">
        <h3>Recent {title} Matches</h3>
            <table>
                <thead>
                    <tr>
                        <th id="Small_icon"> </th>
                        <th id="stadium">Corners</th>
                        <th id="Small_icon"> </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(recent.corners).map((match, index) => (
                        <tr key={index}>
                            <td id="team_name">{recent.teams[match][0]}</td>
                            <td>{recent.corners[match][0]} : {recent.corners[match][1]}</td>
                            <td id="team_name">{recent.teams[match][1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Summary ({ summary }) {
    return (
        <div className="prediction"  id ="prediction">
            <p>{summary.discuss}</p>
            <ul className='prediction_list'>
                <li>{summary.ht}</li>
                <li>{summary.ft}</li>
            </ul>
        </div>
    );
}

export default Corners;
