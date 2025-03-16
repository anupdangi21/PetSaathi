import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const groomingRating = () => {

    const [grooming, setGrooming] = useState([]);
    
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
  return (
    <div>
      
    </div>
  )
}

export default groomingRating
