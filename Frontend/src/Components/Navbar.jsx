import React from 'react';
import "./navbar.css";
import Signin from "../signin";
import Image from "../images.jsx";


function Nav() {

    return (
        <div className="header">
            <div className="logo">
                <img src={Image.image1} alt="Logo" /> 
            </div>
            <nav className="nav">
                <a href="/">Home</a>
                <a href="/services">Services</a>
                <a href="/">About us</a>
                <a href="/">Marketplace</a>
            </nav>
            <div className="search-bar">
                <input type="text" placeholder="Search for pets" />
            </div>
            <button className="login-btn">
                Login/Sign Up
            </button>
        </div>
    );
}

export default Nav;