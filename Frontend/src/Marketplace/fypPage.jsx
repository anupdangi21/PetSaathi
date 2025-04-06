import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCartPlus, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FypPage = ({ searchTerm = '', categoryFilter = '' }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const navigate = useNavigate();

  // Fetch data from API with search and filter
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem('user_data'));
        if (!userData?.user?.email) {
          setError('Please login to view items');
          setLoading(false);
          return;
        }

        let url = 'http://localhost:3000/marketplacelisting';
        const params = new URLSearchParams();
        
        if (searchTerm) params.append('search', searchTerm);
        if (categoryFilter) params.append('category', categoryFilter);
        
        if (params.toString()) url += `?${params.toString()}`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${userData.userToken}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch items');
        
        const { data } = await response.json();
        
        // Client-side filtering as fallback
        const filteredItems = data.filter(item => {
          const matchesSearch = searchTerm 
            ? item.itemtype.toLowerCase().includes(searchTerm.toLowerCase()) || 
              item.description.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
          const matchesCategory = categoryFilter 
            ? item.category === categoryFilter 
            : true;
          return matchesSearch && matchesCategory;
        });

        setItems(filteredItems);
        
        // Initialize image indices
        const indices = {};
        filteredItems.forEach(item => {
          indices[item._id] = 0;
        });
        setCurrentImageIndices(indices);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchItems();
    }, 300); // Debounce to prevent rapid API calls

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, categoryFilter]);

  // Handle image navigation
  const handleImageChange = (itemId, direction) => {
    setCurrentImageIndices(prev => {
      const totalImages = items.find(item => item._id === itemId)?.Image?.length || 0;
      const currentIndex = prev[itemId] || 0;
      let newIndex = direction === 'next' 
        ? (currentIndex + 1) % totalImages 
        : (currentIndex - 1 + totalImages) % totalImages;
      
      return { ...prev, [itemId]: newIndex };
    });
  };

  // Get current user email
  const userEmail = JSON.parse(localStorage.getItem('user_data'))?.user?.email || '';

  // Handle buy now action
  const handleBuyNow = (item) => {
    Swal.fire({
      title: `Buy ${item.itemtype}?`,
      text: `You're about to purchase this item for NPR ${item.price}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm Purchase'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Purchase Initiated!',
          'The seller will contact you shortly.',
          'success'
        );
      }
    });
  };

  // Handle add to cart
  const handleAddToCart = (item) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${item.itemtype} added to cart`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => navigate('/login')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login to View Items
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No items found matching your criteria</p>
        <button 
          onClick={() => {
            setSearchTerm('');
            setCategoryFilter('');
          }}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {items.map(item => {
        const currentIndex = currentImageIndices[item._id] || 0;
        const isOwner = userEmail === item.selleremail;
        const totalImages = item.Image?.length || 0;

        return (
          <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image Slider */}
            <div className="relative h-48 group">
              {item.Image?.length > 0 ? (
                <>
                  <img
                    src={`http://localhost:3000/uploads/${item.Image[currentIndex]}`}
                    alt={item.itemtype}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg'; // Fallback image
                    }}
                  />
                  
                  {totalImages > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageChange(item._id, 'prev');
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <FaArrowLeft className="text-gray-800" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageChange(item._id, 'next');
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                      >
                        <FaArrowRight className="text-gray-800" />
                      </button>
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
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{item.itemtype}</h3>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded whitespace-nowrap">
                  NPR {item.price}
                </span>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Category:</span> {item.category}</p>
                <p><span className="font-medium">Condition:</span> {item.condition}</p>
                <p><span className="font-medium">Used Time:</span> {item.usedtime}</p>
              </div>

              <p className="mt-2 text-sm text-gray-500 line-clamp-2">{item.description}</p>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                {isOwner ? (
                  <button
                    onClick={() => navigate(`/marketplace/items/${item._id}`)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1"
                  >
                    <FaInfoCircle size={14} />
                    View Details
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 flex items-center gap-1"
                    >
                      <FaCartPlus size={14} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      Buy Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FypPage;