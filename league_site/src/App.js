import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './zaynopfptransparent.png';
import './App.css';
import Navbar from './components/navbar.js';
import Searcher from './components/fullsummoner.js';
import Lily from './components/lily.js';
import Profile from './components/profile.js';
import Champion from './components/champion.js';
import Matchup from './components/matchup.js';
import Footer from './components/footer.js';
import Riot from './components/riot.js';
function App() {
  return (
    <Router>
      {/* Define Routes */}
      <Routes>
        {/* Home page with all components */}
        <Route 
          path="/" 
          element={
            <div className="App">
              <header className="App-header">
                <Navbar />
                <Lily />
                <img src={logo} className="App-logo" alt="logo" />
                <Searcher />
                <div className="note">
                  <h4>First time using this website? It might take a while to enter your data. Please come back later after searching your ign.</h4>
                </div>
                <Footer />
              </header>
            </div>
          } 
        />

        {/* Profile route as a separate page */}
        <Route path="/profile/:region/:ign/:tag/:champion/:opponent/:lane" element={<Matchup />} />
        <Route path="/profile/:region/:ign/:tag/:champion" element={<Champion />} />
        <Route path="/profile/:region/:ign/:tag" element={<Profile />} />
        <Route path="*" element={<Riot />} />
      </Routes>
    </Router>
  );
}

export default App;
