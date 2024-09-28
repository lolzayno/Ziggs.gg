import React, { useState, useEffect } from 'react';

function RankIcon({ rankIcon, height, width }) {
  const [iconUrl, setIconUrl] = useState('');
  
  useEffect(() => {
    // Map profile icon names to IDs if necessary
    const rankId = rankIcon.toLowerCase();
    const baseUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/';
    const fetchIcon = async () => {
      const url = `${baseUrl}emblem-${rankId}.png`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        setIconUrl(url);
      } catch (error) {
        console.error('Failed to fetch the profile icon:', error);
      }
    };
    
    fetchIcon();
  }, [rankIcon]);

  return ( 
    <div style={{ width: width, height: height, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {iconUrl ? 
        <img src={iconUrl} alt={`Rank Icon ${rankIcon}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        : 'Loading...'
      }
    </div>
  );
}


export default RankIcon;
