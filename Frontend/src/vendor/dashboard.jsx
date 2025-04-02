import Logo from "../Images/logo.png";
import Aside from "../Components/aside";
import React, { useState, useEffect } from 'react';
import { 
  PawPrint,
  Scissors,
  Home,
  Bone,
  List 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [counts, setCounts] = useState({
    grooming: 0,
    listings: 0,
    hostel: 0,
    training: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem('user_data'));
      const userEmail = userData?.user?.email;

      if (!userEmail) return;

      try {
        const endpoints = [
          { url: 'http://localhost:3000/petgrooming', key: 'grooming', emailField: 'vendoremail' },
          { url: 'http://localhost:3000/petlisting', key: 'listings', emailField: 'email' },
          { url: 'http://localhost:3000/pethostel', key: 'hostel', emailField: 'vendoremail' },
          { url: 'http://localhost:3000/training', key: 'training', emailField: 'vendoremail' }
        ];

        const results = await Promise.all(
          endpoints.map(async ({ url, key, emailField }) => {
            try {
              const response = await fetch(url);
              if (!response.ok) throw new Error(`Failed to fetch ${key}`);
              const { data } = await response.json(); // Changed here
              const count = Array.isArray(data) ? 
                data.filter(item => item[emailField] === userEmail).length : 0;
              return { key, count };
            } catch (error) {
              console.error(`Error fetching ${key}:`, error);
              return { key, count: 0 };
            }
          })
        );

        const newCounts = results.reduce((acc, { key, count }) => {
          acc[key] = count;
          return acc;
        }, {});

        setCounts(prev => ({ ...prev, ...newCounts }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = [
    { name: 'Grooming', count: counts.grooming },
    { name: 'Listings', count: counts.listings },
    { name: 'Hostel', count: counts.hostel },
    { name: 'Training', count: counts.training },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside>
        <Aside />
      </aside>
      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Scissors className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{counts.grooming}</h3>
            <p className="text-sm text-gray-500">Grooming Services</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <Bone className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{counts.training}</h3>
            <p className="text-sm text-gray-500">Training Programs</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-pink-50 p-3 rounded-lg">
                <Home className="h-6 w-6 text-pink-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{counts.hostel}</h3>
            <p className="text-sm text-gray-500">Hostel Bookings</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-50 p-3 rounded-lg">
                <List className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{counts.listings}</h3>
            <p className="text-sm text-gray-500">Pet Listings</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 h-96">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services Overview</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="count" 
                fill="#f97316" 
                radius={[10, 10, 0, 0]}
                label={{ position: 'top', fill: '#6b7280' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;