import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const TrackingAdoption = ({ userEmail }) => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/adoption/');
        if (!response.ok) throw new Error('Failed to fetch adoptions');
        
        const result = await response.json();
        const data = Array.isArray(result.data) ? result.data : [];
        const filteredAdoptions = data.filter(adoption => 
          adoption.email === userEmail
        );
        
        setAdoptions(filteredAdoptions);
        setError(null);
      } catch (err) {
        setError(err.message);
        setAdoptions([]);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) fetchAdoptions();
  }, [userEmail]);

  const handleConfirm = async (adoptionId) => {
    const result = await Swal.fire({
      title: "Confirm Adoption",
      text: "Are you sure you want to confirm this adoption?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm"
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/adoption/${adoptionId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Confirmed' })
        });

        if (!response.ok) throw new Error('Confirmation failed');

        setAdoptions(prev => prev.map(adoption => 
          adoption._id === adoptionId ? { ...adoption, status: 'Confirmed' } : adoption
        ));

        Swal.fire("Confirmed!", "Adoption has been confirmed.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  const handleCancel = async (adoptionId) => {
    const result = await Swal.fire({
      title: "Cancel Adoption",
      text: "Are you sure you want to cancel and delete this adoption?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete"
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/adoption/${adoptionId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!response.ok) throw new Error('Deletion failed');
  
        setAdoptions(prev => prev.filter(adoption => adoption._id !== adoptionId));
  
        Swal.fire("Deleted!", "Adoption has been cancelled and deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  return (
    <div className="bg-orange-100 p-6 rounded-lg shadow-md flex-1">
      <h2 className="text-xl font-semibold mb-4">Adoption Requests</h2>
      {loading ? (
        <p>Loading adoption records...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {adoptions.map(adoption => (
            <div key={adoption._id} className="bg-orange-50 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Adoption Request</h3>
              <img
                src={`http://localhost:3000/${adoption.image}`}
                alt={adoption.petname}
                className="w-full h-64 object-cover rounded-lg mt-2"
              />
              <p className="mt-2 font-medium">Booked by you</p>
              <p className="mt-2">Vendor Contact: {adoption.vendorcontact}</p>
              <p className="mt-1">Vendor Email: {adoption.vendoremail}</p>
              <p className="mt-1">
                Status:
                <span className={`ml-2 px-2 py-1 rounded ${adoption.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {adoption.status}
                </span>
              </p>
              {adoption.status === 'Available' && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleConfirm(adoption._id)}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleCancel(adoption._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
          {adoptions.length === 0 && !loading && <p>Adoption data not found..</p>}
        </div>
      )}
    </div>
  );
};

export default TrackingAdoption;