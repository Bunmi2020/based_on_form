import React from 'react';
import ReactGA from 'react-ga4';

import './../App.css';
import './content.css';

import StadiumIcon from './../media/stadium.png';
import WeatherIcon from './../media/cloudy_sunny.png';
import PitchIcon from './../media/football-field.png';
import RefIcon from './../media/whistle.png';
import { Helmet } from 'react-helmet';
import AdSenseComponent from '../AdSense ';
function Cards({ content }) {

    ReactGA.send({
        hitType:"pageview",
        page:"/",
        title:"Cards",
    });

    if (!content) return null;

    const { home_team, away_team, stadium, Weather, pitch_condition, referee, type_of_match, head_to_head, summary, fixture } = content;
    const { fouls, HT_cards, FT_cards, teams } = head_to_head;
    const { recent_matches: home_recent, provocative_players: home_provocative, aggressive_players: home_aggressive } = home_team;
    const { recent_matches: away_recent, provocative_players: away_provocative, aggressive_players: away_aggressive } = away_team;

    return (
        <div className="content_body" id="cards_container">
        <Helmet>
          <title>{fixture} - Cards </title>
        </Helmet>
            <div className="match_info">
                <TeamInfo team={home_team} />
                <MatchDetails stadium={stadium} weather={Weather} pitch_condition={pitch_condition} referee={referee} type_of_match={type_of_match} />
                <TeamInfo team={away_team} />
            </div>
            <ProvocativePlayers home_provocative={home_provocative} away_provocative={away_provocative} />
             
            <AggressivePlayers home_aggressive={home_aggressive} away_aggressive={away_aggressive} />
            <HeadToHeadFouls home_team={home_team} away_team={away_team} fouls={fouls} HT_cards={HT_cards} FT_cards={FT_cards} teams={teams}/>
            <RecentMatches title={home_team.name} logo={home_team.team_logo} recent={home_recent} teams={home_team.teams}/>
            <RecentMatches title={away_team.name} logo={away_team.team_logo} recent={away_recent} teams={away_team.teams}/>
             
            <Summary summary={summary.cards} id ="prediction"/>
            
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
                <li title='Pressing style'>{team.pressing_style}</li>
            </ul>
            
        </div>
    );
}

function MatchDetails({ stadium, weather, pitch_condition, referee, type_of_match }) {
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
                <tr>
                    <td id="icon" title='Referee'><img src={RefIcon} alt="referee" /></td>
                    <td id="referee">{referee.name}</td>
                </tr>
                <tr>
                    <td> </td>
                    <td id="referee" title='fouls per tackle'>f/tkl: {referee.fouls_per_tackle}</td>
                </tr>
                <tr>
                    <td> </td>
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


function Summary ({ fixture, summary }) {
    return (
        <div className="prediction"  id ="prediction">
        <h4>{fixture} Cards' Prediction</h4>
            <p>{summary.discuss}</p>
            <ul className='prediction_list'>
                <li>Halftime: <span className='bold'>{summary.ht}</span> </li>
                <li>Fulltime: <span className='bold'>{summary.ft}</span></li>
            </ul>
        </div>
    );
}

export default Cards;
