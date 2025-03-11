import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const groomingReservation = ({pet, onClick}) => {
  const [date, setDate]=useState("")
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
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
    
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
    
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0); 
    
        if (selectedDate < today) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Date',
                text: 'The selected date has already passed. Please enter a valid date.',
            });
            return;
        }
        
        const formData = new FormData(e.target);
        formData.append("image", pet.Image);
        formData.append("date", date);
        formData.append("selectedpackage", pet.serviceoffering);
        formData.append("includedservice", pet.includedOfferings);
        formData.append("price", pet.price);
        formData.append("location", pet.vendorlocation);
        formData.append("fullname", userData.user.username);
        formData.append("email", userData.user.email);
        formData.append("ownercontact", userData.user.number);
        formData.append("vendorcontact", pet.vendorcontact);
        formData.append("vendoremail", pet.vendoremail);
        formData.append("status", pet.status);
        // payment mode baaki xa

        const submissionData = {
            image: formData.get("image"),
            date: formData.get('date'),
            selectedpackage: formData.get("selectedpackage"),
            includedservice: formData.get("includedservice"),
            price: formData.get("price"),
            location: formData.get("location"),
            fullname: formData.get('fullname'),
            email: formData.get("email"),
            ownercontact: formData.get("ownercontact"),
            vendorcontact: formData.get("vendorcontact"),
            vendoremail: formData.get("vendoremail"),
            status: formData.get("status"),
        };
    
        console.log('Submission data:', submissionData);
        Swal.fire('Success!', 'Your application has been submitted!', 'success');
    
        try {
            const response = await axios.post("http://localhost:3000/bookgroom", submissionData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: "Pet Grooming service request",
                    text: "Your request has been submitted successfully"
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: "Error",
                text: "Error in sending data"
            });
        }
    };
    

  return (
      <div className='w-full max-w-[800px] mx-auto mb-6'>
          <h1 className="text-2xl font-bold text-gray-800 text-center ">
              Get your service now!!!
          </h1>
          {/* Display the selected pet details */}
          {pet && Object.keys(pet).length > 0 ? (
                  <div className="flex-1">
                  {pet.Image && (
                    <img
                    src={`http://localhost:3000/${pet.Image}`}
                    alt={pet.Category}
                    className="w-full h-64 object-cover rounded-lg mr-6 mt-4"
                    />
                )}
                    <div className="flex justify-between items-start mt-4">
                    <div>
                      <h3 className="text-xl font-bold">Selected Service Details:</h3>
                      </div>
                      <p className='ml-96 text-lg font-bold'>Price</p>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        
                    Rs {pet.price}
                  </span>
                  </div>
                    <div className='flex justify-between items-start'>
                      <p className='mt-2'><strong>Selected Package:</strong> {pet.serviceoffering}</p>
                      <p className='mt-2'><strong>Organization Location:</strong> {pet.vendorlocation}</p>
                    </div>
                      <p className='mt-2'><strong>Services included:</strong> {pet.includedOfferings}</p>
                      {/* <p className='mt-2'><strong>Image:</strong> {selectedPet.Image}</p> */}
                      
                  </div>
          ) : (
              <p className="text-center text-gray-500">No pet selected.</p>
          )}

          {/* Reservation Form */}
          <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-6 w-full'>
              <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap gap-2">
                      <div className="flex-1 w-36">
                          <label className="block text-gray-700 text-sm font-bold mb-2 w-96">
                              Book a date
                          </label>
                          <input
                              type="date"
                              name="date"
                              className="w-64 px-3 py-2 border rounded-md"
                              required
                              onChange={(e)=>setDate(e.target.value)}
                          />
                      </div>
                      <div>
                        <label className='bold-text-gray-700 text-sm font-bold'>Proceed with online payment  </label>
                        {/* <button className='flex w-36 h-10 font-bold text-lg bg-purple-200 hover:bg-purple-400 ml-2 mt-2'
                            type='onclick'
                        >
                           <h1 className='ml-2 mt-2'>Pay with khalti</h1> 
                        </button> */}
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

export default groomingReservation
