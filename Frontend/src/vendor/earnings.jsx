import React from 'react'
import { useEffect, useState } from 'react'
import Aside from "../Components/aside"
import { Banknote } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Earnings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState({
    grooming: 0,
    hostel: 0,
    training: 0
  });
  const [onlineEarnings, setOnlineEarnings] = useState({
    grooming: 0,
    hostel: 0,
    training: 0
  });
  const [bankDetails, setBankDetails] = useState(null);

  // State variables
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [bankname, setBankname] = useState("");
  const [accountnumber, setAccountnumber] = useState("");
  const [bankaccountholder, setBankaccountholder] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem('user_data'));
      const userEmail = userData?.user?.email;
      console.log("match", userEmail)

      if (!userEmail) return;

      try {
        // Fetch earnings data
        const endpoints = [
          { url: 'http://localhost:3000/bookgroom', key: 'grooming', emailField: 'vendoremail' },
          { url: 'http://localhost:3000/bookhostel', key: 'hostel', emailField: 'vendoremail' },
          { url: 'http://localhost:3000/booktrain', key: 'training', emailField: 'vendoremail' }
        ];

        const results = await Promise.all(
          endpoints.map(async ({ url, key, emailField }) => {
            try {
              const response = await fetch(url);
              if (!response.ok) throw new Error(`Failed to fetch ${key}`);
              const { data } = await response.json();

              const userItems = Array.isArray(data) 
                ? data.filter(item => item[emailField] === userEmail)
                : [];

              const total = userItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
              const online = userItems
                .filter(item => item.paymentStatus === 'Online Paid')
                .reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

              return { key, total, online };
            } catch (error) {
              console.error(`Error fetching ${key}:`, error);
              return { key, total: 0, online: 0 };
            }
          })
        );

        const newTotalEarnings = results.reduce((acc, { key, total }) => {
          acc[key] = total;
          return acc;
        }, {});

        const newOnlineEarnings = results.reduce((acc, { key, online }) => {
          acc[key] = online;
          return acc;
        }, {});

        setTotalEarnings(prev => ({ ...prev, ...newTotalEarnings }));
        setOnlineEarnings(prev => ({ ...prev, ...newOnlineEarnings }));

        // Fetch bank details
        const bankResponse = await axios.get('http://localhost:3000/bankaccount');
        console.log("api response", bankResponse.data);
        const bankData = Array.isArray(bankResponse?.data.data) ? bankResponse.data.data : [];
        const userBankDetails = bankData.find(
          detail => detail.vendoremail === userEmail
        );
        console.log("abrian",userBankDetails )
        
        if (userBankDetails) {
          setBankDetails(userBankDetails);
          setBankname(userBankDetails.bankname);
          setAccountnumber(userBankDetails.accountnumber);
          setBankaccountholder(userBankDetails.bankaccountname);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalWithdrawal = Object.values(onlineEarnings).reduce((sum, val) => sum + val, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('user_data'));
    
    if (!userData?.user?.email) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "User email not found. Please login again.",
      });
      return;
    }

    const bankData = {
      fullname: userData.user.username,
      vendorcontact: userData.user.number,
      vendoremail: userData.user.email,
      organizationname: userData.user.organizationname,
      location: userData.user.location,
      bankname,
      accountnumber: accountnumber,
      bankaccountname: bankaccountholder,
    };

    try {
      const response = await axios.post("http://localhost:3000/bankaccount", bankData);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Bank Details Saved",
          text: "Your bank details have been saved successfully.",
        });
        setBankDetails(bankData);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save bank details",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside>
        <Aside />
      </aside>
      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Overall Withdrawal Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Banknote className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-lg font-bold text-gray-900 ml-4">Online Withdrawal Amount</p>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900">NPR: {totalWithdrawal.toFixed(2)}</h3>
            <button 
              onClick={() => setShowWithdrawalForm(true)}
              className='w-28 h-8 bg-green-500 hover:bg-green-600 mt-2 shadow-2xl text-white rounded-lg'
            >
              Withdraw
            </button>
          </div>

          {/* Grooming Earnings Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <Banknote className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">NPR: {totalEarnings.grooming.toFixed(2)}</h3>
            <p className="text-sm text-gray-500">Grooming Earnings</p>
          </div>

          {/* Training Earnings Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-pink-50 p-3 rounded-lg">
                <Banknote className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">NPR: {totalEarnings.training.toFixed(2)}</h3>
            <p className="text-sm text-gray-500">Training Earnings</p>
          </div>

          {/* Hostel Earnings Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-50 p-3 rounded-lg">
                <Banknote className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">NPR: {totalEarnings.hostel.toFixed(2)}</h3>
            <p className="text-sm text-gray-500">Hostel Earnings</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Withdrawal Details (Left - 70%) */}
          <div className="w-full md:w-7/12">
            {showWithdrawalForm && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                <h1 className="text-lg font-bold mb-6">Your Withdrawal Details</h1>
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Total Withdrawal Amount*</span>
                  </label>
                  <input
                    type="text"
                    value={totalWithdrawal.toFixed(2)}
                    readOnly
                    className="input input-bordered w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Enter Withdrawal Amount*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Withdrawal Amount"
                    className="input input-bordered w-full p-3 border border-gray-300 rounded-lg"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700"
                  >
                    Request Withdrawal
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Banking Details (Right - 30%) */}
          <div className="w-full md:w-5/12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h1 className="text-lg font-bold mb-6">
                {bankDetails ? 'Your Bank Details' : 'Add Bank Details'}
              </h1>

              {bankDetails ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Bank Name</label>
                    <p className="mt-1 p-2 bg-gray-50 rounded-lg">{bankDetails.bankname}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Account Number</label>
                    <p className="mt-1 p-2 bg-gray-50 rounded-lg">{bankDetails.accountnumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Account Holder Name</label>
                    <p className="mt-1 p-2 bg-gray-50 rounded-lg">{bankDetails.bankaccountname}</p>
                  </div>
                  <p className="text-green-500 text-sm mt-4">
                    Your bank details are already saved
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">Bank Name*</span>
                    </label>
                    <select
                      className="select select-bordered w-full p-3 border border-gray-300 rounded-lg"
                      value={bankname}
                      onChange={(e) => setBankname(e.target.value)}
                      required
                    >
                      <option value="">Select a bank</option>
                      <option value="Nic Asia">Nic Asia</option>
                      <option value="Prabhu Bank">Prabhu Bank</option>
                      <option value="Global IME">Global IME</option>
                      <option value="Prime Commercial Bank">Prime Commercial Bank</option>
                      <option value="Machhapuchchhre Bank">Machhapuchchhre Bank</option>
                      <option value="NMB Bank Nepal">NMB Bank Nepal</option>
                      <option value="Nabil Bank">Nabil Bank</option>
                    </select>
                  </div>
                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">Account Number*</span>
                    </label>
                    <input
                      type="text"
                      value={accountnumber}
                      placeholder="Enter Account Number"
                      className="input input-bordered w-full p-3 border border-gray-300 rounded-lg"
                      onChange={(e) => setAccountnumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">Account Holder Name*</span>
                    </label>
                    <input
                      type="text"
                      value={bankaccountholder}
                      placeholder="Enter Account Holder Name"
                      className="input input-bordered w-full p-3 border border-gray-300 rounded-lg"
                      onChange={(e) => setBankaccountholder(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700"
                    >
                      Save Bank Details
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Earnings;