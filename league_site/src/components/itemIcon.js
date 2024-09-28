import React from 'react';

// Function to format the itemIcon text
function formatItemIcon(icon) {
  return icon && icon.includes("'") ? icon.replace(/'/g, "") : icon;
}

function ItemIcon({ itemIcon, height, width }) {
  // Check if itemIcon is None (string "None")
  if (!itemIcon || itemIcon === "None") {
    return (
      <div style={{ width: width, height: height, border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      </div>
    );
  }

  // Format the itemIcon string
  const formattedIcon = formatItemIcon(itemIcon);
  // Construct the path to the image
  let iconUrl;
  try {
    // Adding a console log to debug the formattedIcon
    console.log('Formatted Icon:', formattedIcon);
    iconUrl = require(`./itemicons/${formattedIcon}.png`);
  } catch (error) {
    console.error("Error loading icon:", error);
    iconUrl = null; // Fallback if the image is not found
  }

  return (
    <div style={{ width: width, height: height, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {iconUrl ? (
        <img 
          src={iconUrl} 
          alt={`Item Icon ${formattedIcon}`} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain', 
            border: '1px solid black'  // Add black border here
          }} 
        />
      ) : (
        <span>{formattedIcon}</span>
      )}
    </div>
  );
}

export default ItemIcon;
