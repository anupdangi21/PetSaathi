import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Signin from "./signin.jsx";
import Logo from "../Images/logo.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AppContext } from "../Context/AppContext.jsx";
import Swal from "sweetalert2";

function Nav() {
    const [visible, setVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [vendorData, setVendorData] = useState(null);
    
    const { isAuthenticated, userData, logout } = useContext(AppContext);
    const modalRef = useRef(null);
    const dropdownRef = useRef(null);

    const openModal = () => setVisible(true);
    const closeModal = () => setVisible(false);

    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

    // Fetch vendor data when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const userData = JSON.parse(localStorage.getItem('user_data'));
            const token = userData?.userToken;

            fetch('http://localhost:3000/registration', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => response.json())
            .then(apiResponse => setVendorData(apiResponse));
        }
    }, [isAuthenticated]);

    const userDataFromStorage = JSON.parse(localStorage.getItem('user_data'));
    const userEmail = userDataFromStorage?.user?.email; 

    const isVendor = vendorData?.data?.some(vendor => 
        vendor?.email && userEmail && 
        vendor.email.toLowerCase() === userEmail.toLowerCase()
    );

    useEffect(() => {
        if (visible) {
            const handleClickOutside = (event) => {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    closeModal();
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
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
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownVisible]);

    const ServicesDropdown = () => (
        <div ref={dropdownRef} className={`absolute mt-2 w-48 bg-orange-200 shadow-lg rounded-lg ${dropdownVisible ? "block" : "hidden"}`}>
            <a href="/services/adoption" className="block px-4 py-2 text-white hover:bg-orange-100">Adopt a Pet</a>
            <a href="/services/hostel" className="block px-4 py-2 text-white hover:bg-orange-100">Hostel</a>
            <a href="/services/training" className="block px-4 py-2 text-white hover:bg-orange-100">Pet Training</a>
            <a href="/services/lostfound" className="block px-4 py-2 text-white hover:bg-orange-100">Lost and Found</a>
        </div>
    );

    return (
        <div className="header flex items-center justify-between px-6 py-3 bg-[#e8c7a3] w-full h-[12vh]">
            
            {/* Logo */}
            <div className="logo flex-shrink-0 ml-[30px]">
                <img src={Logo} alt="Logo" className="w-[80px] h-auto object-cover rounded-full" />
            </div>

            {/* Navbar */}
            <nav className="nav flex gap-x-8 ml-[35px]">
                <Link to="/" className="text-white font-medium hover:text-orange-100">Home</Link>
                <div className="relative">
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(); }} 
                        className="text-white font-medium hover:text-orange-100 cursor-pointer">
                        Services
                    </a>
                    <ServicesDropdown />
                </div>
                <Link to="/marketplace" className="text-white font-medium hover:text-orange-100">Marketplace</Link>
                <Link to="/about" className="text-white font-medium hover:text-orange-100">About us</Link>
            </nav>

            {/* Search Bar */}
            <div className="search-bar ml-24 flex items-center w-[10%] flex-grow">
                <input type="text" placeholder="Search for pets" 
                    className="w-1/2 px-4 py-2 border border-white rounded-full" />
            </div>

                {/* Authentication */}
                <div className="flex items-center">
                    {visible && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-md shadow-md w-[350px] h-[52vh]" ref={modalRef}>
                                <Signin closeModal={closeModal} />
                            </div>
                        </div>
                    )}

                    {isAuthenticated ? (
                        <Menu as="div" className="relative mr-4">
                            <MenuButton className="relative mr-16 flex items-center justify-center w-12 h-12 rounded-full bg-orange-300 text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-200">
                                {userData?.username?.substring(0, 2).toUpperCase()}
                            </MenuButton>
                            <MenuItems className="absolute right-0 mt-2 w-48 bg-orange-200 rounded-md shadow-lg py-1">
                                <MenuItem>
                                    {isVendor ? (
                                        <Link to="/dashboard" className="block px-4 py-2 text-white hover:bg-orange-100">Dashboard</Link>
                                    ) : (
                                        <Link to="/vendor/register" className="block px-4 py-2 text-white hover:bg-orange-100">Become Vendor</Link>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    <Link to="/tracking" className="block px-4 py-2 text-white hover:bg-orange-100">Tracking</Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="/updateprofile" className="block px-4 py-2 text-white hover:bg-orange-100">Your Profile</Link>
                                </MenuItem>
                                <MenuItem>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-white hover:bg-orange-100"
                                        onClick={() => {
                                            Swal.fire({
                                                title: "Are you sure you want to sign out?",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#d33",
                                                cancelButtonColor: "#3085d6",
                                                confirmButtonText: "Yes",
                                                cancelButtonText: "No",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    logout();
                                                    Swal.fire("Signed out!", "You have been successfully signed out.", "success");
                                                }
                                            });
                                        }}
                                    >
                                        Sign out
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    ) : (
                        <button className="relative mr-8 px-6 py-2 flex items-center justify-center rounded-full bg-orange-300 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-200" onClick={openModal}>
                            Login/Sign Up
                        </button>
                    )}
                </div>
            </div>
    );
}

export default Nav;