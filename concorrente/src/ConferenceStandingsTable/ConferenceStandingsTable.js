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
                        .map((teamEntry, rank) => [
                            rank + 1, 
                            teamEntry.team.displayName,         // Team name
                            teamEntry.team.logos[0].href,       // Logo
                            teamEntry.stats[12].displayValue,   // Record
                            teamEntry.stats[51].displayValue,   // Conf Record
                            teamEntry.stats[40].displayValue    // Games back
                        ]).map(row => {
                            return (
                                <tr key={row[0]}>
                                    <td>{row[0]}</td>
                                    <td><img height="15px" src={row[2]} alt={row[1] + " logo"}/> {row[1]}</td>
                                    <td>{row[3]}</td>
                                    <td>{row[4]}</td>
                                    <td>{row[5]}</td>
                                </tr>
                            )
                        })
                    : <tr></tr>
                }
            </tbody>
        </Table>




    )
}