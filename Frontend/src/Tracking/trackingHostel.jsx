import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import HostelRating from "../Rating/hostelRating"

const trackingHostel = ({userEmail}) => {
    const [hostel, setHostel] = useState([]);
      const [hostelLoading, setHostelLoading] = useState(true);
      const [hostelError, setHostelError] = useState(null);
        const [showRatingModal, setShowRatingModal] = useState(false);
        const [selectedHostelId, setselectedHostelId] = useState(null);

       // fetch hostel booked data
        useEffect(() => {
          const fetchHostel = async () => {
            try {
              setHostelLoading(true);
              const response = await fetch('http://localhost:3000/bookhostel/');
              if (!response.ok) throw new Error('Failed to fetch adoptions');
              
              const result = await response.json();
              const data = Array.isArray(result.data) ? result.data : [];
              const filteredHostel = data.filter(hostel => 
                hostel.email === userEmail
              );
              
              setHostel(filteredHostel.reverse());
              setHostelError(null);
            } catch (err) {
              setHostelError(err.message);
              setHostel([]);
            } finally {
              setHostelLoading(false);
            }
          };
      
          if (userEmail) fetchHostel();
        }, [userEmail]);

      const handleRatingSubmit = async (ratingData) => {
          try {
            const response = await fetch(`http://localhost:3000/bookhostel/user/${selectedHostelId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                rating: 'Rated',
                stars: ratingData.rating,
                areaImprovement: ratingData.area,
                userComment: ratingData.comment
              })
            });
      
            if (!response.ok) throw new Error('Failed to submit rating');
      
            setHostel(prev => prev.map(hostel => 
              hostel._id === selectedHostelId 
                ? { ...hostel, rating: 'Rated' } 
                : hostel
            ));
      
            setShowRatingModal(false);
            Swal.fire("Success!", "Rating submitted successfully.", "success");
          } catch (err) {
            Swal.fire("Error!", err.message, "error");
          }
        };
        
      
        // Handle cancel adoption
        const handleHostelCancel = async (hostelId) => {
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
              const response = await fetch(`http://localhost:3000/bookhostel/${hostelId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
              });
        
              if (!response.ok) throw new Error('Deletion failed');
        
              setHostel(prev => prev.filter(hostel => hostel._id !== hostelId));
        
              Swal.fire("Deleted!", "Hostel Service has been cancelled and deleted.", "success");
            } catch (err) {
              Swal.fire("Error!", err.message, "error");
            }
          }
        };
      
  return (
    <div className="bg-orange-100 p-6 rounded-lg shadow-md flex-1">
      <h2 className="text-xl font-semibold mb-4">Hostel Requests</h2>
      {hostelLoading ? (
        <p>Loading hostel records...</p>
      ) : hostelError ? (
        <p className="text-red-500">{hostelError}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {hostel.map(hostel => (
            <div key={hostel._id} className="bg-orange-50 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Hostel Request</h3>
              <img
                src={`http://localhost:3000/${hostel.image}`}
                alt={hostel.petname}
                className="w-full h-64 object-cover rounded-lg mt-2"
              />
              <p className="mt-2 font-medium">Booked by you</p>
              <p className="mt-2">Vendor Contact: {hostel.vendorcontact}</p>
              <p className="mt-1">Vendor Email: {hostel.vendoremail}</p>
              <p className="mt-1">
                Status:
                <span className={`ml-2 px-2 py-1 rounded ${hostel.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-green-50 text-green-500'}`}>
                  {hostel.status}
                </span>
              </p>
              <p className="mt-1">
                Rating:
                <span className={`ml-2 px-2 py-1 rounded ${hostel.rating === 'Not rated' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {hostel.rating}
                </span>
              </p>
              {hostel.rating === 'Not rated' && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => {
                      setselectedHostelId(hostel._id);
                      setShowRatingModal(true);
                    }}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Rate
                  </button>
                  <button
                    onClick={() => handleHostelCancel(hostel._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
          {hostel.length === 0 && !hostelLoading && <p>Service records not found.</p>}
        </div>
      )}

      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <HostelRating
              onClose={() => setShowRatingModal(false)}
              onSubmit={handleRatingSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default trackingHostel
