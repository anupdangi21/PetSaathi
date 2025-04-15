import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import TrainingRating from '../Rating/trainingRating'; 
import axios from "axios"
import moment from "moment-timezone"

const TrackingTraining = ({ userEmail }) => {
  const [training, setTraining] = useState([]);
  const [trainingLoading, setTrainingLoading] = useState(true);
  const [trainingError, setTrainingError] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        setTrainingLoading(true);
        const response = await fetch('http://localhost:3000/booktrain/');
        if (!response.ok) throw new Error('Failed to fetch training records');
        
        const result = await response.json();
        const data = Array.isArray(result.data) ? result.data : [];
        const filteredTraining = data.filter(training => 
          training.email === userEmail
        );
        
        setTraining(filteredTraining.reverse());
        setTrainingError(null);
      } catch (err) {
        setTrainingError(err.message);
        setTraining([]);
      } finally {
        setTrainingLoading(false);
      }
    };

    if (userEmail) fetchTraining();
  }, [userEmail]);


  const handleTrainingCancel = async (trainingId) => {
    const result = await Swal.fire({
      title: "Cancel Training",
      text: "Are you sure you want to cancel and delete this service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Confirm"
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/booktrain/${trainingId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!response.ok) throw new Error('Deletion failed');
  
        setTraining(prev => prev.filter(training => training._id !== trainingId));
        
        Swal.fire("Deleted!", "Training Service has been cancelled and deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  const handleRatingSubmit = async (ratingData) => {
    try {
      const response = await fetch(`http://localhost:3000/booktrain/user/${selectedTrainingId._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: 'Rated',
        })
      });

      if (!response.ok) throw new Error('Failed to submit rating');


      //for handling the rating 
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
        fullname: ratingData.fullname,
        email: ratingData.email,
        ownercontact: ratingData.ownercontact,
        Duration:ratingData.Duration,
        SelectedTiming:ratingData.SelectedTiming,
      };
      console.log("aaba tha hunxa balla",submissionData)

      //for posting the user review and rating in the db
      try {
        const responsesave = await axios.post("http://localhost:3000/trainingreview", submissionData, {
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
      setTraining(prev => prev.map(training => 
        training._id === selectedTrainingId 
          ? { ...training, rating: 'Rated' } 
          : training
      ));

      setShowRatingModal(false);
      Swal.fire("Success!", "Rating submitted successfully.", "success");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <div className="bg-orange-100 p-6 rounded-lg shadow-md flex-1">
      <h2 className="text-xl font-semibold mb-4">Training Requests</h2>
      {trainingLoading ? (
        <p>Loading training records...</p>
      ) : trainingError ? (
        <p className="text-red-500">{trainingError}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {training.map(training => (
            <div key={training._id} className="bg-orange-50 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Training Request</h3>
              <img
                src={`http://localhost:3000/${training.image}`}
                alt={training.petname}
                className="w-full h-64 object-cover rounded-lg mt-2"
              />
              <p className="mt-2 font-medium">Booked by you</p>
              <p className="mt-2">Booked on: {moment(grooming.bookedAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}</p>
              <p className="mt-2">Vendor Contact: {training.vendorcontact}</p>
              <p className="mt-1">Vendor Email: {training.vendoremail}</p>
              <p className="mt-1">Payment Status: {training.paymentStatus}</p>
              <p className="mt-1">
                Status:
                <span className={`ml-2 px-2 py-1 rounded ${training.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-green-50 text-green-500'}`}>
                  {training.status}
                </span>
              </p>
              <p className="mt-1">
                Rating:
                <span className={`ml-2 px-2 py-1 rounded ${training.rating === 'Not rated' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {training.rating}
                </span>
              </p>
              {training.rating === 'Not rated' && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => {
                      setSelectedTrainingId(training);
                      setShowRatingModal(true);
                    }}
                    className="flex-1 bg-orange-300 text-white px-4 py-2 rounded hover:bg-orange-400"
                  >
                    Rate
                  </button>
                  <button
                    onClick={() => handleTrainingCancel(training._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
          {training.length === 0 && !trainingLoading && <p>Service records not found.</p>}
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-[600px]">
            <TrainingRating
              onClose={() => setShowRatingModal(false)}
              onSubmit={handleRatingSubmit}
              trainingData={selectedTrainingId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingTraining;