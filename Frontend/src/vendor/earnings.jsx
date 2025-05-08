import React from 'react'
import { useEffect, useState } from 'react'
import Aside from "../Components/aside"
import { Banknote } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from "moment-timezone"

const Earnings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
  const [showHistoryData, setShowHistoryData] = useState(false);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
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
  const [withdrawalDetails, setWithdrawalDetails] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [bankname, setBankname] = useState("");
  const [accountnumber, setAccountnumber] = useState("");
  const [bankaccountholder, setBankaccountholder] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem('user_data'));
      const userEmail = userData?.user?.email;

      if (!userEmail) return;

      try {
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

        const bankResponse = await axios.get('http://localhost:3000/bankaccount');
        const bankData = Array.isArray(bankResponse?.data.data) ? bankResponse.data.data : [];
        const userBankDetails = bankData.find(detail => detail.vendoremail === userEmail);
        
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

  useEffect(() => {
    const fetchWithdrawalHistory = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        const userEmail = userData?.user?.email;
  
        if (!userEmail) return;
  
        const response = await axios.get(`http://localhost:3000/withdrawalrequest?vendoremail=${userEmail}`);
        
        if (response.data && Array.isArray(response.data.data)) {
          const matchedData = response.data.data.filter(item => item.vendoremail === userEmail && item.from === "Vendor-PetSaathi");
          setWithdrawalHistory(matchedData.reverse());
          
        }
        
      } catch (error) {
        console.error('Error fetching withdrawal history:', error);
      }
    };
  
    if (showHistoryData) {
      fetchWithdrawalHistory();
    }
  }, [showHistoryData]);

  // Calculate total online earnings
  const totalWithdrawal = Object.values(onlineEarnings).reduce((sum, val) => sum + val, 0);
  // console.log("1anup", totalWithdrawal)
  // Calculate total approved withdrawals
  const totalApprovedWithdrawals = withdrawalHistory
    .filter(item => item.status === 'Approved')
    .reduce((sum, item) => sum + parseFloat(item.withdrawalAmount || 0), 0);
  
  // Calculate available withdrawal amount
  const availableWithdrawal = Math.max(0, totalWithdrawal - totalApprovedWithdrawals);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const userEmail = userData?.user?.email;
    
    if (!userEmail) {
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
      vendoremail: userEmail,
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

  const handleWithdrawl = async (e) => {
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

    // Validate withdrawal amount
    if (parseFloat(withdrawalAmount) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Withdrawal amount must be greater than 0",
      });
      return;
    }

    if (parseFloat(withdrawalAmount) > availableWithdrawal) {
      Swal.fire({
        icon: "error",
        title: "Insufficient Balance",
        text: `You can only withdraw up to NPR ${availableWithdrawal.toFixed(2)}`,
      });
      return;
    }

    const withdrawRequest = {
      fullname: userData.user.username,
      vendorcontact: userData.user.number,
      vendoremail: userData.user.email,
      organizationname: userData.user.organizationname,
      location: userData.user.location,
      bankname,
      accountnumber: accountnumber,
      bankaccountname: bankaccountholder,
      overallAmount: totalWithdrawal,
      withdrawalAmount: withdrawalAmount,
      from:"Vendor-PetSaathi",
      withdrawlAt: new Date().toISOString()
    }

    try {
      const response = await axios.post("http://localhost:3000/withdrawalrequest", withdrawRequest);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Withdrawal request submitted",
          text: "Your Withdrawal request has been sent to admin",
        });
        setWithdrawalDetails(withdrawRequest);
        setWithdrawalAmount(0);
        setShowWithdrawalForm(false);
        setWithdrawalHistory(prev => [withdrawRequest, ...prev]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit withdrawal request",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside>
        <Aside />
      </aside>
      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Available Withdrawal Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Banknote className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-lg font-bold text-gray-900 ml-4">Available Withdrawal</p>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900">NPR: {availableWithdrawal.toFixed(2)}</h3>
            <p className="text-sm text-gray-500">Total Online Earnings: NPR {totalWithdrawal.toFixed(2)}</p>
            <div className='flex gap-4'>
              <button 
                onClick={() => {
                  setShowHistoryData(true);
                  setShowWithdrawalForm(false);
                }}
                className='w-28 h-8 bg-blue-500 hover:bg-blue-600 mt-2 shadow-2xl text-white rounded-lg'
              >
                History
              </button>
              <button 
                onClick={() => {
                  setShowWithdrawalForm(true);
                  setShowHistoryData(false);
                }}
                className='w-28 h-8 bg-green-500 hover:bg-green-600 mt-2 shadow-2xl text-white rounded-lg'
              >
                Withdraw
              </button>
            </div>
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
                <h1 className="text-lg font-bold mb-6">Withdrawal Request</h1>
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Total Online Earnings</span>
                  </label>
                  <input
                    type="text"
                    value={`NPR ${totalWithdrawal.toFixed(2)}`}
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
                    min="0"
                    max={availableWithdrawal}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={handleWithdrawl}
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700"
                  >
                    Request Withdrawal
                  </button>
                </div>
              </div>
            )}
            {showHistoryData && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                <h1 className="text-lg font-bold mb-6">Withdrawal History</h1>
                {withdrawalHistory.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No withdrawal history found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Withdrawed Amount</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdrawalHistory.map((item, index) => (
                          <tr key={index} className="border-t border-gray-100">
                            <td className="px-4 py-3">{moment(item.withdrawlAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}</td>
                            <td className="px-4 py-3">NPR: {(Number(item.netAmount || item.withdrawalAmount) || 0).toFixed(2)}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-sm ${
                                item.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {item.status || 'Pending'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setShowHistoryData(false);
                      setShowWithdrawalForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Back to Withdrawal
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