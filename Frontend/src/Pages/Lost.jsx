import React from 'react'
import Navbar from "../Components/Navbar.jsx"
import Footer from "../Components/foot.jsx"
import { useNavigate } from 'react-router-dom';


const Lost = () => {
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const handlebackButton = () => {
        Navigate("/services/lostfound");
    }



  return (
    <div className='container'>
        <header>
            <Navbar />
        </header>
        <main className='max-w-7xl mx-auto px-4 py-8'>
      <div className="bg-gradient-to-r from-orange-200 to-orange-50 rounded-2xl p-8 mb-12 text-white w-50">
        <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Enter"
              className="px-4 py-2 rounded-lg text-gray-800 min-w-[200] flex-1"
            />
            <input
              type="text"
              placeholder="Enter pet Color"
              className="px-4 py-2 rounded-lg text-gray-800 min-w-[200] flex-1"
            />
            <input
              type="text"
              placeholder="Enter pet age"
              className="px-4 py-2 rounded-lg text-gray-800 min-w-[200] flex-1"
            />
            <input
              type="text"
              placeholder="Enter pet lost location"
              className="px-4 py-2 rounded-lg text-gray-800 min-w-[200] flex-1"
            />
            <select className="px-4 py-2 rounded-lg text-gray-800 min-w-[150px]">
              <option value="">Categories</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
              Search
            </button>
          </div>
        </div>
      </main>
        <footer>
            <Footer />
        </footer>
    </div>
  )
}

export default Lost