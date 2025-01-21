
import Aside from "../Components/aside"
import React, { useState } from 'react';
import { 
    BadgePlus,
    LayoutDashboard, 
    Package, 
    Heart, 
    Home, 
    ShoppingBag, 
    ChevronDown,
    Bell,
    LogOut,
    Menu,
    Users,
    Star,
    Calendar,
    TrendingUp,
    DogIcon,
    CatIcon,
    MessageSquare,
  } from 'lucide-react';

const Adoption = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="min-h-screen bg-gray-50 flex">
    <aside>
        <Aside />
    </aside>

    <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-800 ">Welcome to Adoption Dashboard</h2>
          <h3 className=" grid ml text-2xl font-semibold text-gray-800 place-items-end mr-12">Upload a pet
          <button className=" grid bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 place-items-end m-8">
            <BadgePlus /> 
          </button>
          </h3>
          <p className="mt-2 text-gray-600 ">Click on the + button to start listing your pets.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className=" grid ml text-2xl font-semibold text-gray-800 place-items-end">Recent Orders </h2>
          <p classname="grid mt-2 place-items-end ">hello</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "Golden Retriever - Max",
                  date: "Today, 2:00 PM",
                  status: "Confirmed",
                  icon: DogIcon
                },
                {
                  name: "Persian Cat - Luna",
                  date: "Today, 11:30 AM",
                  status: "Pending",
                  icon: CatIcon
                },
                {
                  name: "Labrador - Charlie",
                  date: "Yesterday, 4:15 PM",
                  status: "Confirmed",
                  icon: DogIcon
                }
              ].map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <booking.icon className="h-8 w-8 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">{booking.name}</p>
                      <p className="text-sm text-gray-500">{booking.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          </div>
      </main>

        </div>
      
    
  )
}

export default Adoption
