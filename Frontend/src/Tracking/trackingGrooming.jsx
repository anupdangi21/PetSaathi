import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const trackingGrooming = ({userEmail}) => {
      const [grooming, setGrooming] = useState([]);
      const [groomingLoading, setGroomingLoading] = useState(true);
      const [groomingError, setGroomingError] = useState(null);

      useEffect(() => {
          const fetchGroom = async () => {
            try {
              setGroomingLoading(true);
              const response = await fetch('http://localhost:3000/bookgroom/');
              if (!response.ok) throw new Error('Failed to fetch adoptions');
              
              const result = await response.json();
              const data = Array.isArray(result.data) ? result.data : [];
              const filteredGrooming = data.filter(grooming => 
                grooming.email === userEmail
              );
              
              setGrooming(filteredGrooming);
              setGroomingError(null);
            } catch (err) {
              setGroomingError(err.message);
              setGrooming([]);
            } finally {
              setGroomingLoading(false);
            }
          };
      
          if (userEmail) fetchGroom();
        }, [userEmail]);
      
        // Handle confirm adoption
        const handleGroomingConfirm = async (groomingId) => {
          const result = await Swal.fire({
            title: "Confirm Adoption",
            text: "Are you sure you want to confirm this service?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm"
          });
      
          if (result.isConfirmed) {
            try {
              const response = await fetch(`http://localhost:3000/bookgroom/user/${groomingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating: 'Rated' })
              });
      
              if (!response.ok) throw new Error('Confirmation failed');
      
              setGrooming(prev => prev.map(grooming => 
                grooming._id === grooming ? { ...grooming, rating: 'Rated' } : grooming
              ));
      
              Swal.fire("Confirmed!", "Grooming service has been confirmed.", "success");
            } catch (err) {
              Swal.fire("Error!", err.message, "error");
            }
          }
        };
      
        // Handle cancel adoption
        const handleGroomingCancel = async (groomingId) => {
          const result = await Swal.fire({
            title: "Cancel Adoption",
            text: "Are you sure you want to cancel and delete this service?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete"
          });
        
          if (result.isConfirmed) {
            try {
              const response = await fetch(`http://localhost:3000/bookgroom/${groomingId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
              });
        
              if (!response.ok) throw new Error('Deletion failed');
        
              setGrooming(prev => prev.filter(grooming => grooming._id !== groomingId));
        
              Swal.fire("Deleted!", "Adoption has been cancelled and deleted.", "success");
            } catch (err) {
              Swal.fire("Error!", err.message, "error");
            }
          }
        };
  return (
    <div className="bg-orange-100 p-6 rounded-lg shadow-md flex-1">
    <h2 className="text-xl font-semibold mb-4">Adoption Requests</h2>
    {groomingLoading ? (
      <p>Loading grooming records...</p>
    ) : groomingError ? (
      <p className="text-red-500">{error}</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {grooming.map(grooming => (
            <div key={grooming._id} className="bg-orange-50 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Grooming Request</h3>
              <img
                src={`http://localhost:3000/${grooming.image}`}
                alt={grooming.petname}
                className="w-full h-64 object-cover rounded-lg mt-2"
              />
              <p className="mt-2 font-medium">Booked by you</p>
              <p className="mt-2">Vendor Contact: {grooming.vendorcontact}</p>
              <p className="mt-1">Vendor Email: {grooming.vendoremail}</p>
              <p className="mt-1">
                Status:
                <span className={`ml-2 px-2 py-1 rounded ${grooming.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-green-50 text-green-500'}`}>
                  {grooming.status}
                </span>
              </p>
              <p className="mt-1">
                Rating:
                <span className={`ml-2 px-2 py-1 rounded ${grooming.rating === 'Not rated' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {grooming.rating}
                </span>
              </p>
              {grooming.rating === 'Not rated' && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleGroomingConfirm(grooming._id)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Rate
                  </button>
                  <button
                    onClick={() => handleGroomingCancel(grooming._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        {grooming.length === 0 && !groomingLoading && <p>Service records not found.</p>}
      </div>
    )}
  </div>
);
};

export default trackingGrooming
