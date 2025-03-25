import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Star } from "lucide-react";

const GroomingRating = ({onClose, onSubmit,userEmail}) => {
  const [grooming, setGrooming] = useState([]);
  const [groomingError, setGroomingError] = useState(null);
        const [groomingLoading, setGroomingLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [area, setArea] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      rating,
      area,
      comment
    });
  };
  useEffect(() => {
            const fetchGroom = async () => {
              try {
                setGroomingLoading(true);
                const response = await fetch('http://localhost:3000/bookgroom');
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
    
  return (
    <div className="max-w-md mx-auto p-6 space-y-4 shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold">Rate Your Experience</h2>
          <div className="flex space-x-1 my-3">
          <img
                src={`http://localhost:3000/${grooming.Image}`}
                alt={grooming.petname}
                className="w-full h-64 object-cover rounded-lg mt-2"
              />
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
          <img
                src={`http://localhost:3000/${grooming.Image}`}
                alt={grooming.petname}
                className="w-full h-64 object-cover rounded-lg mt-2"
              />
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
            <button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600">
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

export default GroomingRating
