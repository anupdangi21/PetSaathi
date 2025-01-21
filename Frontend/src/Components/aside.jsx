import React, { useState } from 'react';
import Icon from "../Images/logo.png"
import { 
  LayoutDashboard, 
  Package,
  Target, 
  Heart, 
  Home, 
  ShoppingBag, 
  ChevronDown,
  Bell,
  LogOut,
  Menu
} from 'lucide-react';

const Aside = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { name: 'Adoption', icon: Heart },
    { name: 'Hostel', icon: Home },
    { name: 'Marketplace', icon: ShoppingBag },
    { name: 'Training', icon: Target }, // Assign a default icon to Training
  ];

  //handling vendor logout

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={` 'w-full'} bg-white shadow-lg transition-all duration-300 fixed h-full`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold text-xl text-indigo-600 ml-8 mt-8 `}>Admin Panel</h1>
          
        </div>
        <div className=' rounded-full bg-white bg-red focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-200'>
          <img src={Icon} className='rounded-lg  w-24 h-24 ml-8'></img>
            <p className='ml-12 text-lg'>Hi Admin</p>
          </div>
        
        <nav className="mt-8">
          <div className="px-4">
            <a href="/dashboard" className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              <LayoutDashboard size={20} />
              {<span>Dashboard</span>}
            </a>

            <div className="relative">
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full flex items-center justify-between text-gray-700 p-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
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
                      href="/dashboard/adoption"
                      className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      {service.icon && <service.icon size={18} />}
                      <span>{service.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 w-full p-4 border-t">
            <button className="w-full flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              <Bell size={20} />
              { <span>Notifications</span>}
            </button>
            <button 
              onClick={handleLogout}
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
