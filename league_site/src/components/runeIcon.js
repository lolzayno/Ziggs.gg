import React from 'react';
import GetRuneText from './runetext.js';

// Function to format runeIcon text
function formatRuneIcon(icon) {
  return icon && icon.includes(":") ? icon.replace(/:/g, "") : icon;
}

function RuneIcon({ runeIcon, var1, var2, var3, height, width }) {
  // Format the runeIcon string
  const formattedIcon = formatRuneIcon(runeIcon);
  
  // Only generate rune text if var1, var2, or var3 are provided
  const runeText = (var1 || var2 || var3) ? GetRuneText(runeIcon, var1, var2, var3) : '';

  // Construct the path to the image
  let iconUrl;
  try {
    iconUrl = require(`./runes/${formattedIcon}.png`);
  } catch (error) {
    console.error("Error loading icon:", error);
    iconUrl = null; // Fallback if the image is not found
  }

  return (
    <div style={{ 
      width: 'auto', 
      height: '64px', 
      display: 'flex', 
      alignItems: 'center', 
      overflow: 'hidden' 
    }}>
      {iconUrl ? (
        <img 
          src={iconUrl} 
          alt={`Rune Icon ${formattedIcon}`} 
          style={{ 
            width: width, 
            height: height, 
            objectFit: 'contain' 
          }} 
        />
      ) : (
        <span>{runeIcon}</span>
      )}
      {runeText && <div dangerouslySetInnerHTML={{ __html: runeText }} />}
    </div>
  );
}

export default RuneIcon;
