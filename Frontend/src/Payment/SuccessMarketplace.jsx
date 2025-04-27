import { useState, useEffect } from "react";
import React from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/foot";
import Tick from "../Images/Tick.png";
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from "moment-timezone";

const SuccessMarketplace = () => {
  const [date, setDate] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const info = search.get('data');
  const decodeinfo = atob(info);
  const newInfo = JSON.parse(decodeinfo);
  const userData = JSON.parse(localStorage.getItem('user_data'));

  useEffect(() => {
    const itemDetails = JSON.parse(localStorage.getItem('marketplacePurchase'));
    setSelectedItem(itemDetails);
    const itemDate = localStorage.getItem('marketplaceDate');
    setDate(itemDate);
  }, []);

  const handleOk = async () => {
    try {
      if (!selectedItem || !userData?.user) {
        throw new Error('Missing required booking data');
      }

      const bookingData = {
        itemId:selectedItem.item.id,
        fullname: userData.user.username,
        ownercontact: userData.user.number,
        email: userData.user.email,
        Image: selectedItem.item.image ? [selectedItem.item.image] : [],
        sellername: selectedItem.item.seller,
        sellercontact: selectedItem.item.sellercontact || "N/A",
        selleremail: selectedItem.item.selleremail || "N/A",
        selleraddress: selectedItem.item.selleraddress || "N/A",
        itemtype: selectedItem.item.name,
        category: selectedItem.item.category,
        condition: selectedItem.item.condition,
        usedtime: selectedItem.item.usedtime,
        price: selectedItem.item.price,
        date: date,
        description: selectedItem.item.description,
        paymentStatus: "Online Paid",
        status: "Booked",

      };

      const response = await axios.post('http://localhost:3000/buymarketplacelisting', bookingData, {
        headers: {
          "Content-Type":"multipart/form-data",
          Authorization: `Bearer ${userData.userToken}`
        }
      });

      if (response.data.success) {
        // Clear localStorage items
        localStorage.removeItem('marketplacePurchase');
        localStorage.removeItem('marketplaceDate');
        
        Swal.fire({
          icon: 'success',
          title: 'Booking confirmed!',
          text: 'Your purchase has been successfully recorded',
          confirmButtonColor: '#f97316'
        });
        navigate('/marketplace');
      }
    } catch (error) {
      console.error('Booking failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: error.response?.data?.message || error.message,
        confirmButtonColor: '#f97316'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-white">
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-8">
          <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl shadow-lg p-8 w-full max-w-md mx-4">
            <form>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                  Payment Success
                </h1>
                <img src={Tick} alt="Success" className='w-64 h-64 mx-auto'/>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    <h1 className='text-lg text-center'>Payment Status: {newInfo.status}</h1>
                    <h1 className='mt-4 text-lg text-center'>
                      Payment Amount: NPR {newInfo.total_amount}
                    </h1>
                    {selectedItem && (
                      <div className="mt-4 text-center">
                        <p className="text-gray-600">Item: {selectedItem.item.name}</p>
                        <p className="text-gray-600">Booking Date: {date}</p>
                      </div>
                    )}
                  </label>
                </div>
                <button 
                  type="button" 
                  onClick={handleOk} 
                  className='block mx-auto px-10 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200'
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessMarketplace;