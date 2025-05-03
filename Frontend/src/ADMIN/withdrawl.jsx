import React, { useState, useEffect } from 'react';
import { Eye, X, Check } from 'lucide-react';
import Adminaside from '../Components/Adminaside';
import Swal from 'sweetalert2';

const Withdrawal = () => {
    const [isSidebarOpen] = useState(true);
    const [withdrawalRequests, setWithdrawalRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWithdrawals = async () => {
            try {
                const response = await fetch('http://localhost:3000/withdrawalrequest');
                if (!response.ok) {
                    throw new Error('Failed to fetch withdrawal requests');
                }
                const data = await response.json();
                setWithdrawalRequests(data.data.reverse());
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWithdrawals();
    }, []);

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setShowDetailsModal(true);
    };

    const handleReject = (request) => {
        setSelectedRequest(request);
        setShowRejectModal(true);
    };

    const handleConfirmRejection = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to reject this withdrawal?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, reject it!',
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3000/withdrawalrequestreject/${selectedRequest._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reason: rejectionReason }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Rejection failed');
            }

            setWithdrawalRequests(prev => prev.filter(req => req._id !== selectedRequest._id));
            setShowRejectModal(false);
            setRejectionReason('');
            Swal.fire('Rejected!', 'The withdrawal has been rejected.', 'success');
        } catch (err) {
            console.error('Rejection error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Rejection failed',
                text: err.message,
            });
        }
    };

    const handleApprove = async (requestId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to approve this withdrawal?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, approve it!',
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3000/withdrawalrequestapprove/${requestId}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Approval failed');
            }

            setWithdrawalRequests(prev => prev.filter(req => req._id !== requestId));
            Swal.fire('Approved!', 'The withdrawal has been approved.', 'success');
        } catch (err) {
            console.error('Approval error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Approval failed',
                text: err.message,
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        );
    }

    const pendingRequests = withdrawalRequests.filter(req => req.status === 'Pending');

    return (
        <div className='min-h-screen bg-gray-50 flex'>
            <aside>
                <Adminaside />
            </aside>

            <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
            <div className="mb-6 text-lg font-semibold">
                    Commission Earned: Rs. {Number(
                        withdrawalRequests.reduce((total, req) => {
                            return req.status === "Approved" && req.commissionEarned
                                ? total + Number(req.commissionEarned)
                                : total;
                        }, 0)
                    ).toFixed(2)}
                </div>
                {/* Pending Withdrawal Table */}
                <div className="rounded-lg shadow-lg bg-white p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">Pending Withdrawal Requests</h2>
                    <table className="w-full rounded-lg overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                {['S.N.', 'Full Name', 'Organization', 'Number', 'Amount', 'Status', 'Actions'].map((header) => (
                                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pendingRequests.map((data, index) => (
                                <tr key={data._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.fullname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.organizationname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.vendorcontact}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.withdrawalAmount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            data.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            data.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {data.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                        <button onClick={() => handleViewDetails(data)} className="text-blue-500 hover:text-blue-700">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleReject(data)} className="text-red-500 hover:text-red-700">
                                            <X className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleApprove(data._id)} className="text-green-500 hover:text-green-700">
                                            <Check className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* History Actions Table */}
                <div className="rounded-lg shadow-lg bg-white p-6">
                    <h2 className="text-xl font-semibold mb-4">Overall overview</h2>
                    <table className="w-full rounded-lg overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                {['S.N.', 'Full Name', 'Organization', 'Number', 'Withdrawal Amount', 'Status'].map((header) => (
                                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {withdrawalRequests.map((data, index) => (
                                <tr key={data._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.fullname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.organizationname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.vendorcontact}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.withdrawalAmount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            data.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            data.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {data.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Details Modal */}
                {showDetailsModal && selectedRequest && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h3 className="text-lg font-bold mb-4">Withdrawal Details</h3>
                            <div className="space-y-2">
                                <p><strong>Bank Name:</strong> {selectedRequest.bankname}</p>
                                <p><strong>Account Number:</strong> {selectedRequest.accountnumber}</p>
                                <p><strong>Account Name:</strong> {selectedRequest.bankaccountname}</p>
                                <p><strong>Overall Amount:</strong> {selectedRequest.overallAmount}</p>
                                <p><strong>Withdrawal Date:</strong> {new Date(selectedRequest.withdrawlAt).toLocaleString()}</p>
                                <p><strong>Location:</strong> {selectedRequest.location}</p>
                            </div>
                            <button 
                                onClick={() => setShowDetailsModal(false)} 
                                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Rejection Modal */}
                {showRejectModal && selectedRequest && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h3 className="text-lg font-bold mb-4">Reject Withdrawal Request</h3>
                            <div className="space-y-4">
                                <p><strong>Vendor:</strong> {selectedRequest.fullname}</p>
                                <p><strong>Organization:</strong> {selectedRequest.organizationname}</p>
                                <p><strong>Requested Amount:</strong> {selectedRequest.withdrawalAmount}</p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Reason for Rejection
                                    </label>
                                    <textarea
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        rows="3"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button 
                                    onClick={() => setShowRejectModal(false)} 
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleConfirmRejection} 
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Confirm Rejection
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Withdrawal;
