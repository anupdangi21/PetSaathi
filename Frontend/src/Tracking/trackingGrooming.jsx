import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import GroomingRating from "../Rating/groomingRating"

const trackingGrooming = ({userEmail}) => {
  const [grooming, setGrooming] = useState([]);
  const [groomingLoading, setGroomingLoading] = useState(true);
  const [groomingError, setGroomingError] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedGrooming, setSelectedGrooming] = useState(null);

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
        
        setGrooming(filteredGrooming.reverse());
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

  const handleRatingSubmit = async (ratingData) => {
    try {
      const response = await fetch(`http://localhost:3000/bookgroom/user/${selectedGrooming._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: 'Rated',

        })
      });
  
      if (!response.ok) throw new Error('Failed to submit rating');

      const submissionData = {
        stars: ratingData.rating,
        areaImprovement: ratingData.area,
        userComment: ratingData.comment,
        image: ratingData.image,
        organizationname: ratingData.organizationname,
        bookedAt: ratingData.bookedAt,
        vendoremail: ratingData.vendoremail,
        vendorcontact: ratingData.vendorcontact,
        selectedpackage: ratingData.selectedpackage,
        price: ratingData.price,
        location: ratingData.location,
        username: ratingData.fullname,
        email: ratingData.email,
        ownercontact: ratingData.ownercontact
      };
      console.log("aaba tha hunxa balla",submissionData)

      //for posting the user review and rating in the db
      try {
        const responsesave = await axios.post("http://localhost:3000/groomingreview", submissionData, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(submissionData)
        if (responsesave.status === 200) {
          Swal.fire({
            icon: 'success',
            title: "Booking Successful!",
            text: "Your appointment has been scheduled"
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: "Booking Failed",
          text: "Error processing your request"
        });
      }
//

      setGrooming(prev => prev.map(grooming => 
        grooming._id === selectedGrooming._id 
          ? { ...grooming, rating: 'Rated' } 
          : grooming
      ));
  
      setShowRatingModal(false);
      Swal.fire("Success!", "Rating submitted successfully.", "success");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <div className="bg-orange-100 p-6 rounded-lg shadow-md flex-1">
      <h2 className="text-xl font-semibold mb-4">Grooming Requests</h2>
      {groomingLoading ? (
        <p>Loading grooming records...</p>
      ) : groomingError ? (
        <p className="text-red-500">{groomingError}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {grooming.map(grooming => (
            <div key={grooming._id} className="bg-orange-50 p-6 rounded-lg shadow-md">
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
                    onClick={() => {
                      setSelectedGrooming(grooming);
                      setShowRatingModal(true);
                    }}
                    className="flex-1 bg-orange-300 text-white px-4 py-2 rounded hover:bg-orange-400"
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

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-[600px]">
            <GroomingRating
              onClose={() => setShowRatingModal(false)}
              onSubmit={handleRatingSubmit}
              groomingData={selectedGrooming}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default trackingGrooming;