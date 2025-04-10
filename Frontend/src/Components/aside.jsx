import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import Icon from "../Images/logo.png";
import { AppContext } from "../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Addservice from "../vendor/addService.jsx";
import { 
  LayoutDashboard, 
  Package,
  Target, 
  Heart, 
  Home, 
  ChevronDown,
  Bell,
  LogOut,
  Banknote,
  CirclePlus,
  Sparkles
} from 'lucide-react';

const Aside = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fetchedServices, setFetchedServices] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { userData, logout } = useContext(AppContext);

  // Fetch services from the API endpoint
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/registration');
        console.log("API Response:", response.data); 
  
        // Check if response data exists and is an array
        if (response.data?.data && Array.isArray(response.data.data)) {
          const userEmail = userData?.email;
          console.log("Logged-in User Email:", userEmail);
  
          const matchedUser = response.data.data.find(user => user.email === userEmail);
          console.log("Matched User:", matchedUser);
  
          if (matchedUser) {
            console.log("Matched Services:", matchedUser.services);
            setFetchedServices(matchedUser.services);
          } else {
            console.log("No matching user found");
            setFetchedServices([]);
          }
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

  useEffect(() => {
    if (showModal) {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowModal(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showModal]);

  // Icon mapping for services
  const iconMap = {
    "Adoption": Heart,
    "Hostel": Home,
    "pet-training": Target, 
    "Pet-grooming": Sparkles,
  };

  // Combine default and fetched services
  let services = [{ name: "Adoption", icon: Heart }];
  if (fetchedServices.length > 0) {
    const userServices = fetchedServices.map(service => ({
      name: service,
      icon: iconMap[service] || Target, // Use Target as the default icon
    }));
    services = [...services, ...userServices];
  }

  const handleEdit = () => {
    navigate("/dashboard/vendorprofile")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="bg-white shadow-lg transition-all duration-300 fixed h-full w-64">
        <div className='rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-200'>
          <h1 className="ml-12 font-bold text-xl text-orange-600 mt-2">Vendor Panel</h1>
          <img src={Icon} className='rounded-lg w-24 h-24 ml-12 mt-4' alt="Logo" />
          <p className='ml-4 text-lg'>Welcome <span className='text-red-500'>{userData?.username}</span></p>
          <button onClick={handleEdit} className="ml-16 mt-1 bg-orange-200 hover:bg-orange-400 w-24 h-8" >Edit profile</button>
        </div>

        {/* Navigation */}
        <nav className="mt-1">
          <div className="px-4">
            {/* Dashboard Link */}
            <a href="/vendordashboard" className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </a>

            {/* Services Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full flex items-center justify-between text-gray-700 p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Package size={20} />
                  <span>Services</span>
                </div>
                <ChevronDown size={16} className={`transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Services List */}
              {isServicesOpen && (
                <div className="pl-16 space-y-2 mt-2">
                  {services.map((service) => (
                    <a
                      key={service.name}
                      href={`/dashboard/${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      {service.icon && <service.icon size={18} />}
                      <span>{service.name}</span>
                    </a>
                  ))}
                  {/* Add Service Button */}
                  <button 
                    className='flex items-center space-x-3 w-36 h-10 ml-2 hover:bg-orange-50 hover:text-orange-600 transition-colors'
                    onClick={() => setShowModal(true)}
                  >
                    <CirclePlus size={16}/> <span>Add service</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Links */}
          <div className="absolute bottom-0 w-full p-2 border-t">
            {/* Notifications Link */}
            <a href="/dashboard/e9826342424674872642-A234782423e45G289hI423reffkajsgfjhGeTdDgGyshg/earnings" className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
              <Banknote size={20} />
              <span>Earnings</span>
            </a>
            <a href="/dashboard/notification" className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
              <Bell size={20} />
              <span>Notifications</span>
            </a>
            {/* Logout Button */}
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
              className="w-full flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Modal for Adding Services */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white p-5 rounded-lg shadow-lg">
            <Addservice closeModal={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Aside;