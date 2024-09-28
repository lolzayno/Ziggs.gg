import React from 'react';
function RuneHeader({ rune }){
    let iconUrl;
    try {
        iconUrl = require(`./images/${rune}.png`)
    } catch (error) {
        console.error("Error loading icon: ", error);
        iconUrl = null;
    }
    return (
        <div style={{ 
            width: 'auto', 
            height: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            overflow: 'hidden' 
          }}>
            {iconUrl ? (
              <img 
                src={iconUrl} 
                alt={`Rune Icon ${rune}`} 
                style={{ 
                  width: '16px', 
                  height: '16px', 
                  objectFit: 'contain' 
                }} 
              />
            ) : (
              <span>{rune}</span>
            )}
          </div>
    );
}
export default RuneHeader;