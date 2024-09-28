import { useState } from 'react';
import Search from './search.js';
import Region from './region.js';
import './fullsummoner.css';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
function Searcher() {
    const [region, setRegion] = useState('NA'); // Default region

    const handleRegionChange = (selectedRegion) => {
        setRegion(selectedRegion);
    };

    return (
        <div className="searchbar">
            <Region onRegionChange={handleRegionChange} />
            <Search summonerName="" region={region} />
        </div>
    );
}

export default Searcher;
