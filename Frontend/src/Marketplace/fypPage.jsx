import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCartPlus } from 'react-icons/fa';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuthGuard from '../Context/useAuthGuard.jsx';
import ChatBox from './chatBox.jsx';

const FypPage = ({ searchTerm = '', categoryFilter = '' }) => {
  const withAuth = useAuthGuard();
  const [chatWithSeller, setChatWithSeller] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        let url = 'http://localhost:3000/marketplacelisting';
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (categoryFilter) params.append('category', categoryFilter);
        if (params.toString()) url += `?${params.toString()}`;

        const userData = JSON.parse(localStorage.getItem('user_data'));
        const headers = userData?.userToken
          ? { Authorization: `Bearer ${userData.userToken}` }
          : {};

        const response = await fetch(url, { headers });

        if (!response.ok) throw new Error('Failed to fetch items');

        const { data } = await response.json();

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

        setItems(filteredItems.reverse());

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
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, categoryFilter]);

  const handleImageChange = (itemId, direction) => {
    setCurrentImageIndices(prev => {
      const totalImages = items.find(item => item._id === itemId)?.Image?.length || 0;
      const currentIndex = prev[itemId] || 0;
      let newIndex =
        direction === 'next'
          ? (currentIndex + 1) % totalImages
          : (currentIndex - 1 + totalImages) % totalImages;
      return { ...prev, [itemId]: newIndex };
    });
  };

  const userEmail = JSON.parse(localStorage.getItem('user_data'))?.user?.email || '';

  const handleBuyNow = (item) => {
    setChatWithSeller(item.selleremail);
  };
  const handleInfoClick = (item) => {
    navigate(`/marketplace/items/${item._id}`, {
      state: { item } // Pass the entire item object as state
    });
  };
  const handleInfoClick1 = (item) => {
    navigate('/marketplace/recentitems');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No items found matching your criteria</p>
        <button
          onClick={() => {
            window.location.reload();
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
        const isOwner = userEmail && userEmail === item.selleremail;
        const totalImages = item.Image?.length || 0;

        return (
          <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            <div className="relative h-80 group">
              {item.Image?.length > 0 ? (
                <>
                  <img
                    src={`http://localhost:3000/uploads/${item.Image[currentIndex]}`}
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
                          handleImageChange(item._id, 'prev');
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <FaArrowLeft className="text-gray-800" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageChange(item._id, 'next');
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
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

            {/* Details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">Item Type:  {item.itemtype}</h3>
                <p className='text-lg font-bold'>Price<span className="bg-green-500 text-zinc-50 text-sm font-medium px-2.5 py-0.5 rounded whitespace-nowrap">
                  RS {item.price}
                </span></p>
              </div>

              <div className="space-y-1 text-md text-gray-800">
                <p><span className="font-medium">Category:</span> {item.category}</p>
                <p><span className="font-medium">Condition:</span> {item.condition}</p>
                <p><span className="font-medium">Used Time:</span> {item.usedtime}</p>
              </div>

              <p><span className="font-medium">Description:</span> {item.description}</p>

              <p><span className="font-medium">Status:</span> {item.status}</p>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                {isOwner ? (
                  <button
                  onClick={() => handleInfoClick1()}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 flex items-center gap-1"
                >
                  <Info size={16} />
                  View All
                </button>
                ) : (
                  <>
                    <button
                      onClick={() => withAuth(() => handleBuyNow(item))()}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleInfoClick(item)}
                      className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 flex items-center gap-1"
                    >
                      <Info size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {chatWithSeller && (
      <ChatBox
        sellerEmail={chatWithSeller}
        buyerEmail={userEmail}
        onClose={() => setChatWithSeller(null)}
      />
    )}
    </div>
  );
};

export default FypPage;
