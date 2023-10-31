import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const uncUrl = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/unc/schedule';
  const teamUrl = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/unc';
  const [scheduleData, setScheduleData] = useState({});
  const [teamData, setTeamData] = useState({});

  const fetchData = () => {
    return fetch(uncUrl)
      .then((res) => res.json())
      .then((rawData) => setScheduleData(rawData))
  }

  const fetchTeamData = () => {
    return fetch(teamUrl)
      .then((res) => res.json())
      .then((rawData) => setTeamData(rawData))
  }

  const determineResult = (data) => {
    let results = {}
    let events = data.events
    if (events === undefined) {
      return undefined
    }
    let mostRecentGame = events.reduce((final, current) => current.competitions[0].status.type.completed ? current : final)
    let uncTeam = mostRecentGame.competitions[0].competitors.filter((team) => team.team.id === "153")[0]
    let otherTeam = mostRecentGame.competitions[0].competitors.filter((team) => team.team.id !== "153")[0]
    results.didUncWin = uncTeam.winner
    results.score = uncTeam.score.displayValue + "-" + otherTeam.score.displayValue
    results.record = uncTeam.record[0].displayValue + " (" + uncTeam.record[1].displayValue + ")"
    return results
  }

  const uncInfo = (data) => {
    let info = {}
    let unc = data.team
    if (unc === undefined) {
      return undefined
    }
    info.rank = unc.rank
    return info
  }

  useEffect(() => {
    fetchData();
    fetchTeamData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          did unc win
        </p>
      </header>
      <div className="App-body">
        <p className={determineResult(scheduleData) === undefined ? "" : determineResult(scheduleData).didUncWin ? "yes" : "no"}>
          {
            determineResult(scheduleData) === undefined ? "" : determineResult(scheduleData).didUncWin ? "YES" : "NO"
          }
        </p>
        <p>
          {
            determineResult(scheduleData) === undefined ? "" :
            ((determineResult(scheduleData).didUncWin ? "W " : "L") + " " + determineResult(scheduleData).score)
          }
          <br></br>
          {
            determineResult(scheduleData) === undefined ? "" :
            ("Record: " + determineResult(scheduleData).record)
          }
          <br></br>
          {
            uncInfo(teamData) === undefined ? "" :
            ("Rank: " + (uncInfo(teamData).rank !== undefined ? uncInfo(teamData).rank : "NR"))
          }
        </p>
      </div>
    </div>
  );
}

export default App;
