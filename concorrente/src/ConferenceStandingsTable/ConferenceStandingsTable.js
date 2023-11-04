import "bootstrap/dist/css/bootstrap.min.css";
import './ConferenceStandingsTable.css';
import {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';

export const ConferenceStandingsTable = () => {
    const [standingsData, setStandingsData] = useState({})
    const standingsUrl = "https://site.api.espn.com/apis/v2/sports/football/college-football/standings"

    const fetchStandingsData = () => {
        return fetch(standingsUrl)
          .then((res) => res.json())
          .then((rawData) => setStandingsData(rawData))
    }

    useEffect(() => {
        fetchStandingsData()
    }, [])

    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team</th>
                    <th>Record</th>
                    <th>Conf. Record</th>
                    <th>Games Back</th>
                </tr>
            </thead>
            <tbody>
                {
                    standingsData.uid !== undefined ?
                    standingsData.children
                        .filter((child) => child.id === "1")[0].standings.entries
                        .map((teamEntry) => {
                            return {
                                accRank: teamEntry.stats[3].value,
                                name: teamEntry.team.displayName,
                                logo: teamEntry.team.logos[0].href,
                                record: teamEntry.stats[12].displayValue,
                                confRecord: teamEntry.stats[51].displayValue,
                                gamesBack: teamEntry.stats[40].dislayValue
                            }
                        })
                        .sort((t1, t2) => t1.accRank - t2.accRank)
                        .map((team, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{team.accRank}</td>
                                    <td><img height="15px" src={team.logo} alt={team.name + " logo"}/> {team.name}</td>
                                    <td>{team.record}</td>
                                    <td>{team.confRecord}</td>
                                    <td>{team.gamesBack}</td>
                                </tr>
                            )
                        })
                    : <tr></tr>
                }
            </tbody>
        </Table>




    )
}