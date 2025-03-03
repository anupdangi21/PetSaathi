import React from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/foot";
import {BadgePlus,CircleUserRound } from 'lucide-react';

function market(){
  return (
    <div className='h-full'>
      <header>
        <Navbar />
      </header>
      <main className='max-w-7xl mx-auto px-4 py-8'>
      <div className="bg-gradient-to-r from-orange-200 to-orange-50 rounded-2xl p-8 mb-12 text-white w-50">
        <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Search by items..."
              className="px-4 py-2 rounded-lg text-gray-800 min-w-[200] flex-1"
            />
            <select className="px-4 py-2 rounded-lg text-gray-800 min-w-[150px]">
              <option value="">All Items</option>
              <option value="dog">Bowl</option>
              <option value="cat">Belts</option>
              <option value="other">Foods</option>
            </select>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
              Search
            </button>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
              <BadgePlus /> 
            </button> 
            <button className='bg-orange-100 rounded-full'>
            <CircleUserRound size={40}  />
            </button>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default market;
