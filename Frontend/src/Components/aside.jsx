import React, { useState, useRef, useEffect, useContext, u } from 'react';
import Icon from "../Images/logo.png"
import { AppContext } from "../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { 
  LayoutDashboard, 
  Package,
  Target, 
  Heart, 
  Home, 
  ChevronDown,
  Bell,
  LogOut,
  CirclePlus
} from 'lucide-react';

const Aside = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  const navigate = useNavigate();

  const services = [
    { name: 'Adoption', icon: Heart },
    { name: 'Hostel', icon: Home },
    { name: 'Training', icon: Target }, // Assign a default icon to Training
  ];

  //handling vendor logout

  const { isAuthenticated, userData, logout } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={` 'w-auto'} bg-white shadow-lg transition-all duration-300 fixed h-full`}>
        <div className="ml-24 px-4 py-4 flex items-center justify-between">

          
        </div>
        <div className=' rounded-full bg-white bg-red focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-200'>
        <h1 className={` ml-12 font-bold text-xl text-orange-600 mt-2 `}>Admin Panel</h1>
          <img src={Icon} className='rounded-lg  w-24 h-24 ml-12 mt-4 '></img>
            <p className=' ml-4 text-lg'>Welcome <span className='text-red-500'> {userData?.username}    </span></p>
          </div>
        
        <nav className="mt-8">
          <div className="px-4">
            <a href="/dashboard" className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
              <LayoutDashboard size={20} />
              {<span>Dashboard</span>}
            </a>

            <div className="relative">
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full flex items-center justify-between text-gray-700 p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Package size={20} />
                  { <span>Services</span>}
                </div>
                { <ChevronDown size={16} className={`transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />}
              </button>

              {isServicesOpen && (
                <div className="pl-10 space-y-2 mt-2">
                  {services.map((service) => (
                <a
                  key={service.name}
                  href={`/dashboard/${service.name.toLowerCase()}`} 
                  className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  {service.icon && <service.icon size={18} />}
                  <span>{service.name}</span>
                  
                </a>
              ))}
              <button className='flex items-center space-x-3 w-36 h-10 ml-2 hover:bg-orange-50 hover:text-orange-600 transition-colors'>
               <CirclePlus  size={16}/> <span>Add service</span>
              </button>
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 w-full p-4 border-t">
          <a href="/dashboard/notification" className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
              <Bell size={20} />
              { <span>Notifications</span>}
              </a>
            <button 
              onClick={()=>{
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
                        navigate("/")
                    }
                });
              }}
              className="w-full flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
              { <span>Logout</span>}
            </button>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Aside;
