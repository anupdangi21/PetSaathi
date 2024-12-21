import "./navbar.css";

function nav() {
    return(
        <div>
        <div className="logo">Logo</div>
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
    )
}

export default nav;
