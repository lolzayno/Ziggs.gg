import React from 'react';
import { useLocation } from 'react-router-dom';

function Riot() {
  const location = useLocation();

  if (location.pathname === "//riot.txt") {
    return (
      <div>
        <h1>Riot Verification</h1>
        <p>Please click the link below to view the riot.txt file:</p>
        <a href="http://localhost:5000//riot.txt" target="_blank" rel="noopener noreferrer">
          View Riot.txt
        </a>
      </div>
    );
  }

  return null;
}

export default Riot;
