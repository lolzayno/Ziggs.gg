import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import './profile.css';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import Navbar from './navbar.js';
import { Card } from 'primereact/card';
import ProfileIcon from './profileicon.js';
import RankIcon from './rankicon.js';
import LaneIcon from './laneIcon.js';
import MasterBarChart from './MasterBarChart.js';
import MasterDoughnut from './MasterDoughnut.js';
import { Button } from 'primereact/button';
import RuneIcon from './runeIcon.js';
import ItemIcon from './itemIcon.js';
import { Paginator } from 'primereact/paginator';
import RuneImage from './runeimage.js';
import FooterOther from './footerother.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'primeicons/primeicons.css';
import MasterChampionIcon from './MasterChampionIcon.js';
const runeTreeMapping = {
    "Press the Attack": "Precision",
    "Fleet Footwork": "Precision",
    "Conqueror": "Precision",
    "Absorb Life": "Precision",
    "Triumph": "Precision",
    "Presence of Mind": "Precision",
    "Legend: Alacrity": "Precision",
    "Legend: Haste": "Precision",
    "Legend: Bloodline": "Precision",
    "Coup de Grace": "Precision",
    "Cut Down": "Precision",
    "Last Stand": "Precision",
    "Electrocute": "Domination",
    "Dark Harvest": "Domination",
    "Hail of Blades": "Domination",
    "Cheap Shot": "Domination",
    "Taste of Blood": "Domination",
    "Sudden Impact": "Domination",
    "Zombie Ward": "Domination",
    "Ghost Poro": "Domination",
    "Eyeball Collection": "Domination",
    "Treasure Hunter": "Domination",
    "Relentless Hunter": "Domination",
    "Ultimate Hunter": "Domination",
    "Summon Aery": "Sorcery",
    "Arcane Comet": "Sorcery",
    "Phase Rush": "Sorcery",
    "Nullifying Orb": "Sorcery",
    "Manaflow Band": "Sorcery",
    "Nimbus Cloak": "Sorcery",
    "Transcendence": "Sorcery",
    "Celerity": "Sorcery",
    "Absolute Focus": "Sorcery",
    "Scorch": "Sorcery",
    "Waterwalking": "Sorcery",
    "Gathering Storm": "Sorcery",
    "Grasp of the Undying": "Resolve",
    "Aftershock": "Resolve",
    "Guardian": "Resolve",
    "Demolish": "Resolve",
    "Font of Life": "Resolve",
    "Shield Bash": "Resolve",
    "Conditioning": "Resolve",
    "Second Wind": "Resolve",
    "Bone Plating": "Resolve",
    "Overgrowth": "Resolve",
    "Revitalize": "Resolve",
    "Unflinching": "Resolve",
    "Glacial Augment": "Inspiration",
    "Unsealed Spellbook": "Inspiration",
    "First Strike": "Inspiration",
    "Hextech Flashtraption": "Inspiration",
    "Magical Footwear": "Inspiration",
    "Cash Back": "Inspiration",
    "Triple Tonic": "Inspiration",
    "Time Warp Tonic": "Inspiration",
    "Biscuit Delivery": "Inspiration",
    "Cosmic Insight": "Inspiration",
    "Approach Velocity": "Inspiration",
    "Jack of All Trades": "Inspiration"
};



const determineTreeStyle = (tree) => {
    let borderColor;
    switch (tree) {
        case 'Precision':
            borderColor = '#F3C83D'; // Yellow
            break;
        case 'Sorcery':
            borderColor = '#2C6B9D'; // Blue
            break;
        case 'Domination':
            borderColor = '#C7A2B3'; // Red
            break;
        case 'Resolve':
            borderColor = '#4CAF50'; // Green
            break;
        case 'Inspiration':
            borderColor = '#B3E5FC'; // Light Blue
            break;
        default:
            borderColor = '#ccc'; // Default color
            break;
    }

    return { borderColor }; // Return only the border color
};

function Profile() {
    const location = useLocation();
    let path = location.pathname;
    path = path.split('/');
    let ign = path[3];
    let region = path[2];
    let tag = path[4];
    const userData = location.state?.userData;
    console.log('userData:', userData);

    let champions = userData['champions'];
    let matches = userData['matches'];
    let icon = userData['icon'];
    let level = userData['level'];
    let rank = userData['rank'];
    let soloq_rank = userData['soloq_rank'];
    let soloq_lp = userData['soloq_lp'];
    let soloq_wins = userData['soloq_wins'];
    let soloq_losses = userData['soloq_losses'];
    // State for paginators
    const [championFirst, setChampionFirst] = useState(0);
    const [championRows, setChampionRows] = useState(4);
    const [matchFirst, setMatchFirst] = useState(0);
    const [matchRows, setMatchRows] = useState(5);
    const [isUpdating, setIsUpdating] = useState(false);

    // Handlers for paginator changes
    const onChampionPageChange = (event) => {
        setChampionFirst(event.first);
        setChampionRows(event.rows);
    };

    const onMatchPageChange = (event) => {
        setMatchFirst(event.first);
        setMatchRows(event.rows);
    };

    const navigate = useNavigate();

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
        const response = await axios.post(`/profile/${region}/${ign}/${tag}`);
        
        // Assuming the backend sends the necessary data, 
        // you can use it to update the current state or navigate.
        if (response.status === 200) {
            // Replace this with the page you want to navigate to after the update
            navigate(`/profile/${region}/${ign}/${tag}`, { state: { userData: response.data } });
        }
        } catch (error) {
        console.error('Error updating profile:', error);
        }finally {
            setIsUpdating(false);  // Set loading state back to false
        }
    };
    
    return (
        <body>
            <div className="content">
                <div className="wrapper">
                    <Navbar />
                    <div className="profile">
                        <div className='profile-header'>
                            <div className='summoner-info'>
                                <Card title="Summoner">
                                    <p className="rank-info">
                                        <ProfileIcon
                                        profileIconId={icon}
                                        height="160px"
                                        width="160px"
                                        />
                                        <div className="rank-details">
                                            <h1>{ign}#{tag}</h1>
                                            <p>Level: {level}</p>
                                            <p>Region: {region}</p>
                                            <Button 
                                                label={isUpdating ? "" : "Update"}
                                                icon={isUpdating ? "pi pi-spin pi-spinner" : null}
                                                onClick={handleUpdate}
                                                disabled={isUpdating}
                                                className="p-button-primary"
                                            />
                                        </div>
                                    </p>
                                </Card>
                                <Card title="Ranked Solo">
                                    <div className="rank-info">
                                        <RankIcon
                                        rankIcon={rank}
                                        height="256px"
                                        width="256px"
                                        />
                                        <div className="rank-details">
                                            <p>{rank} {soloq_rank}</p>
                                            <p>LP: {soloq_lp}</p>
                                            <p>Wins: {soloq_wins}</p>
                                            <p>Losses: {soloq_losses}</p>
                                            <p>Winrate: {Math.floor(100 * (soloq_wins / (soloq_wins + soloq_losses)))}%</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="container">
                                {champions.length > 0 ? (
                                    <div>
                                        <Card title="Champions">
                                            <ul>
                                                {champions.slice(championFirst, championFirst + championRows).map(champion => (
                                                    <div className="champion-display">
                                                        <Card
                                                            title={
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    <MasterChampionIcon
                                                                    championId={champion[2]}
                                                                    height="48px"
                                                                    width="48px"
                                                                    />
                                                                    <Link to={`/profile/${region}/${ign}/${tag}/${champion[2]}`}
                                                                        style={{ color: 'inherit' }}
                                                                    >{champion[2]}
                                                                    </Link>
                                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1, justifyContent: "center" }}>
                                                                        <div>
                                                                            <p style={{ margin: 0 , marginTop: '25px'}}>|{champion[3]} Games Played</p>
                                                                        </div>
                                                                        <div>
                                                                            <p style={{ margin: 0 , fontSize: '15px'}}>{Math.round(100 * champion[6])}% WR</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        >
                                                        </Card>
                                                    </div>
                                                ))}
                                            </ul>
                                            <Paginator first={championFirst} rows={championRows} totalRecords={champions.length} rowsPerPageOptions={[4, 8, 10]} onPageChange={onChampionPageChange} />
                                        </Card>
                                    </div>
                                ) : (
                                    <p>No champions found.</p>
                                )}
                                {matches.length > 0 ? (
                                    <div>
                                        <Card title="Matches:">
                                            <ul>
                                                {matches.slice(matchFirst, matchFirst + matchRows).map(match => (
                                                    <div className="match-display">
                                                        <Accordion activeIndex={-1} style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '10px', backgroundColor: match[5] === 'Win' ? '#d4edda' : '#f8d7da' }}>
                                                            <AccordionTab
                                                                header={
                                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                                            <LaneIcon
                                                                            laneIcon={match[6]}
                                                                            height="60px"
                                                                            width="60px"
                                                                            />
                                                                            <MasterChampionIcon
                                                                            championId={match[3]}
                                                                            height="48px"
                                                                            width="48px"
                                                                            />
                                                                            {` vs `}
                                                                            <MasterChampionIcon
                                                                            championId={match[75]}
                                                                            height="48px"
                                                                            width="48px"
                                                                            />
                                                                        </div>
                                                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1, justifyContent: "center" }}>
                                                                            <div>
                                                                                <h2 style={{ margin: 0 }}>{match[7]}/{match[8]}/{match[9]} KDA({match[10]}) KP({Math.round(100 * match[11])}%)</h2>
                                                                            </div>
                                                                            <div>
                                                                                <p style={{ margin: 0 }}>Game Duration: {Math.floor(match[4] / 60)} minutes, {match[4] % 60} seconds</p>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                                            <ItemIcon
                                                                            itemIcon={match[13]}
                                                                            height="48px"
                                                                            width="48px"
                                                                            />
                                                                            <ItemIcon
                                                                            itemIcon={match[14]}
                                                                            height="48px"
                                                                            width="48px"
                                                                            />
                                                                            <ItemIcon
                                                                            itemIcon={match[15]}
                                                                            height="48px"
                                                                            width="48px" 
                                                                            />
                                                                            <ItemIcon
                                                                            itemIcon={match[16]}
                                                                            height="48px"
                                                                            width="48px"
                                                                            />
                                                                            <ItemIcon
                                                                            itemIcon={match[17]}
                                                                            height="48px"
                                                                            width="48px"
                                                                            />
                                                                            <ItemIcon
                                                                            itemIcon={match[18]}
                                                                            height="48px"
                                                                            width="48px"
                                                                            />
                                                                            <ItemIcon
                                                                            itemIcon={match[19]}
                                                                            height="48px"
                                                                            width="48px"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                }
                                                            >
                                                                <TabView>
                                                                    <TabPanel header="General">
                                                                        <div className="card-container">
                                                                            <Card title="Combat:">
                                                                                <p>Kill Participation: {Math.floor(100 * match[11])}%</p>
                                                                                <p>Solo Kills: {match[34]}</p>
                                                                            </Card>
                                                                            <Card title="Experience:">
                                                                                <p>Champion Level: {match[12]}</p>
                                                                                <p>Total EXP: {match[47]}</p>
                                                                                <p>EXP Per Minute: {match[48]}</p>
                                                                            </Card>
                                                                            <Card title="Gold:">
                                                                                <p>Total Gold: {match[49]}</p>
                                                                                <p>Gold per Minute: {match[20]}</p>
                                                                                <p>Exp Per Minute: {match[48]}</p>
                                                                                <p>Turret Plates: {match[39]}</p>
                                                                                <p>Turret Takedowns: {match[40]}</p>
                                                                            </Card>
                                                                            <Card title="Minions:">
                                                                                <p>Total Minions: {match[26]}</p>
                                                                                <p>Minions per Minute: {match[27]}</p>
                                                                                <p>Minions during first 10 Minutes: {match[43]}</p>
                                                                            </Card>
                                                                        </div>
                                                                    </TabPanel>
                                                                    <TabPanel header="Other">
                                                                        <div className="card-container">
                                                                            <Card title="Vision:">
                                                                                <p>Control Wards Placed: {match[21]}</p>
                                                                                <p>Stealth Wards Placed: {match[22]}</p>
                                                                            </Card>
                                                                            <Card title="Damage:">
                                                                                <p>Damage per minute: {match[30]}</p>
                                                                                <p>Team Damage percentage: {100 * match[31]}%</p>
                                                                                <p>Team Damage Taken percentage: {100 * match[32]}%</p>
                                                                            </Card>
                                                                            <Card title="Dodging and Skillshots:">
                                                                                <p>Total Close Dodges: {match[33]}</p>
                                                                                <p>Skillshots dodged: {match[45]}</p>
                                                                                <p>Skillshots landed during early game: {match[44]}</p>
                                                                                <p>Total Skillshots landed: {match[46]}</p>
                                                                            </Card>
                                                                            <Card title="CC:">
                                                                                <p>Total times enemy Immobilized: {match[41]}</p>
                                                                                <p>Total times enemy was knocked into team and secured kill: {match[42]}</p>
                                                                                <p>Total time you CC'd an opponent: {Math.floor(match[50] / 60) }minutes and {match[50]%60} seconds</p>
                                                                            </Card>
                                                                        </div>
                                                                    </TabPanel>
                                                                    <TabPanel header="Damage">
                                                                        <h2>Total Damage Dealt to Champions:</h2>
                                                                        <MasterDoughnut 
                                                                        labels={['True Damage', 'Physical Damage', 'Magic Damage']}
                                                                        data={[match[25] - match[24] - match[23], match[24], match[23]]}
                                                                        backgroundcolor={['rgba(176, 171, 171, 0.2)', 'rgba(255, 99, 161, 0.2)', 'rgba(54, 162, 235, 0.2)']}
                                                                        bordercolor={['rgba(176, 171, 171, 1)', 'rgba(255, 99, 161, 1)', 'rgba(54, 162, 235, 1)']}
                                                                        label="Damage"
                                                                        height="325px"
                                                                        width="325px"
                                                                        />
                                                                        <h2>Total Damage Dealt to Objectives:</h2>
                                                                        <MasterDoughnut
                                                                        labels={['Objective Damage', 'Turret Damage']}
                                                                        data={[match[28], match[29]]}
                                                                        backgroundcolor={['rgba(81, 68, 100, 0.2)', 'rgba(197, 166, 245, 0.2)']}
                                                                        bordercolor={['rgba(81, 68, 100, 1)', 'rgba(197, 166, 245, 1)']}
                                                                        label="Damage"
                                                                        height="325px"
                                                                        width="325px"
                                                                        />
                                                                    </TabPanel>
                                                                    <TabPanel header="Runes">
                                                                        <TabView>
                                                                            {/* Tab for Primary Tree */}
                                                                            <TabPanel
                                                                                header={
                                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                        <span>Primary Tree: </span>
                                                                                        <RuneImage rune={runeTreeMapping[match[51]]}/>
                                                                                        <span>{runeTreeMapping[match[51]]}</span>
                                                                                    </div>
                                                                                }
                                                                            >
                                                                                <div className="tab-content" style={determineTreeStyle(runeTreeMapping[match[51]])}>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                                                    {/* Primary Tree (2x2 Grid) */}
                                                                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                                                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: '1' }}>
                                                                                                <div style={{ display: 'flex', gap: '16px' }}>
                                                                                                    <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                                                                                                        <div style={{ boxSizing: 'border-box', width: '100%', padding: '0 8px' }}>
                                                                                                            <h3>{match[51]}</h3>
                                                                                                            <RuneIcon runeIcon={match[51]} var1={match[52]} var2={match[53]} var3={match[54]} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                                                                                                        <div style={{ boxSizing: 'border-box', width: '100%', padding: '0 8px' }}>
                                                                                                            <h3>{match[55]}</h3>
                                                                                                            <RuneIcon runeIcon={match[55]} var1={match[56]} var2={match[57]} var3={match[58]} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div style={{ display: 'flex', gap: '16px' }}>
                                                                                                    <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                                                                                                        <div style={{ boxSizing: 'border-box', width: '100%', padding: '0 8px' }}>
                                                                                                            <h3>{match[59]}</h3>
                                                                                                            <RuneIcon runeIcon={match[59]} var1={match[60]} var2={match[61]} var3={match[62]} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                                                                                                        <div style={{ boxSizing: 'border-box', width: '100%', padding: '0 8px' }}>
                                                                                                            <h3>{match[63]}</h3>
                                                                                                            <RuneIcon runeIcon={match[63]} var1={match[64]} var2={match[65]} var3={match[66]} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>
                                                                            {/* Tab for Secondary Tree */}
                                                                            <TabPanel
                                                                                header={
                                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                        <span>Secondary Tree: </span>
                                                                                        <RuneImage rune={runeTreeMapping[match[67]]}/>
                                                                                        <span>{runeTreeMapping[match[67]]}</span>
                                                                                    </div>
                                                                                }
                                                                            >
                                                                                <div className="tab-content" style={determineTreeStyle(runeTreeMapping[match[67]])}>
                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                                                        {/* Secondary Tree (1x2 Grid) */}
                                                                                        <div style={{ display: 'flex', gap: '16px' }}>
                                                                                            <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                                                                                                <div style={{ boxSizing: 'border-box', width: '100%', padding: '0 8px' }}>
                                                                                                    <h3>{match[67]}</h3>
                                                                                                    <RuneIcon runeIcon={match[67]} var1={match[68]} var2={match[69]} var3={match[70]} />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                                                                                                <div style={{ boxSizing: 'border-box', width: '100%', padding: '0 8px' }}>
                                                                                                    <h3>{match[71]}</h3>
                                                                                                    <RuneIcon runeIcon={match[71]} var1={match[72]} var2={match[73]} var3={match[74]} />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>
                                                                        </TabView>
                                                                    </TabPanel>
                                                                    <TabPanel header="Abilities">
                                                                        <MasterBarChart
                                                                        labels={["Q", "W", "E", "R"]}
                                                                        data={[match[35], match[36], match[37], match[38]]}
                                                                        backgroundcolor={['rgba(75, 192, 192, 0.2)', 'rgba(99, 167, 219, 0.2)', 'rgba(61, 96, 122, 0.2)', 'rgba(13, 108, 181, 0.2)']}
                                                                        bordercolor={['rgba(75, 192, 192, 1)', 'rgba(99, 167, 219, 1)', 'rgba(61, 96, 122, 1)', 'rgba(13, 108, 181, 1)']}
                                                                        x="Abilities"
                                                                        y="# of Casts"
                                                                        height="375px"
                                                                        width="600px"
                                                                        />
                                                                    </TabPanel>
                                                                </TabView>
                                                            </AccordionTab>
                                                        </Accordion>
                                                    </div>
                                                ))}
                                            </ul>
                                            <Paginator first={matchFirst} rows={matchRows} totalRecords={matches.length} rowsPerPageOptions={[5, 10, 15]} onPageChange={onMatchPageChange} />
                                        </Card>
                                    </div>
                                ) : (
                                    <p>No matches found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterOther />
        </body>
    );
}

export default Profile;
