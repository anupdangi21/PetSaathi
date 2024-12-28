import React, { useState } from 'react';
import "./navbar.css";
import Signin from "./signin.jsx";
import Logo from "../Images/logo.png"

function Nav() {
    const [visible, setVisible] = useState(false);

    const openModal = () => setVisible(true);
    const closeModal = () => setVisible(false);

    return (
        <div className="header">
            <div className="logo">
                <img src={Logo}alt="Logo" />
            </div>
            <nav className="nav">
                <a href="/">Home</a>
                <a href="/services">Services</a>
                <a href="/aboutus">About us</a>
                <a href="/marketplace">Marketplace</a>
            </nav>
            <div className="search-bar">
                <input type="text" placeholder="Search for pets" />
            </div>
            <button className="login-btn" onClick={openModal}>Login/Sign Up</button>

            {/* Conditional rendering of the Signin form */}
            {visible && (
                <div className="signin-form-overlay">
                    <div className="signin-form-container">
                        <Signin closeModal={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Nav;