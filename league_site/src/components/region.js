import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
export default function CountrySelectDemo() {
    const [selectedCountry, setSelectedCountry] = useState(null);

    // Only countries, no states or cities
    const countries = [
        { name: 'North America', code: 'NA' },
        { name: 'Europe West', code: 'EUW' },
        { name: 'Europe Nordic & East', code: 'EUNE' },
        { name: 'Oceania', code: 'OCE'},
        { name: 'Russia', code: 'RU'},
        { name: 'Turkey', code: 'TR'},
        { name: 'Brazil', code: 'BR'},
        { name: 'Latin America North', code: 'LAN'},
        { name: 'Latin America South', code: 'LAS'},
        { name: 'Japan', code: 'JP'},
        { name: 'Taiwan', code: 'TW'},
        { name: 'Singapore, Malaysia, Indonesia', code: 'SEA'},
        { name: 'Thailand', code: 'TH'},
        { name: 'Philippines', code: 'PH'},
        { name: 'Middle East', code: 'ME'}
    ];

    // Custom template to display country
    const countryOptionTemplate = (option) => {
        return <span>{option.name}</span>;  // Display country name
    };

    return (
        <div>
            <Dropdown 
                value={selectedCountry} 
                onChange={e => setSelectedCountry(e.value)} 
                options={countries} 
                optionLabel="name"  // Label for countries
                placeholder="Select a Region" 
                itemTemplate={countryOptionTemplate}  // Custom item display for countries
                style={{ minWidth: '18rem' }} 
                 className="w-full md:w-18rem custom-dropdown"
            />
        </div>
    );
}
