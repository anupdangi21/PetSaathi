import Logo from "../Images/logo.png";

import Aside from "../Components/aside";
import React, { useState, useEffect } from 'react';
import { 
  PawPrint,
  Dog,
  Scissors,
  Home,
  Bone,
  List,
  X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VendorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [counts, setCounts] = useState({
    grooming: 0,
    listings: 0,
    hostel: 0,
    training: 0
  });
  const [Bookcounts, setCountsBook] = useState({
    grooming: 0,
    listings: 0,
    hostel: 0,
    training: 0
  });
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const FilterPopup = () => {
    if (!showFilter) return null;

    const handleApply = () => {
      setShowFilter(false);
    };

    const handleClear = () => {
      setStartDate('');
      setEndDate('');
      setShowFilter(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filter Bookings</h3>
            <button onClick={() => setShowFilter(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">From Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleClear}
                className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                Clear
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
              const { data } = await response.json();
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

  useEffect(() => {
    const fetchBookings = async () => {
      const userData = JSON.parse(localStorage.getItem('user_data'));
      const userEmail = userData?.user?.email;
      if (!userEmail) return;

      try {
        const endpoints = [
          { 
            url: 'http://localhost:3000/bookgroom', 
            key: 'grooming', 
            emailField: 'vendoremail', // Verify this matches your API field name
            dateField: 'bookedAt'
          },
          { 
            url: 'http://localhost:3000/adoption', 
            key: 'listings', 
            emailField: 'vendoremail', // Changed to match petlisting endpoint
            dateField: 'bookedAt'
          },
          { 
            url: 'http://localhost:3000/bookhostel', 
            key: 'hostel', 
            emailField: 'vendoremail',
            dateField: 'bookedAt'
          },
          { 
            url: 'http://localhost:3000/booktrain', 
            key: 'training', 
            emailField: 'vendoremail',
            dateField: 'bookedAt'
          }
        ];

        const results = await Promise.all(
          endpoints.map(async ({ url, key, emailField, dateField }) => {
            try {
              const baseUrl = new URL(url);
              baseUrl.searchParams.append(emailField, userEmail);
              
              if (startDate && endDate) {
                baseUrl.searchParams.append('startDate', startDate);
                baseUrl.searchParams.append('endDate', endDate);
              }

              const response = await fetch(baseUrl);
              if (!response.ok) throw new Error(`Failed to fetch ${key}`);
              const { data } = await response.json();
              
              // Verify email matching on client side
              const filteredData = data.filter(item => 
                item[emailField] === userEmail && (
                  !startDate || !endDate || (
                    new Date(item[dateField]) >= new Date(startDate) &&
                    new Date(item[dateField]) <= new Date(endDate)
                )
              ));

              return { key, count: filteredData.length };
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

        setCountsBook(prev => ({ ...prev, ...newCounts }));
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookings();
  }, [startDate, endDate]);

  const chartData = [
    { name: 'Grooming', count: counts.grooming },
    { name: 'Adoption', count: counts.listings },
    { name: 'Hostel', count: counts.hostel },
    { name: 'Training', count: counts.training },
  ];

  const chartData2 =[
    { name: 'Grooming', count: Bookcounts.grooming },
    { name: 'Adoption', count: Bookcounts.listings },
    { name: 'Hostel', count: Bookcounts.hostel },
    { name: 'Training', count: Bookcounts.training },
  ];

  const maxCount = Math.max(...chartData2.map(item => item.count), 1);

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
                <Dog className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{counts.listings}</h3>
            <p className="text-sm text-gray-500">Pet Adoption Listings</p>
          </div>
        </div>
        <div className="flex">
        <div className="bg-white rounded-lg shadow-sm p-6 h-96 w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Listing Overview</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0, maxCount]} 
                tickCount={maxCount + 1}
                allowDecimals={false}
              />
              <Tooltip />
              <Bar 
                dataKey="count" 
                fill="#f97316" 
                radius={[4, 4, 0, 0]}
                label={{ position: 'top', fill: '#6b7280' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 h-96 w-1/2">
        <div className="flex justify-space-between">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bookings Overview</h2>
          <button 
    onClick={() => setShowFilter(true)}
    className="bg-orange-200 px-3 py-1 rounded hover:bg-orange-400 ml-64"
  >
    Filter
  </button>
          </div>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0, maxCount]} 
                tickCount={maxCount + 1}
                allowDecimals={false}
              />
              <Tooltip />
              <Bar 
                dataKey="count" 
                fill="#f97316" 
                radius={[4, 4, 0, 0]}
                label={{ position: 'top', fill: '#6b7280' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
        {FilterPopup()}
      </main>
    </div>
  );
};

export default VendorDashboard;