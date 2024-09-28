import './rightnav.css';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';

function RightNavbar() {
    const handleClick = () => {
        console.log('clicked');
    }

    return (
        <div className="rightnav">
            <Button label="Coaching (Coming Soon)" className="custom-button" onClick={handleClick} />
            <Button label="Forum (Coming Soon)" className="custom-button" onClick={handleClick} />
            <Button label="Ziggs Bot (Coming Soon)" className="custom-button" onClick={handleClick} />
        </div>
    );
}

export default RightNavbar;
