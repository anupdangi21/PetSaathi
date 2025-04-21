import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaUser, FaTag, FaClock, FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import EsewaIntegrationMarketplace from "../Payment/EsewaIntegrationMarket";

const OnlineBooking = ({ item, onClose }) => {
    const [initiateEsewa, setInitiateEsewa] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [date, setDate] = useState("");
    const userData = JSON.parse(localStorage.getItem("user_data"));

    if (!userData?.user?.email) {
        Swal.fire({
            icon: 'error',
            title: "Authentication Error",
            text: "Please login to continue",
            background: '#fff7ed',
            confirmButtonColor: '#f97316'
        });
        return null;
    }

    useEffect(() => {
        if (date) {
            localStorage.setItem("marketplaceDate", date);
            
            const timeoutId = setTimeout(() => {
                console.log("Removing date from localStorage...");
                localStorage.removeItem("marketplaceDate");
            }, 240000); // 4 minutes
            
            return () => clearTimeout(timeoutId);
        }
    }, [date]);

    const handleProceedToPayment = () => {
        // Save item data to localStorage
        const purchaseData = {
            item: {
                id: item._id,
                name: item.itemtype,
                price: item.price,
                image: item.Image?.[0] || null,
                seller: item.sellername || "Unknown Seller",
                sellercontact:item.sellercontact,
                selleraddress:item.selleraddress,
                selleremail:item.selleremail,
                category:item.category,
                usedtime:item.usedtime,
                condition:item.condition,
                description:item.description

            },
            date: date,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem("marketplacePurchase", JSON.stringify(purchaseData));
        
        // Set timeout to clear the data after 4 minutes
        setTimeout(() => {
            localStorage.removeItem("marketplacePurchase");
        }, 240000); // 4 minutes
        
        setInitiateEsewa(true);
    };

    const handleImageChange = (direction) => {
        const totalImages = item.Image?.length || 0;
        setCurrentImageIndex((prev) =>
            direction === 'next'
                ? (prev + 1) % totalImages
                : (prev - 1 + totalImages) % totalImages
        );
    };

    const totalImages = item.Image?.length || 0;
    const userEmail = userData?.user?.email || '';
    const isOwner = userEmail === item.selleremail;

    return (
        <div className="bg-orange-50 flex flex-col">
            <main className="flex-grow">
                <div className="max-w-7xl mx-.5 px-2 sm:px-2 lg:px-2 py-2">
                    <button
                        onClick={onClose}
                        className="mb-2 flex items-center gap-2 text-orange-600 hover:text-orange-800 hover:underline text-lg transition-colors duration-200"
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
                            <div className="p-2 flex flex-col">
                                <div className="mb-4">
                                    <div className='flex items-center gap-32'>
                                        <p className="text-3xl font-bold text-gray-900 mb-2">{item.itemtype}</p>
                                        <div className="flex items-center mb-4">
                                            <span className="text-2xl font-bold text-orange-600 mt-2">NPR {item.price}</span>
                                        </div>
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
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Select Date
                                        </label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            required
                                            min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
                                        />
                                    </div>
                                </div>

                                {/* Seller Info */}
                                <div className="mt-auto">
                                    <div className="bg-orange-50 rounded-lg p-2 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                            <FaUser className="text-orange-500" /> Seller Information
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-orange-100 p-3 rounded-full">
                                                <FaUser className="text-orange-500 text-xl" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{item.sellername || "Unknown Seller"}</p>
                                                <p className="text-sm text-gray-500">{item.selleremail}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {!isOwner ? (
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <button
                                                onClick={handleProceedToPayment}
                                                disabled={!date}
                                                className={`flex-1 text-white text-lg font-semibold py-1 rounded-xl transition duration-200 transform hover:scale-105 shadow-md ${
                                                    date ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-400 cursor-not-allowed"
                                                }`}
                                            >
                                                Proceed to Payment
                                            </button>
                                            <button
                                                onClick={onClose}
                                                className="flex-1 border-2 border-orange-500 text-orange-600 py-1 rounded-xl text-lg hover:bg-orange-50 hover:text-orange-700 transition duration-200 transform hover:scale-105"
                                            >
                                                Browse More
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center p-2 bg-orange-100 rounded-lg">
                                            <p className="text-orange-700">This is your listing</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {initiateEsewa && (
                <EsewaIntegrationMarketplace 
                    amount={item.price} 
                    onClose={() => setInitiateEsewa(false)}
                />
            )}
        </div>
    );
};

export default OnlineBooking;