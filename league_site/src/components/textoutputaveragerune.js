import React from 'react';
import getRuneTextAverage from './runetextaverage.js';

function RuneText({ rune, var1, var2, var3 }) {
  // Only generate text if var1, var2, or var3 are provided
  const runeText = (var1 || var2 || var3) ? getRuneTextAverage(rune, var1, var2, var3) : '';

  return (
    <div style={{ 
      padding: '8px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden' 
    }}>
      {runeText && <div dangerouslySetInnerHTML={{ __html: runeText }} />}
    </div>
  );
}

export default RuneText;
