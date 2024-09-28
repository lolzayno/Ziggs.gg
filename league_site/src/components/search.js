import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './search.css'; // Ensure this file contains the updated CSS
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import 'primeicons/primeicons.css';

function Search({ summonerName, region }) {
    const [input, setInput] = useState(summonerName || '');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true); // Start loading when form is submitted

        axios.post('http://localhost:5000/', { summonerName: input, region: region })
            .then(response => {
                setLoading(false); // Stop loading after data is fetched
                navigate(`/profile/${region}/${input.split('#')[0]}/${input.split('#')[1]}`, { state: { userData: response.data }});
                console.log('Server response:', response.data);
            })
            .catch(error => {
                setLoading(false); // Stop loading on error
                console.error('Error sending data to the server:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="input-button-container">
                    <div className="float-label-wrapper">
                        <FloatLabel>
                            <InputText
                                id="input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="wide-input"
                            />
                            <label htmlFor="input" className="custom-label">Enter Your Summoner Name (For ex. Zayno#NA1)</label>
                        </FloatLabel>
                    </div>
                    <Button 
                        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-search"} // Toggle icons based on loading state
                        rounded 
                        text 
                        raised 
                        severity="success" 
                        aria-label="Search" 
                        className="search-button"
                        disabled={loading} // Disable the button while loading
                    />
                </div>
            </form>
        </div>
    );
}

export default Search;
