import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Paginator } from 'primereact/paginator';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import './champion.css';
import Navbar from './navbar.js';
import ProfileIcon from './profileicon.js';
import RuneIcon from './runeIcon.js';
import RuneText from './textoutputaveragerune.js';
import ItemIcon from './itemIcon.js';
import { TabView, TabPanel } from 'primereact/tabview';
import MasterChampionIcon from './MasterChampionIcon.js';
import FooterOther from './footerother.js';
import MasterBarChart from './MasterBarChart.js';
import MasterDoughnut from './MasterDoughnut.js';

function Champion() {
    const navigate = useNavigate();
    const { region, ign, tag, champion } = useParams();
    const [championData, setChampionData] = useState(null);
    const [runeFirst, setRuneFirst] = useState(0);
    const [runeRows, setRuneRows] = useState(5);
    const [itemFirst, setItemFirst] = useState(0);
    const [itemRows, setItemRows] = useState(5);
    const [matchuptopFirst, setMatchuptopFirst] = useState(0);
    const [matchuptopRows, setMatchuptopRows] = useState(5);
    const [matchupjgFirst, setMatchupjgFirst] = useState(0);
    const [matchupjgRows, setMatchupjgRows] = useState(5);
    const [matchupmidFirst, setMatchupmidFirst] = useState(0);
    const [matchupmidRows, setMatchupmidRows] = useState(5);
    const [matchupbotFirst, setMatchupbotFirst] = useState(0);
    const [matchupbotRows, setMatchupbotRows] = useState(5);
    const [matchupsupFirst, setMatchupsupFirst] = useState(0);
    const [matchupsupRows, setMatchupsupRows] = useState(5);
    const [isUpdating, setIsUpdating] = useState(false);
    // Handlers for paginator changes
    const onRunePageChange = (event) => {
        setRuneFirst(event.first);
        setRuneRows(event.rows);
    };
    const onItemPageChange = (event) => {
        setItemFirst(event.first);
        setItemRows(event.rows);
    };
    const onMatchuptopPageChange = (event) => {
        setMatchuptopFirst(event.first);
        setMatchuptopRows(event.rows);
    };
    const onMatchupjgPageChange = (event) => {
        setMatchupjgFirst(event.first);
        setMatchupjgRows(event.rows);
    };
    const onMatchupmidPageChange = (event) => {
        setMatchupmidFirst(event.first);
        setMatchupmidRows(event.rows);
    };
    const onMatchupbotPageChange = (event) => {
        setMatchupbotFirst(event.first);
        setMatchupbotRows(event.rows);
    };
    const onMatchupsupPageChange = (event) => {
        setMatchupsupFirst(event.first);
        setMatchupsupRows(event.rows);
    };
    useEffect(() => {
        // Fetch champion data based on the URL parameters
        axios.get(`http://localhost:5000/profile/${region}/${ign}/${tag}/${champion}`)
            .then(response => {
                setChampionData(response.data);
            })
            .catch(error => {
                console.error('Error fetching champion data:', error);
            });
    }, [region, ign, tag, champion]);
    if (!championData) {
        return <p>Loading...</p>;
    }
    let runes = championData['runes'] || [];
    let items = championData['items'] || [];
    let averages = championData['averages'] || [];
    let matchups_top = championData['matchups_top'] || [];
    let matchups_jg = championData['matchups_jg'] || [];
    let matchups_mid = championData['matchups_mid'] || [];
    let matchups_bot = championData['matchups_bot'] || [];
    let matchups_sup = championData['matchups_sup'] || [];
    let icon = championData['icon'];
    let level = championData['level'];

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
        const response = await axios.post(`/profile/${region}/${ign}/${tag}/${champion}`);
        
        // Assuming the backend sends the necessary data, 
        // you can use it to update the current state or navigate.
        if (response.status === 200) {
            // Replace this with the page you want to navigate to after the update
            navigate(`/profile/${region}/${ign}/${tag}/${champion}`, { state: { data: response.data } });
        }
        } catch (error) {
        console.error('Error updating profile:', error);
        }
        finally {
            setIsUpdating(false);  // Set loading state back to false
        }
    };

    return (
        <body>
            <div className="content">
                <div className="wrapper">
                    <Navbar />
                    <div className="champion">
                        <div className="card-top">
                            <Card title="Summoner">
                                <ProfileIcon
                                profileIconId={icon}
                                height="128px"
                                width="128px"
                                />
                                <div>
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
                            </Card>
                            <Card title="Champion:">
                                <MasterChampionIcon
                                championId={champion}
                                height="128px"
                                width="128px"
                                />
                                <h4>Games Played: {averages[3]}</h4>
                                <h4>Games Won: {averages[4]}</h4>
                                <h4>Games Lost: {averages[5]}</h4>
                                <h4>Winrate: {Math.floor(100 * averages[6])}%</h4>
                            </Card>
                            <Card title="Games Played/Winrate:">
                                <TabView>
                                    <TabPanel header="Lane Stats">
                                        <div className="charts-container">
                                            <div className="graph-container">
                                                <h3>Games Played in Each Lane:</h3>
                                                <MasterDoughnut
                                                labels={['Top', 'Jungle', 'Mid', 'Bot', 'Support']}
                                                data={[averages[17], averages[22], averages[12], averages[7], averages[27]]}
                                                backgroundcolor={['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(54, 162, 235, 0.2)']}
                                                bordercolor={['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)', 'rgba(54, 162, 235, 1)']}
                                                label='Games Played'
                                                height='325px'
                                                width='325px'
                                                />
                                            </div>
                                            <div className="graph-container">
                                                <h3>Winrate in Each Lane:</h3>
                                                <MasterBarChart
                                                labels={['Top', 'Jungle', 'Mid', 'Bot', 'Support']}
                                                data={[averages[21], averages[26], averages[16], averages[11], averages[31]]}
                                                backgroundcolor={['rgba(75, 192, 192, 0.2)', 'rgba(99, 167, 219, 0.2)', 'rgba(61, 96, 122, 0.2)', 'rgba(13, 108, 181, 0.2)']}
                                                bordercolor={['rgba(75, 192, 192, 1)', 'rgba(99, 167, 219, 1)', 'rgba(61, 96, 122, 1)', 'rgba(13, 108, 181, 1)']}
                                                x='Lanes'
                                                y='Winrate'
                                                height='325px'
                                                width='325px'
                                                />
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Game Duration Stats">
                                        <div className="charts-container">
                                            <div className="graph-container">
                                                <h3>Games Played for each Game Duration:</h3>
                                                <MasterDoughnut
                                                labels={['< 20 minutes', '< 25 minutes', '< 30 minutes', '< 35 minutes', '< 40 minutes', '< 45 minutes', '< 50 Minutes', '> 50 Minutes']}
                                                data={[averages[69], averages[71], averages[73], averages[75], averages[77], averages[79], averages[81], averages[83]]}
                                                backgroundcolor={['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(54, 162, 235, 0.2)']}
                                                bordercolor={['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)', 'rgba(54, 162, 235, 1)']}
                                                label="Games Played"
                                                height="325px"
                                                width="325px"
                                                />
                                            </div>
                                            <div className="graph-container">
                                                <h3>Winrate for each Game Duration:</h3>
                                                <MasterBarChart
                                                labels={['< 20 minutes', '< 25 minutes', '< 30 minutes', '< 35 minutes', '< 40 minutes', '< 45 minutes', '< 50 Minutes', '> 50 Minutes']}
                                                data={[averages[70], averages[72], averages[74], averages[76], averages[78], averages[80], averages[82], averages[84]]}
                                                backgroundcolor={['rgba(75, 192, 192, 0.2)', 'rgba(99, 167, 219, 0.2)', 'rgba(61, 96, 122, 0.2)', 'rgba(13, 108, 181, 0.2)']}
                                                bordercolor={['rgba(75, 192, 192, 1)', 'rgba(99, 167, 219, 1)', 'rgba(61, 96, 122, 1)', 'rgba(13, 108, 181, 1)']}
                                                x="Game Duration"
                                                y="Winrate"
                                                height="325px"
                                                width="325px"
                                                />
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabView>
                            </Card>
                            <Card title="Champion Averages:">
                                <TabView>
                                    <TabPanel header="General">
                                        <div className="card-container">
                                            <Card title="Combat:">
                                                <p>KDA: {averages[32]}/{averages[33]}/{averages[34]}</p>
                                                <p>Kill Participation: {Math.floor(100 * averages[36])}%</p>
                                                <p>Solo Kills: {averages[52]}</p>
                                            </Card>
                                            <Card title="Experience:">
                                                <p>Champion Level: {averages[37]}</p>
                                                <p>Total EXP: {averages[65]}</p>
                                                <p>EXP Per Minute: {averages[66]}</p>
                                            </Card>
                                            <Card title="Gold:">
                                                <p>Total Gold: {averages[67]}</p>
                                                <p>Gold per Minute: {averages[38]}</p>
                                                <p>Turret Plates: {averages[57]}</p>
                                                <p>Turret Takedowns: {averages[58]}</p>
                                            </Card>
                                            <Card title="Minions:">
                                                <p>Total Minions: {averages[44]}</p>
                                                <p>Minions per Minute: {averages[45]}</p>
                                                <p>Minions during first 10 Minutes: {averages[61]}</p>
                                            </Card>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Other">
                                        <div className="card-container">
                                            <Card title="Vision:">
                                                <p>Control Wards Placed: {averages[39]}</p>
                                                <p>Stealth Wards Placed: {averages[40]}</p>
                                            </Card>
                                            <Card title="Damage:">
                                                <p>Damage per minute: {averages[48]}</p>
                                                <p>Team Damage %: {100 * averages[49]}</p>
                                                <p>Team Damage Taken %: {100 * averages[50]}</p>
                                            </Card>
                                            <Card title="Dodging/Skillshots:">
                                                <p>Total Close Dodges: {averages[51]}</p>
                                                <p>Skillshots dodged: {averages[63]}</p>
                                                <p>Skillshots landed (early): {averages[62]}</p>
                                                <p>Total Skillshots landed: {averages[64]}</p>
                                            </Card>
                                            <Card title="CC:">
                                                <p>Enemy Immobilized: {averages[59]}</p>
                                                <p>Enemy was knocked into team: {averages[60]}</p>
                                                <p>Total time opponent CC'd: {averages[68]} sec</p>
                                            </Card>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Damage (Champs)">
                                        <h2>Total Damage Dealt to Champions:</h2>
                                        <MasterDoughnut
                                        labels={['True Damage', 'Physical Damage', 'Magic Damage']}
                                        data={[averages[43] - averages[42] - averages[41], averages[42], averages[41]]}
                                        backgroundcolor={['rgba(176, 171, 171, 0.2)', 'rgba(255, 99, 161, 0.2)', 'rgba(54, 162, 235, 0.2)']}
                                        bordercolor={['rgba(176, 171, 171, 1)', 'rgba(255, 99, 161, 1)', 'rgba(54, 162, 235, 1)']}
                                        label="Damage"
                                        height="325px"
                                        width="325px"
                                        />
                                    </TabPanel>
                                    <TabPanel header="Damage (Obj)">
                                        <h2>Total Damage Dealt to Objectives:</h2>
                                        <MasterDoughnut
                                        labels={['Objective Damage', 'Turret Damage']}
                                        data={[averages[46], averages[47]]}
                                        backgroundcolor={['rgba(81, 68, 100, 0.2)', 'rgba(197, 166, 245, 0.2)']}
                                        bordercolor={['rgba(81, 68, 100, 1)', 'rgba(197, 166, 245, 1)']}
                                        label="Damage"
                                        height="325px"
                                        width="325px"
                                        />
                                    </TabPanel>
                                    <TabPanel header="Abilities">
                                        <MasterBarChart
                                        labels={["Q", "W", "E", "R"]}
                                        data={[averages[53], averages[54], averages[55], averages[56]]}
                                        backgroundcolor={['rgba(75, 192, 192, 0.2)', 'rgba(99, 167, 219, 0.2)', 'rgba(61, 96, 122, 0.2)', 'rgba(13, 108, 181, 0.2)']}
                                        bordercolor={['rgba(75, 192, 192, 1)', 'rgba(99, 167, 219, 1)', 'rgba(61, 96, 122, 1)', 'rgba(13, 108, 181, 1)']}
                                        x="Abilities"
                                        y="# of Casts"
                                        height="325px"
                                        width="325px"
                                        />
                                    </TabPanel>
                                </TabView>
                            </Card>
                        </div>
                        <div className="container">
                            <div className="card">
                                {runes.length > 0 ? (
                                    <div>
                                        <Card title="Runes Stats:">
                                            <ul>
                                                {runes.slice(runeFirst, runeFirst + runeRows).map(rune => (
                                                <div className="match-display" key={rune[3]}>
                                                    <Accordion activeIndex={-1}>
                                                        <AccordionTab
                                                            header={
                                                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                                    {/* Container for the RuneIcon */}
                                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                                                                        <RuneIcon
                                                                        runeIcon={rune[3]}
                                                                        height="48px"
                                                                        width="48px"
                                                                        />
                                                                    </div>
                                                                    {/* Container for the text */}
                                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                        <h3 style={{ margin: 0 }}>{rune[3]}</h3>
                                                                    </div>
                                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                        <h4 style={{ margin: 0 }}>Pickrate: {rune[8]}</h4>
                                                                    </div>
                                                                </div>
                                                            }>
                                                            <h3>Games played:</h3>
                                                            <p>{rune[4]} ({rune[5]}W/{rune[6]}L)</p>
                                                            <h3>Winrate:</h3>
                                                            <p>{Math.floor(100 * rune[7])}%</p>
                                                            <RuneText rune={rune[3]} var1={rune[9]} var2={rune[10]} var3={rune[11]}/>
                                                        </AccordionTab>
                                                    </Accordion>
                                                </div>
                                                ))} 
                                            </ul>
                                            <Paginator first={runeFirst} rows={runeRows} totalRecords={runes.length} rowsPerPageOptions={[4, 8, 10]} onPageChange={onRunePageChange} />
                                        </Card>
                                    </div>
                                ) : (
                                <p>No runes found.</p>
                                )}
                            </div>
                            <div className="card">
                                {items.length > 0 ? (
                                    <div>
                                        <Card title="Items Stats:">
                                            <ul>
                                                {items.slice(itemFirst, itemFirst + itemRows).map(item => (
                                                <div className="match-display" key={item[3]}>
                                                    <Accordion activeIndex={-1}>
                                                        <AccordionTab
                                                            header={
                                                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                                    {/* Container for the ItemIcon */}
                                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                                                                        <ItemIcon
                                                                        itemIcon={item[3]}
                                                                        height="48px"
                                                                        width="48px"
                                                                        />
                                                                    </div>
                                                                    {/* Container for the text */}
                                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                        <h3 style={{ margin: 0 }}>{item[3]}</h3>
                                                                    </div>
                                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                        <h4 style={{ margin: 0 }}>Pickrate: {item[8]}</h4>
                                                                    </div>
                                                                </div>
                                                            }>
                                                                <h3>Games played:</h3>
                                                                <p>{item[4]} ({item[5]}W/{item[6]}L)</p>
                                                                <h3>Winrate:</h3>
                                                                <p>{Math.floor(100 * item[7])}%</p>
                                                        </AccordionTab>
                                                    </Accordion>
                                                </div >
                                                ))}
                                            </ul>
                                            <Paginator first={itemFirst} rows={itemRows} totalRecords={items.length} rowsPerPageOptions={[4, 8, 10]} onPageChange={onItemPageChange} />
                                        </Card>
                                    </div>
                                ) : (
                                <p>No items found.</p>
                                )}
                            </div>
                            <div className="card">
                                <Card title="Matchup Stats:">
                                    <TabView>
                                        <TabPanel header="Top Lane">
                                            {matchups_top.length > 0 ? (
                                                <div>
                                                    <ul>
                                                        {matchups_top.slice(matchuptopFirst, matchuptopFirst + matchuptopRows).map(matchuptop => (
                                                            <div className="match-display" key={matchuptop[3]}>
                                                                <Accordion activeIndex={-1}>
                                                                    <AccordionTab
                                                                        header={
                                                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                                                {/* Container for the ItemIcon */}
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                                                                                    <MasterChampionIcon
                                                                                    championId={matchuptop[3]}
                                                                                    height="48px"
                                                                                    width="48px"
                                                                                    />
                                                                                </div>
                                                                                {/* Container for the text */}
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                                    <h3 style={{ margin: 0 }}>{matchuptop[3]}</h3>
                                                                                </div>
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                                    <h4 style={{ margin: 0 }}>Games Played: {matchuptop[5]}</h4>
                                                                                </div>
                                                                            </div>
                                                                        }>
                                                                        <h3>Games Won:</h3>
                                                                        <p>{matchuptop[6]}</p>
                                                                        <h3>Games Lost:</h3>
                                                                        <p>{matchuptop[7]}</p>
                                                                        <h3>Winrate: {100 * matchuptop[8]}%</h3>
                                                                    </AccordionTab>
                                                                </Accordion>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                    <Paginator first={matchuptopFirst} rows={matchuptopRows} totalRecords={matchups_top.length} rowsPerPageOptions={[5, 10, 15]} onPageChange={onMatchuptopPageChange} />
                                                </div>
                                            ) : (
                                                <p>No items found.</p>
                                            )}
                                        </TabPanel>
                                        <TabPanel header="Jungle">
                                            {matchups_jg.length > 0 ? (
                                                <div>
                                                    <ul>
                                                        {matchups_jg.slice(matchupjgFirst, matchupjgFirst + matchupjgRows).map(matchupjg => (
                                                            <div className="match-display" key={matchupjg[3]}>
                                                                <Accordion activeIndex={-1}>
                                                                    <AccordionTab
                                                                        header={
                                                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                                                {/* Container for the ItemIcon */}
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                                                                                    <MasterChampionIcon
                                                                                    championId={matchupjg[3]}
                                                                                    height="48px"
                                                                                    width="48px"
                                                                                    />
                                                                                </div>
                                                                                {/* Container for the text */}
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                                    <h3 style={{ margin: 0 }}>{matchupjg[3]}</h3>
                                                                                </div>
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                                    <h4 style={{ margin: 0 }}>Games Played: {matchupjg[5]}</h4>
                                                                                </div>
                                                                            </div>
                                                                        }>
                                                                        <h3>Games Won:</h3>
                                                                        <p>{matchupjg[6]}</p>
                                                                        <h3>Games Lost:</h3>
                                                                        <p>{matchupjg[7]}</p>
                                                                        <h3>Winrate: {100 * matchupjg[8]}%</h3>
                                                                    </AccordionTab>
                                                                </Accordion>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                    <Paginator first={matchupjgFirst} rows={matchupjgRows} totalRecords={matchups_jg.length} rowsPerPageOptions={[5, 10, 15]} onPageChange={onMatchupjgPageChange} />
                                                </div>
                                            ) : (
                                                <p>No items found.</p>
                                            )}
                                        </TabPanel>
                                        <TabPanel header="Mid Lane">
                                            {matchups_mid.length > 0 ? (
                                                <div>
                                                    <ul>
                                                        {matchups_mid.slice(matchupmidFirst, matchupmidFirst + matchupmidRows).map(matchupmid => (
                                                            <div className="match-display" key={matchupmid[3]}>
                                                                <Accordion activeIndex={-1}>
                                                                    <AccordionTab
                                                                        header={
                                                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                                                {/* Container for the ItemIcon */}
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                                                                                    <MasterChampionIcon
                                                                                    championId={matchupmid[3]}
                                                                                    height="48px"
                                                                                    width="48px"
                                                                                    />
                                                                                </div>
                                                                                {/* Container for the text */}
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                                    <h3 style={{ margin: 0 }}>{matchupmid[3]}</h3>
                                                                                </div>
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                                    <h4 style={{ margin: 0 }}>Games Played: {matchupmid[5]}</h4>
                                                                                </div>
                                                                            </div>
                                                                        }>
                                                                        <h3>Games Won:</h3>
                                                                        <p>{matchupmid[6]}</p>
                                                                        <h3>Games Lost:</h3>
                                                                        <p>{matchupmid[7]}</p>
                                                                        <h3>Winrate: {100 * matchupmid[8]}%</h3>
                                                                    </AccordionTab>
                                                                </Accordion>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                    <Paginator first={matchupmidFirst} rows={matchupmidRows} totalRecords={matchups_mid.length} rowsPerPageOptions={[5, 10, 15]} onPageChange={onMatchupmidPageChange} />
                                                </div>
                                            ) : (
                                                <p>No items found.</p>
                                            )}
                                        </TabPanel>
                                        <TabPanel header="Bot Lane">
                                            {matchups_bot.length > 0 ? (
                                                <div>
                                                    <ul>
                                                        {matchups_bot.slice(matchupbotFirst, matchupbotFirst + matchupbotRows).map(matchupbot => (
                                                            <div className="match-display" key={matchupbot[3]}>
                                                                <Accordion activeIndex={-1}>
                                                                    <AccordionTab
                                                                        header={
                                                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                                                {/* Container for the ItemIcon */}
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                                                                                    <MasterChampionIcon
                                                                                    championId={matchupbot[3]}
                                                                                    height="48px"
                                                                                    width="48px"
                                                                                    />
                                                                                </div>
                                                                                {/* Container for the text */}
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                                    <h3 style={{ margin: 0 }}>{matchupbot[3]}</h3>
                                                                                </div>
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                                    <h4 style={{ margin: 0 }}>Games Played: {matchupbot[5]}</h4>
                                                                                </div>
                                                                            </div>
                                                                        }>
                                                                        <h3>Games Won:</h3>
                                                                        <p>{matchupbot[6]}</p>
                                                                        <h3>Games Lost:</h3>
                                                                        <p>{matchupbot[7]}</p>
                                                                        <h3>Winrate: {100 * matchupbot[8]}%</h3>
                                                                    </AccordionTab>
                                                                </Accordion>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                    <Paginator first={matchupbotFirst} rows={matchupbotRows} totalRecords={matchups_bot.length} rowsPerPageOptions={[5, 10, 15]} onPageChange={onMatchupbotPageChange} />
                                                </div>
                                            ) : (
                                                <p>No items found.</p>
                                            )}
                                        </TabPanel>
                                        <TabPanel header="Support">
                                            {matchups_sup.length > 0 ? (
                                                <div>
                                                    <ul>
                                                        {matchups_sup.slice(matchupsupFirst, matchupsupFirst + matchupsupRows).map(matchupsup => (
                                                            <div className="match-display" key={matchupsup[3]}>
                                                                <Accordion activeIndex={-1}>
                                                                    <AccordionTab
                                                                        header={
                                                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                                                {/* Container for the ItemIcon */}
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
                                                                                    <MasterChampionIcon
                                                                                    championId={matchupsup[3]}
                                                                                    height="48px"
                                                                                    width="48px"
                                                                                    />
                                                                                </div>
                                                                                {/* Container for the text */}
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                                    <h3 style={{ margin: 0 }}>{matchupsup[3]}</h3>
                                                                                </div>
                                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                                    <h4 style={{ margin: 0 }}>Games Played: {matchupsup[5]}</h4>
                                                                                </div>
                                                                            </div>
                                                                        }>
                                                                        <h3>Games Won:</h3>
                                                                        <p>{matchupsup[6]}</p>
                                                                        <h3>Games Lost:</h3>
                                                                        <p>{matchupsup[7]}</p>
                                                                        <h3>Winrate: {100 * matchupsup[8]}%</h3>
                                                                    </AccordionTab>
                                                                </Accordion>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                    <Paginator first={matchupsupFirst} rows={matchupsupRows} totalRecords={matchups_sup.length} rowsPerPageOptions={[5, 10, 15]} onPageChange={onMatchupsupPageChange} />
                                                </div>
                                            ) : (
                                                <p>No items found.</p>
                                            )}
                                        </TabPanel>
                                    </TabView>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterOther/>
        </body>
    );
}

export default Champion;
