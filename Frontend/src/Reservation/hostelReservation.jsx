import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const hostelReservation = () => {
  const [date, setDate]=useState("")
  const [hasFirstPet, setHasFirstPet] = useState('');
  const [hasEnoughSpace, setHasEnoughSpace] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
      // Get the selected pet details from localStorage
      const petDetails = JSON.parse(localStorage.getItem('selectedPet'));
      setSelectedPet(petDetails); // Set the state with the pet details
  }, []);

  const userData = JSON.parse(localStorage.getItem("user_data"))
      if(!userData?.user?.email){
          Swal.fire({
              icon: 'error',
              title: "Authentication error",
              text: "email not found"
          })
          return ;
      }


  const handleSubmit = async (e) => {
      e.preventDefault();


      // Check if first pet and no space selected
      if (hasFirstPet === 'Yes' && hasEnoughSpace === 'No') {
          const result = await Swal.fire({
              title: 'Are you sure?',
              text: 'Are you sure you can provide better hospitality to your pet?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, I am sure!',
              cancelButtonText: 'No'
          });

          if (!result.isConfirmed) {
              return; 
          }
      }
              // Get today's date (without time)
              const today = new Date();
              today.setHours(0, 0, 0, 0); 
          
              // Convert the selected date to a Date object
              const selectedDate = new Date(date);
              selectedDate.setHours(0, 0, 0, 0); 
          
              // Check if the selected date is in the past
              if (selectedDate < today) {
                  Swal.fire({
                      icon: 'error',
                      title: 'Invalid Date',
                      text: 'The selected date has already passed. Please enter a valid date.',
                  });
                  return;
              }

      // Proceed with form submission
      const formData = new FormData(e.target);
      formData.append("image",selectedPet.Image)
      formData.append("date", date);
      formData.append("firstPet", hasFirstPet)
      formData.append("enoughSpace", hasEnoughSpace)
      formData.append("petname", selectedPet.petname);
      formData.append("location", selectedPet.Location);
      formData.append("Category", selectedPet.Category);
      formData.append("fullname",userData.user.username);
      formData.append("email", userData.user.email);
      formData.append("ownercontact", userData.user.number);
      formData.append("vendorcontact", selectedPet.vendorcontact);
      formData.append("vendoremail", selectedPet.email);
      formData.append("status", selectedPet.status);
      const submissionData = {
          image:formData.get("image"),
          date: formData.get('date'),
          firstPet: formData.get("firstPet"),
          enoughSpace: formData.get("enoughSpace"),
          petname: formData.get("petname"),
          location: formData.get("location"),
          Category: formData.get("Category"),
          fullname: formData.get('fullname'),
          email:formData.get("email"),
          ownercontact: formData.get("ownercontact"),
          vendorcontact: formData.get("vendorcontact"),
          vendoremail: formData.get("vendoremail"),
          status: formData.get("status"),
      };

      console.log('Submission data:', submissionData);
      Swal.fire('Success!', 'Your application has been submitted!', 'success');

      try {
          const response = await axios.post("http://localhost:3000/adoption",submissionData,{
              headers: {
                  "Content-Type": "application/json",
              },
          })

          if(response.status===200){
                          Swal.fire({
                              icon: 'success',
                              title: "Pet Adoption request",
                              text: "Your request has been submitted successfully"
                              })
                      }
      } catch (error) {
          console.error(error);
          Swal.fire({
              icon: 'error',
              title: "Error",
              text: "Error in sending data"
          })
      }
  };

  return (
      <div className='w-full max-w-[800px] mx-auto'>
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Get your hostel now!!!
          </h1>

          {/* Display the selected pet details */}
          {selectedPet ? (
              <div className="flex items-center bg-white p-6 rounded-lg shadow-md mb-6">
                  <div className="flex-1">
                      <h3 className="text-xl font-bold">Selected Service Details:</h3>
                      <p className='mt-2'><strong>Pet Name:</strong> {selectedPet.medicalsupport}</p>
                      <p className='mt-2'><strong>Category:</strong> {selectedPet.Category}</p>
                      <p className='mt-2'><strong>Age:</strong> {selectedPet.Age}</p>
                      {/* <p className='mt-2'><strong>Image:</strong> {selectedPet.Image}</p> */}
                      <p className='mt-2'><strong>Organization Location:</strong> {selectedPet.Location}</p>
                  </div>
              </div>
          ) : (
              <p className="text-center text-gray-500">No pet selected.</p>
          )}

          {/* Reservation Form */}
          <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-6 min-h-[40vh] w-full'>
              <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap gap-2">
                      <div className="flex-1 w-48">
                          <label className="block text-gray-700 text-sm font-bold mb-2 w-96">
                              Book a date
                          </label>
                          <input
                              type="date"
                              name="date"
                              className="w-96 px-3 py-2 border rounded-md"
                              required
                              onChange={(e)=>setDate(e.target.value)}
                          />
                      </div>
                  </div>
                  {/* Submit Button */}
                  <button
                      type="submit"
                      className="w-24 bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition duration-300"
                  >
                      Submit
                  </button>
              </div>
          </form>
      </div>
  );
};

export default hostelReservation
