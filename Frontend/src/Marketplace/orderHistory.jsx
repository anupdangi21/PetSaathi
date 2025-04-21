import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import Navbar from '../Components/Navbar';
import Footer from '../Components/foot';

const OrderHistory = () => {
    const [marketItem, setMarketItem] = useState([]);
    const [marketItemLoading, setMarketItemLoading] = useState(true);
    const [marketItemError, setMarketItemError] = useState(null);

    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    const userEmail = userData?.user?.email;
    const userToken = userData?.userToken;

    useEffect(() => {
        const fetchMarketItems = async () => {
            if (!userEmail || !userToken) {
                setMarketItemError("Please login to view orders");
                setMarketItemLoading(false);
                return;
            }

            try {
                const res = await axios.get('http://localhost:3000/buymarketplacelisting', {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });

                console.log("API Response:", res.data);

                if (res.data && Array.isArray(res.data.data)) {
                    const filtered = res.data.data.filter(item => 
                        item.email && item.email.toLowerCase() === userEmail.toLowerCase()
                    );
                    setMarketItem(filtered.reverse());
                    setMarketItemError(null);
                } else {
                    setMarketItemError("No orders found");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setMarketItemError(err.response?.data?.message || err.message || "Failed to fetch orders");
            } finally {
                setMarketItemLoading(false);
            }
        };

        fetchMarketItems();
    }, [userEmail, userToken]);


    return (
        <div className="bg-orange-50 min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Marketplace Orders</h1>

                    {marketItemLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                        </div>
                    ) : marketItemError ? (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                            <p>{marketItemError}</p>
                        </div>
                    ) : marketItem.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No orders found</p>
                            <button
                                onClick={() => window.location.href = '/marketplace'}
                                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                            >
                                Browse Marketplace
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {marketItem.map(item => (
                                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="p-4">
                                        {item.Image?.length > 0 ? (
                                            <img
                                                src={`http://localhost:3000/uploads/${item.Image[0]}`}
                                                alt={item.itemtype}
                                                className="w-full h-48 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg">
                                                <span className="text-gray-400">No Image Available</span>
                                            </div>
                                        )}

                                        <div className="mt-4">
                                            <h3 className="text-xl font-semibold">{item.itemtype}</h3>
                                            <p className="text-orange-600 font-bold mt-1">NPR {item.price}</p>
                                            
                                            <div className="mt-3 space-y-2">
                                                <p className="text-sm">
                                                    <span className="font-medium">Category:</span> {item.category}
                                                </p>
                                                <p className="text-sm">
                                                    <span className="font-medium">Seller:</span> {item.sellername}
                                                </p>
                                                <p className="text-sm">
                                                    <span className="font-medium">Condition:</span> {item.condition}
                                                </p>
                                                <p className="text-sm">
                                                    <span className="font-medium">Status:</span> 
                                                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                                                        item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                        item.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-orange-100 text-orange-800'
                                                    }`}>
                                                        {item.status || 'Pending'}
                                                    </span>
                                                </p>
                                                <p className="text-sm">
                                                    <span className="font-medium">Purchased on:</span> {moment(item.bookedAt).tz("Asia/Kathmandu").format("MMM D, YYYY h:mm A")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderHistory;