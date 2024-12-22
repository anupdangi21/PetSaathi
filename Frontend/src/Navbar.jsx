import "./navbar.css";
import logo from "../images/logo.png"; 

function Nav() {
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="Logo" /> 
            </div>
            <nav className="nav">
                <a href="#home">Home</a>
                <a href="#services">Services</a>
                <a href="#about">About us</a>
                <a href="#marketplace">Marketplace</a>
            </nav>
            <div className="search-bar">
                <input type="text" placeholder="Search for pets" />
            </div>
            <button className="login-btn">Login/Sign Up</button>
        </div>
    );
}

export default Nav;