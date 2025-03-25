import React, { useState } from 'react';
import { Star } from "lucide-react";
import moment from 'moment-timezone';


const TrainingRating = ({ onClose, onSubmit,trainingData }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [area, setArea] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      rating,
      area,
      comment,
      image:trainingData.image,
      organizationname: trainingData.organizationname,
      bookedAt: trainingData.bookedAt,
      vendoremail: trainingData.vendoremail,
      vendorcontact:trainingData.vendorcontact,
      selectedpackage: trainingData.selectedpackage,
      price:trainingData.price,
      location:trainingData.location,
      fullname: trainingData.fullname,
      email:trainingData.email,
      ownercontact:trainingData.ownercontact,
      Duration:trainingData.Duration,
      SelectedTiming:trainingData.SelectedTiming,
    });
  };

  return (
    <div className="max-w-[600px] mx-auto p-6 space-y-4 shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold">Rate Your Experience</h2>
          {trainingData && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Service Details:</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Vendor:</p>
                          <p>{trainingData.organizationname}</p>
                        </div>
                        <div>
                          <p className="font-medium">Booked Date:</p>
                          <p>{moment(trainingData.bookedAt).tz("Asia/Kathmandu").format("MMM Do YYYY, h:mm:ss a")}</p>
                        </div>
                        <div>
                          <p className="font-medium">Vendor E-mail:</p>
                          <p>{trainingData.vendoremail}</p>
                        </div>
                        <div>
                          <p className="font-medium">Package Type:</p>
                          <p>{trainingData.selectedpackage}</p>
                        </div>
                      </div>
                    </div>
                  )}
          <div className="flex space-x-1 my-3">
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
          <label className="block font-medium">Area for Improvement</label>
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter area for improvement"
            className="mb-3 input input-bordered border border-gray-300 rounded-md h-10 w-80"
            required
          />
          <label className="block font-medium">User Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment"
            className='mb-3 input input-bordered border border-gray-300 rounded-md h-20 w-64'
            required
          />
          <div className="flex gap-2 mt-4">
            <button type="submit" className="flex-1 bg-orange-300 hover:bg-orange-400 h-12">
              Submit
            </button>
            <button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
    </div> 
  );
};

export default TrainingRating;