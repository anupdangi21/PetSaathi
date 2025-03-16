import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const hostelRating = () => {
    const [hostel, setHostel] = useState([]);

    const handleHostelConfirm = async (hostelId) => {
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
                  const response = await fetch(`http://localhost:3000/bookhostel/user/${hostelId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rating: 'Rated' })
                  });
          
                  if (!response.ok) throw new Error('Confirmation failed');
          
                  setHostel(prev => prev.map(hostel => 
                    hostel._id === hostel ? { ...hostel, rating: 'Rated' } : hostel
                  ));
          
                  Swal.fire("Confirmed!", "Hostel Service has been rated.", "success");
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

export default hostelRating
