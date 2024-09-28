import './footerother.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';

function FooterOther() {
    const handleClickYoutube = () => {
        window.location.href = 'https://www.youtube.com/@lolzayno5872'; // Navigate to the homepage
    }
    const handleClickTwitch = () => {
        window.location.href = 'https://www.twitch.tv/lolzayno'; // Navigate to the homepage
    }
    const handleClickDiscord = () => {
        window.location.href = 'https://discord.com/invite/h4p2EDzCvk'; // Navigate to the homepage
    }
    return (
        <div className="footer-other">
            <div className="social">
                <div className="social-content">
                    <h4>Socials</h4>
                    <div className="social-icons-container">
                        <Button 
                            icon="pi pi-twitch" 
                            className="custom-button"
                            onClick={handleClickTwitch} 
                            aria-label="Twitch"
                        />
                        <Button 
                            icon="pi pi-youtube" 
                            className="custom-button"
                            onClick={handleClickYoutube} 
                            aria-label="Youtube"
                        />
                        <Button 
                            icon="pi pi-discord" 
                            className="custom-button"
                            onClick={handleClickDiscord} 
                            aria-label="Discord"
                        />
                    </div>
                </div>
                <div className="social-content">
                    <h4>Creator</h4>
                    <p>lolzayno</p>
                    <p>NA Zayno#NA1</p>
                    <p>Challenger Ziggs One Trick</p>
                </div>
            </div>
        </div>
    );
}

export default FooterOther;
