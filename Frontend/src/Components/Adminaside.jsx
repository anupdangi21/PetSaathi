import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Icon from "../Images/logo.png";
import { AppContext } from "../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { 
  LayoutDashboard, 
  Package,
  ChevronDown,
  Bell,
  LogOut,
  UserCheck, 
  User,
  Menu,
  X
} from 'lucide-react';

const Adminaside = () => {
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { userData, logout } = useContext(AppContext);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin');
                if (response.data?.data && Array.isArray(response.data.data)) {
                    console.log("Admin data loaded successfully");
                }
            } catch (err) {
                console.error("Error fetching services:", err);
                setError(err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to load services',
                    text: err.message
                });
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, [userData]);

    return (
        <>
            {/* Mobile Hamburger Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-md bg-white shadow-md"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`w-64 fixed h-full bg-white shadow-md flex flex-col transition-all duration-300 z-40
                ${isMobileMenuOpen ? 'left-0' : '-left-64'} lg:left-0`}>
                
                {/* Header Section */}
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-orange-600">Admin Panel</h1>
                    <div className="flex flex-col items-center mt-4">
                        <img src={Icon} className="w-24 h-24 rounded-lg" alt="Logo" />
                        <p className="mt-2 text-gray-700">
                            Welcome <span className="text-red-500">{userData?.username}</span>
                        </p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto">
                    <div className="p-2 space-y-1">
                        {/* Dashboard Link */}
                        <a 
                            href="/Admin-AnUpDaNgI-2333319" 
                            className="flex items-center p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <LayoutDashboard className="w-5 h-5 mr-3" />
                            <span>Admin Dashboard</span>
                        </a>

                        {/* Management Dropdown */}
                        <div>
                            <button 
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            >
                                <div className="flex items-center">
                                    <Package className="w-5 h-5 mr-3" />
                                    <span>Management</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isServicesOpen && (
                                <div className="ml-8 mt-1 space-y-1">
                                    <button 
                                        className="w-full flex items-center p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        onClick={() => {
                                            setIsServicesOpen(false);
                                            setIsMobileMenuOpen(false);
                                            navigate('/Admin-All-User');
                                        }}
                                    >
                                        <User className="w-5 h-5 mr-2" />
                                        <span>Users</span>
                                    </button>
                                    <button 
                                        className="w-full flex items-center p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        onClick={() => {
                                            setIsServicesOpen(false);
                                            setIsMobileMenuOpen(false);
                                            navigate('/Admin-All-Vendor');
                                        }}
                                    >
                                        <UserCheck className="w-5 h-5 mr-2" />
                                        <span>Vendors</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Bottom Links */}
                <div className="p-4 border-t">
                    <a 
                        href="/dashboard/notification" 
                        className="flex items-center p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <Bell className="w-5 h-5 mr-3" />
                        <span>Withdrawl</span>
                    </a>
                    <button 
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
                                    navigate("/");
                                }
                            });
                        }}
                        className="w-full flex items-center p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Adminaside;