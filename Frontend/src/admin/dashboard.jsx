import Logo from "../Images/logo.png";
import Aside from "../Components/aside"

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  Home, 
  ShoppingBag, 
  ChevronDown,
  Bell,
  LogOut,
  Menu
} from 'lucide-react';

const AdminDashboard=()=> {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside>
        <Aside />
      </aside>
      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-800 ">Welcome to Dashboard</h2>
          <p className="mt-2 text-gray-600 ">Select an option from the sidebar to get started.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className=" grid ml text-2xl font-semibold text-gray-800 place-items-end">Recent Orders </h2>
          <p classname="grid mt-2 place-items-end ">hello</p>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
