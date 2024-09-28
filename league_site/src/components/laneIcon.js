import topIcon from './TOP.png';
import jgIcon from './JUNGLE.png';
import midIcon from './MIDDLE.png';
import botIcon from './BOTTOM.png';
import supIcon from './UTILITY.png';

const laneIcons = {
    top: topIcon,
    jungle: jgIcon,
    middle: midIcon,
    bottom: botIcon,
    utility: supIcon
  };

function LaneIcon({ laneIcon, height, width }) {
  const iconUrl = laneIcons[laneIcon.toLowerCase()]

  return (
    <div style={{ width: width, height: height, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {iconUrl ? (
        <img src={iconUrl} alt={`Lane Icon ${laneIcon}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      ) : (
        'Loading...'
      )}
    </div>
  );
}


export default LaneIcon;
