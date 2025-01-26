import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import Signin from "./signin.jsx";
import Logo from "../Images/logo.png";
import User from "../Images/logo.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AppContext } from "../Context/AppContext.jsx";
import Swal from "sweetalert2";

function Nav() {
    const [visible, setVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const { isAuthenticated, userData, logout } = useContext(AppContext);
    const modalRef = useRef(null);
    const dropdownRef = useRef(null);

    const openModal = () => setVisible(true);
    const closeModal = () => setVisible(false);

    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

    useEffect(() => {
        if (visible) {
            const handleClickOutside = (event) => {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    closeModal();
                }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [visible]);

    useEffect(() => {
        if (dropdownVisible) {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setDropdownVisible(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [dropdownVisible]);

    const ServicesDropdown = () => (
        <div
            ref={dropdownRef}
            className={`absolute mt-2 w-48 bg-orange-200 shadow-lg rounded-lg ${
                dropdownVisible ? "block" : "hidden"
            }`}
        >
            <a href="/services/adoption" className="block px-4 py-2 text-gray-700 hover:bg-orange-100">
                Adopt a Pet
            </a>
            <a href="/services/hostel" className="block px-4 py-2 text-gray-700 hover:bg-orange-100">
                Hostel
            </a>
            <a href="/services/training" className="block px-4 py-2 text-gray-700 hover:bg-orange-100">
                Pet Training
            </a>
            <a href="/services/lostfound" className="block px-4 py-2 text-gray-700 hover:bg-orange-100">
                Lost and Found
            </a>
        </div>
    );

    return (
        <div className="header flex items-center justify-between">
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
            <nav className="nav relative">
                <a href="/" className="mr-8">
                    Home
                </a>

                <div className="relative">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleDropdown();
                        }}
                        className="flex items-center text-red-800 hover:text-white-100 cursor-pointer"
                    >
                        Services
                    </a>
                    <ServicesDropdown />
                </div>
                <a href="/marketplace" className="mr-4">
                    Marketplace
                </a>
                <a href="/about" className="mr-4">
                    About us
                </a>
            </nav>
            <div className="search-bar">
                <input type="text" placeholder="Search for pets" />
            </div>

            <div className="flex items-center space-x-0">
                {visible && (
                    <div className="signin-form-overlay">
                        <div className="signin-form-container" ref={modalRef}>
                            <Signin closeModal={closeModal} />
                        </div>
                    </div>
                )}

{isAuthenticated ? (
    <div>
        <Menu as="div" className="relative mr-4">
            <div>
                <MenuButton className="relative mr-20 flex items-center justify-center w-12 h-12 rounded-full bg-orange-300 text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-200">
                    {userData?.username?.substring(0, 2).toUpperCase()}
                </MenuButton>
            </div>
            <MenuItems className="absolute right-0 mt-2 mr-2 w-48 origin-top-right rounded-md bg-orange-200 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem>
                    <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-white hover:bg-orange-50"
                    >
                        Dashboard
                    </Link>
                </MenuItem>
                <MenuItem>
                    <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-white hover:bg-orange-50"
                    >
                        Your Profile
                    </a>
                </MenuItem>
                <MenuItem>
                <a
        href="#"
        className="block px-4 py-2 text-sm text-white hover:bg-orange-50"
        onClick={() => {
            Swal.fire({
                title: "Are you sure you want to sign out?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "  Yes",
                cancelButtonText: "No",
            }).then((result) => {
                if (result.isConfirmed) {
                    logout(); // Call the logout function
                    Swal.fire("Signed out!", "You have been successfully signed out.", "success");
                }
            });
        }}
    >
        Sign out
    </a>
                </MenuItem>
            </MenuItems>
        </Menu>
    </div>
) : (
    <button className="login-btn" onClick={openModal}>
        Login/Sign Up
    </button>
)}
            </div>
        </div>
    );
}

export default Nav;
