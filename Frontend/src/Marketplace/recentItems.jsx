import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/foot"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'


const RecentOrders = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (itemId, direction) => {
    setCurrentImageIndices(prev => {
      const totalImages = items.find(item => item._id === itemId)?.Image?.length || 0;
      const currentIndex = prev[itemId] || 0;
      let newIndex = currentIndex;
      
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % totalImages;
      } else {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
      }
      
      return { ...prev, [itemId]: newIndex };
    });
  };

  const handleEditItem = (item, event) => {
    event.preventDefault();
    navigate("/marketplace/additems", { 
      state: { 
        itemData: item,
        isEdit: true 
      } 
    });
  };

  const handleDeleteItem = async (_id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3000/marketplacelisting/${_id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                Swal.fire("Deleted!", result.message || "Item has been deleted.", "success");
                setItems((prevItems) => prevItems.filter((item) => item._id !== _id));

            } catch (err) {
                console.error("Error deleting item:", err);
                Swal.fire("Error", "Failed to delete item. Please try again.", "error");
            }
        }
    });
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const userDataString = localStorage.getItem('user_data');
        if (!userDataString) {
          setError('User not logged in');
          return;
        }
  
        const userData = JSON.parse(userDataString);
        if (!userData?.user?.email) {
          setError('Email not found in user data');
          return;
        }
  
        const response = await fetch('http://localhost:3000/marketplacelisting', {
          headers: {
            'Authorization': `Bearer ${userData.userToken}`
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        const itemsArray = Array.isArray(result) ? result : 
                          result.items ? result.items : 
                          result.data ? result.data : [];
  
        if (!Array.isArray(itemsArray)) {
          setError('Invalid data format from API');
          return;
        }
  
        const userItems = itemsArray.filter(item => 
          item.selleremail === userData.user.email
        );
        const reversedItems = [...userItems].reverse();
        setItems(reversedItems);
        setLoading(false);
  
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to fetch items');
        setLoading(false);
      }
    };
  
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 p-6 md:p-8 lg:p-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Your Listed Items</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const currentIndex = currentImageIndices[item._id] || 0;
              const totalImages = item.Image?.length || 0;
              
              return (
                <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    {item.Image && item.Image.length > 0 ? (
                      <>
                        <img
                          src={`http://localhost:3000/uploads/${item.Image[currentIndex]}`}
                          alt={item.itemtype}
                          className="w-full h-full object-cover"
                        />
                        
                        {totalImages > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleImageChange(item._id, 'prev');
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white/100 transition-colors"
                            >
                              <FaArrowLeft className="text-gray-800" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleImageChange(item._id, 'next');
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white/100 transition-colors"
                            >
                              <FaArrowRight className="text-gray-800" />
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Rest of the item card remains the same */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{item.itemtype}</h3>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        NPR {item.price}
                      </span>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Category:</span> {item.category}</p>
                      <p><span className="font-medium">Condition:</span> {item.condition}</p>
                      <p><span className="font-medium">Used Time:</span> {item.usedtime}</p>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={(e) => handleEditItem(item, e)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default RecentOrders