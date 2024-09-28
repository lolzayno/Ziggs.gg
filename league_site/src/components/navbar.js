import RightNavbar from './rightnav.js';
import LeftNavbar from './leftnav.js';
import './navbar.css'
function Navbar() {
    return (
        <div className="navbar">
            <LeftNavbar />
            <RightNavbar />
        </div>
    )
}
export default Navbar;