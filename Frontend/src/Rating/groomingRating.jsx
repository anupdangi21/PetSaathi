import React, { useState } from 'react';
import { Star } from "lucide-react";
import moment from 'moment-timezone';

const GroomingRating = ({ onClose, onSubmit, groomingData }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [area, setArea] = useState("");
  const [comment, setComment] = useState("");

    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (!userData?.user?.email) {
      Swal.fire({
        icon: 'error',
        title: "Authentication error",
        text: "Email not found"
      });
      // console.log("anup",userData.user.username)
      return;
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      rating,
      area,
      comment,
      image:groomingData.image,
      organizationname: groomingData.organizationname,
      bookedAt: groomingData.bookedAt,
      vendoremail: groomingData.vendoremail,
      vendorcontact:groomingData.vendorcontact,
      selectedpackage: groomingData.selectedpackage,
      price:groomingData.price,
      location:groomingData.location,
      fullname: groomingData.fullname,
      email:groomingData.email,
      ownercontact:groomingData.ownercontact
    });
  };

  return (
    <div className="max-w-[600px] mx-auto p-6 space-y-4 shadow-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Rate Your Experience</h2>
        
        {/* Service Details Section */}
        {groomingData && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Service Details:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Vendor:</p>
                <p>{groomingData.organizationname}</p>
              </div>
              <div>
                <p className="font-medium">Booked Date:</p>
                <p>{moment(groomingData.bookedAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}</p>
              </div>
              <div>
                <p className="font-medium">Vendor E-mail:</p>
                <p>{groomingData.vendoremail}</p>
              </div>
              <div>
                <p className="font-medium">Package Type:</p>
                <p>{groomingData.selectedpackage}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <div>
            <label className="block font-medium mb-2">Your Rating</label>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <Star
                    key={index}
                    className={`w-8 h-8 cursor-pointer ${
                      (hover || rating) >= starValue ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(starValue)}
                    fill={(hover || rating) >= starValue ? "#FACC15" : "none"}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Area for Improvement</label>
            <input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="What could we improve?"
              className="input input-bordered border border-gray-300 rounded-md h-10 w-full p-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Your Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className='input input-bordered border border-gray-300 rounded-md h-20 w-full p-2'
              required
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            className="flex-1 bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-300 h-12"
          >
            Submit Rating
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroomingRating;