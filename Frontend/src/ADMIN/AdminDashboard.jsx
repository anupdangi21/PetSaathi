import Logo from "../Images/logo.png";
import AdminAside from "../Components/Adminaside"
import React, { useState } from 'react';
import { 
  Heart, 
  Users,
  Star,
  Calendar,

} from 'lucide-react';

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside>
          <AdminAside />
        </aside>
        {/* Main Content */}
        <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <span className="text-sm font-medium text-green-500">+12.5%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1,482</h3>
              <p className="text-sm text-gray-500">Total Adoptions</p>
            </div>
  
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-purple-500" />
                </div>
                <span className="text-sm font-medium text-green-500">+8.2%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
  
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-pink-50 p-3 rounded-lg">
                  <Heart className="h-6 w-6 text-pink-500" />
                </div>
                <span className="text-sm font-medium text-green-500">+24.3%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">892</h3>
              <p className="text-sm text-gray-500">Pets Available</p>
            </div>
  
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-500" />
                </div>
                <span className="text-sm font-medium text-green-500">+18.7%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">245</h3>
              <p className="text-sm text-gray-500">Monthly Bookings</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className=" grid ml text-2xl font-semibold text-gray-800 place-items-end">Recent Orders </h2>
            <p className="grid mt-2 place-items-end ">hello</p>
          </div>
        </main>
      </div>
    );
  }

export default AdminDashboard
