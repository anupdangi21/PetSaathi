import React, { useState, useRef, useEffect } from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/foot";
import { BadgePlus, CircleUserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthGuard from "../Context/useAuthGuard.jsx";
import FypPage from "../Marketplace/fypPage.jsx"; // Import the FypPage component
import { FaArrowLeft, FaArrowRight, FaCartPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Market() {
  const withAuth = useAuthGuard();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const menuRef = useRef();

  const handleAdditem = () => {
    console.log('Navigating to /marketplace/additems');
    navigate("/marketplace/additems");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic will be handled in FypPage component via props
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Search and Filter Section */}
        <div className="bg-gradient-to-r from-orange-200 to-orange-50 rounded-2xl p-8 mb-8 text-white w-full">
          <form onSubmit={handleSearch} className="flex gap-4 flex-wrap items-center">
            <input
              type="text"
              placeholder="Search by items..."
              className="px-4 py-2 rounded-lg text-gray-800 min-w-[200px] flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="px-4 py-2 rounded-lg text-gray-800 min-w-[150px]"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Items</option>
              <option value="bowl">Bowl</option>
              <option value="belt">Belts</option>
              <option value="other">Foods</option>
            </select>
            <button 
              type="submit"
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50"
            >
              Search
            </button>
            {/* User Menu Button */}
            <div className="relative" ref={menuRef}>
              <button
                className="bg-orange-100 rounded-full p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="User menu"
              >
                <CircleUserRound size={30} className="text-orange-600" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <ul className="py-2 text-gray-700">
                    <li 
                      className="px-4 py-2 hover:bg-orange-50 cursor-pointer" 
                      onClick={() => {
                        navigate('/marketplace/recentitems');
                        setMenuOpen(false);
                      }}
                    >
                      Recent Listing
                    </li> 
                    <li 
                    className="px-4 py-2 hover:bg-orange-50 cursor-pointer"
                    onClick={()=>{
                      navigate('/marketplace/eafdsafj44w4jhjn-2452jbjkbnnlkjl25-252enrkewlkjgsgksdfs/earning')
                    }}
                    >Payments</li>
                    <li 
                    className="px-4 py-2 hover:bg-orange-50 cursor-pointer"
                    onClick={()=>{
                      navigate('/marketplace/orderhistory');
                    }}
                    >Order History</li>
                  </ul>
                </div>
              )}
            </div>
            <button
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 flex items-center gap-1"
              onClick={withAuth(handleAdditem)}
            >
              <BadgePlus />
              <span className="hidden sm:inline"></span>
            </button>
          </form>
        </div>

        {/* Render the FypPage component with search and filter props */}
        <FypPage searchTerm={searchTerm} categoryFilter={categoryFilter} />
      </main>

      <Footer />
    </div>
  );
}

export default Market;