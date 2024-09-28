import './leftnav.css';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import 'primeicons/primeicons.css';
function LeftNavbar() {
    const handleClick = () => {
        window.location.href = 'http://localhost:3000/'; // Navigate to the homepage
    }
    return (
        <div className="leftnav">
            <Button 
                icon="pi pi-home" 
                className="custom-button" 
                onClick={handleClick} 
                aria-label="Home"
            />
        </div>
    )
}
export default LeftNavbar;