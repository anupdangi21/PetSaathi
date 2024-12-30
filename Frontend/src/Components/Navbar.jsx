import React, { useState, useRef, useEffect } from 'react';
import "./navbar.css";
import Signin from "./signin.jsx";
import Logo from "../Images/logo.png";
import User from "../Images/logo.png";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Dropdown } from 'rsuite';

function Nav() {
    const [visible, setVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false); // State to control Services dropdown

    const modalRef = useRef(null); // Ref for modal container

    const openModal = () => setVisible(true);
    const closeModal = () => setVisible(false);

    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

    // Close modal when clicking outside of it
    useEffect(() => {
        if (visible) {
            const handleClickOutside = (event) => {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    closeModal(); // Close modal if clicked outside
                }
            };

            // Add event listener
            document.addEventListener('mousedown', handleClickOutside);

            // Cleanup the event listener on component unmount or when modal is closed
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [visible]);

    // Services Dropdown Component
    const ServicesDropdown = () => (
        <div
            className={`absolute mt-2 w-48 bg-gray-800 shadow-lg rounded-lg ${dropdownVisible ? 'block' : 'hidden'}`}
        >
            <a href="/services/adopt" className="block px-4 py-2 text-gray-700 hover:bg-gray-700">
                Adopt a Pet
            </a>
            <a href="/services/hostel" className="block px-4 py-2 text-gray-700 hover:bg-gray-700">
                Hostel
            </a>
            <a href="/services/training" className="block px-4 py-2 text-gray-700 hover:bg-gray-700">
                Pet Training
            </a>
        </div>
    );

    return (
        <div className="header flex items-center justify-between">
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
            <nav className="nav relative">
                <a href="/" className="mr-4">Home</a>

                {/* Services Dropdown Trigger */}
                <div className="relative">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent page navigation
                            toggleDropdown();
                        }}
                        className="flex items-center text-gray-800 hover:text-blue-500 cursor-pointer"
                    >
                        Services
                    </a>
                    <ServicesDropdown />
                </div>

                <a href="/about" className="mr-4">About us</a>
                <a href="/marketplace" className="mr-4">Marketplace</a>
            </nav>
            <div className="search-bar">
                <input type="text" placeholder="Search for pets" />
            </div>

            <div className="flex items-center space-x-0">
                {/* Login/Sign Up Button */}
                <button className="login-btn" onClick={openModal}>Login/Sign Up</button>

                {/* Modal Overlay and Content */}
                {visible && (
                    <div className="signin-form-overlay">
                        <div className="signin-form-container" ref={modalRef}>
                            <Signin closeModal={closeModal} />
                        </div>
                    </div>
                )}

                {/* Profile Dropdown */}
                <Menu as="div" className="relative mr-4">
                    <div>
                        <MenuButton className="relative mr-20 flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img src={User} className="w-12 h-12 mr-18 rounded-full" />
                        </MenuButton>
                    </div>
                    <MenuItems
                        className="absolute right-0 mt-2 mr-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                            >
                                Dashboard
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                            >
                                Your Profile
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                            >
                                Settings
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                            >
                                Sign out
                            </a>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
}

export default Nav;
