import React, { useState, useEffect } from 'react';

function ProfileIcon({ profileIconId, height, width }) {
  const [iconUrl, setIconUrl] = useState('');
  
  useEffect(() => {
    // Map profile icon names to IDs if necessary
    const iconId = profileIconId;
    
    const baseUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/';
    const fetchIcon = async () => {
      const url = `${baseUrl}${iconId}.jpg`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        setIconUrl(url);
      } catch (error) {
        console.error('Failed to fetch the profile icon:', error);
      }
    };
    
    fetchIcon();
  }, [profileIconId]);

  return (
    <div>
      {iconUrl ? <img src={iconUrl} alt={`Profile Icon ${profileIconId}`} style={{ width: width, height: height, border: '4px solid black' }} /> : 'Loading...'}
    </div>
  );
}

export default ProfileIcon;
