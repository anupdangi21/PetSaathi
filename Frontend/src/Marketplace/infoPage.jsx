import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCartPlus, FaHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuthGuard from '../Context/useAuthGuard.jsx';

const InfoPage = () => {
  const { state } = useLocation();
  const item = state?.item;
  const navigate = useNavigate();
  const withAuth = useAuthGuard();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Item not found</p>
        <button
          onClick={() => navigate('/marketplace')}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  const handleImageChange = (direction) => {
    setCurrentImageIndex(prev => {
      const totalImages = item.Image?.length || 0;
      return direction === 'next'
        ? (prev + 1) % totalImages
        : (prev - 1 + totalImages) % totalImages;
    });
  };

  const handleBuyNow = () => {
    Swal.fire({
      title: `Buy ${item.itemtype}?`,
      text: `You're about to purchase this item for RS ${item.price}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm Purchase',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Purchase Initiated!', 'The seller will contact you shortly.', 'success');
      }
    });
  };

  const handleAddToCart = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${item.itemtype} added to cart`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const userEmail = JSON.parse(localStorage.getItem('user_data'))?.user?.email || '';
  const isOwner = userEmail === item.selleremail;
  const totalImages = item.Image?.length || 0;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-orange-500 hover:text-orange-600"
      >
        <FaArrowLeft /> Back to Marketplace
      </button>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-96 group">
          {totalImages > 0 ? (
            <>
              <img
                src={`http://localhost:3000/uploads/${item.Image[currentImageIndex]}`}
                alt={item.itemtype}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
              {totalImages > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageChange('prev');
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors"
                  >
                    <FaArrowLeft className="text-gray-800" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageChange('next');
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors"
                  >
                    <FaArrowRight className="text-gray-800" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {item.Image.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-orange-500' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{item.itemtype}</h1>
            <div className="flex items-center gap-4">
              <div
                className={`p-2 cursor-pointer ${isHeartFilled ? 'text-red-500' : 'text-gray-400'}`}
                onClick={() => setIsHeartFilled(!isHeartFilled)}
              >
                <FaHeart size={24} />
              </div>
              <div className="text-2xl font-bold text-orange-500">
                RS {item.price}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <p><span className="font-semibold">Category:</span> {item.category}</p>
              <p><span className="font-semibold">Condition:</span> {item.condition}</p>
              <p><span className="font-semibold">Used Time:</span> {item.usedtime}</p>
              <p><span className="font-semibold">Seller:</span> {item.selleremail}</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{item.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end border-t pt-6">
            {!isOwner ? (
              <>
                <button
                  onClick={withAuth(handleAddToCart)}
                  className="px-6 py-3 bg-gray-100 text-orange-500 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                >
                  <FaCartPlus className="text-lg" />
                  Add to Cart
                </button>
                <button
                  onClick={withAuth(handleBuyNow)}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Buy Now
                </button>
              </>
            ) : (
              <div className="text-gray-500">
                This is your listing
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;