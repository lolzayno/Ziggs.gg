import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import './matchup.css';

function Matchup() {
    const { region, ign, tag, champion, opponent, lane } = useParams();
    const [championData, setChampionData] = useState(null);

    useEffect(() => {
        // Fetch champion data based on the URL parameters
        axios.get(`http://localhost:5000/profile/${region}/${ign}/${tag}/${champion}/${opponent}/${lane}`)
            .then(response => {
                setChampionData(response.data);
            })
            .catch(error => {
                console.error('Error fetching champion data:', error);
            });
    }, [region, ign, tag, champion, opponent, lane]);
    if (!championData) {
        return <p>Loading...</p>;
    }
    let match_history = championData['match_history']
    return (
        <div className="profile">
            <div className='profile-header'>
                <h1>Summoner Profile</h1>
                <p>Summoner Name: {ign}</p>
                <p>Summoner Tag: {tag}</p>
                <p>Region: {region}</p>
                <div className="container">
                    {match_history.length > 0 ? (
                        <div>
                            <h2>Match history against { opponent } in lane: { lane }</h2>
                            <ul>
                                {match_history.map(match => (
                                    <li key={match[2]}>
                                        <strong>{match[5]}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No champions found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Matchup;
