import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaHeart, FaCommentDots, FaUser, FaTag, FaClock, FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuthGuard from '../Context/useAuthGuard.jsx';
import Navbar from "../Components/Navbar.jsx"
import Footer from "../Components/foot.jsx"

const InfoPage = () => {
  const { state } = useLocation();
  const item = state?.item;
  const navigate = useNavigate();
  const withAuth = useAuthGuard();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <p className="text-red-500 text-lg mb-6">Item not found</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const handleImageChange = (direction) => {
    const totalImages = item.Image?.length || 0;
    setCurrentImageIndex((prev) =>
      direction === 'next'
        ? (prev + 1) % totalImages
        : (prev - 1 + totalImages) % totalImages
    );
  };

  const handleBuyNow = () => {
    Swal.fire({
      title: `Buy ${item.itemtype}?`,
      text: `You're about to purchase this item for RS ${item.price}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm Purchase',
      background: '#fff7ed',
      customClass: {
        title: 'text-orange-600',
        confirmButton: 'bg-orange-500 hover:bg-orange-600',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Purchase Initiated!',
          text: 'The seller will contact you shortly.',
          icon: 'success',
          background: '#fff7ed',
          confirmButtonColor: '#f97316'
        });
      }
    });
  };

  const userEmail = JSON.parse(localStorage.getItem('user_data'))?.user?.email || '';
  const isOwner = userEmail === item.selleremail;
  const totalImages = item.Image?.length || 0;

  return (
    <div className="bg-orange-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-orange-600 hover:text-orange-800 hover:underline text-lg transition-colors duration-200"
          >
            <FaArrowLeft className="inline" /> Back to Marketplace
          </button>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Section */}
              <div className="relative bg-orange-100 p-6 flex items-center justify-center min-h-[400px]">
                {totalImages > 0 ? (
                  <>
                    <img
                      src={`http://localhost:3000/uploads/${item.Image[currentImageIndex]}`}
                      alt={item.itemtype}
                      className="object-contain max-h-[70vh] w-full rounded-lg"
                    />
                    {totalImages > 1 && (
                      <>
                        <button
                          onClick={() => handleImageChange('prev')}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-orange-200 text-orange-600 transition-all duration-200"
                        >
                          <FaArrowLeft />
                        </button>
                        <button
                          onClick={() => handleImageChange('next')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-orange-200 text-orange-600 transition-all duration-200"
                        >
                          <FaArrowRight />
                        </button>
                      </>
                    )}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {totalImages}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400 text-xl">No Image Available</div>
                )}
              </div>

              {/* Info Section */}
              <div className="p-8 flex flex-col">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-gray-900 mb-2">{item.itemtype}</p>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-orange-600">NPR {item.price}</span>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <FaTag className="text-orange-500" />
                      <div>
                        <p className="text-lg text-gray-500">Category</p>
                        <p className="font-medium">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-orange-500" />
                      <div>
                        <p className="text-lg text-gray-500">Used Time</p>
                        <p className="font-medium">{item.usedtime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStar className="text-orange-500" />
                      <div>
                        <p className="text-lg text-gray-500">Condition</p>
                        <p className="font-medium">{item.condition}</p>
                      </div>  
                      <div>
                        <p className="text-lg text-gray-500">Status</p>
                        <p className="font-medium">{item.status}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="mt-auto">
                  <div className="bg-orange-50 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <FaUser className="text-orange-500" /> Seller Information
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <FaUser className="text-orange-500 text-xl" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.sellername || "Unknown Seller"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {!isOwner ? (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={withAuth(handleBuyNow)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-3 rounded-xl transition duration-200 transform hover:scale-105 shadow-md"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => navigate('/marketplace')}
                        className="flex-1 border-2 border-orange-500 text-orange-600 py-3 rounded-xl text-lg hover:bg-orange-50 hover:text-orange-700 transition duration-200 transform hover:scale-105"
                      >
                        Browse More
                      </button>
                    </div>
                  ) : (
                    <div className="text-center p-3 bg-orange-100 rounded-lg">
                      <p className="text-orange-700">This is your listing</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InfoPage;