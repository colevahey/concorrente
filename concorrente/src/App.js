import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const uncUrl = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/unc/schedule';
  const [data, setData] = useState({});

  const fetchData = () => {
    return fetch(uncUrl)
      .then((res) => res.json())
      .then((rawData) => setData(rawData) && console.log(rawData))
  }

  const determineResult = (data) => {
    let events = data.events
    if (events === undefined) {
      return undefined
    }
    let mostRecentGame = events.reduce((final, current) => current.competitions[0].status.type.completed ? current : final)
    let uncTeam = mostRecentGame.competitions[0].competitors.filter((team) => team.team.id == 153)[0]
    let otherTeam = mostRecentGame.competitions[0].competitors.filter((team) => team.team.id != 153)[0]
    let didUncWin = uncTeam.winner
    let score = uncTeam.score.displayValue + "-" + otherTeam.score.displayValue
    let record = uncTeam.record[0].displayValue + " (" + uncTeam.record[1].displayValue + ")"
    return [didUncWin, score, record]
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          did unc win
        </p>
      </header>
      <div className="App-body">
        <p className={"result" + determineResult(data) == undefined ? "" : determineResult(data) ? "yes" : "no"}>
          {
            determineResult(data) == undefined ? "" : determineResult(data)[0] ? "YES" : "NO"
          }
        </p>
        <p>
          {
            determineResult(data) == undefined ? "" :
            ((determineResult(data)[0] ? "W " : "L") + " " + determineResult(data)[1])
          }
        </p>
        <p>
          {
            determineResult(data) == undefined ? "" : "Record: " + determineResult(data)[2]
          }
        </p>
      </div>
    </div>
  );
}

export default App;
