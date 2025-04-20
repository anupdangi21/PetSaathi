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
                  <h1 className='mt-4 text-lg text-center'>Payment Amount: {newInfo.total_amount}</h1>
                </label>
              </div>
              <button 
                type="button" 
                // onClick={handleOk} 
                className='block mx-auto px-10 py-2 bg-orange-200 hover:bg-orange-300'
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
};

export default SuccessMarketplace
