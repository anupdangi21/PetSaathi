import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {Truck,Ambulance,Utensils,MapPin } from 'lucide-react';
import EsewaIntegrationHostel from "../Payment/EsewaIntegration(hostel)"


const hostelReservation = () => {
  const [date, setDate]=useState("")
  const [days, setDays]=useState("")
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [price, setPrice] = useState(0);
  const [paymentMode, setPaymentMode]=useState('cash')
  const [initiateEsewa, setInitiateEsewa]=useState(false)

  useEffect(() => {
      // Get the selected pet details from localStorage
      const petDetails = JSON.parse(localStorage.getItem('selectedPetHostel'));
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

        useEffect(() => {
          if (date) {
            localStorage.setItem('hosteldate', date);
          }
          setTimeout(() => {
            localStorage.removeItem('hosteldate');
        }, 120000);
        }, [date]);

  const handleSubmit = async (e) => {
      e.preventDefault();
  
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

              if(paymentMode === "online"){
                setInitiateEsewa(true)
                return ;
              }

      // Proceed with form submission
      const formData = new FormData(e.target);
      formData.append("image",selectedPet.Image)
      formData.append("date", date);
      formData.append("days", days);
      formData.append("food", selectedPet.food)
      formData.append("medicalsupport", selectedPet.medicalsupport)
      formData.append("petpickup", selectedPet.petpickup)
      formData.append("petdropoff", selectedPet.petdropoff)
      formData.append("vendorlocation", selectedPet.vendorlocation);
      formData.append("fullname",userData.user.username);
      formData.append("email", userData.user.email);
      formData.append("ownercontact", userData.user.number);
      formData.append("vendorcontact", selectedPet.vendorcontact);
      formData.append("vendoremail", selectedPet.vendoremail);
      // formData.append("status", selectedPet.status);
      formData.append("accommodationType", selectedAccommodation.type); // Add selected accommodation type
      formData.append("price", price * parseInt(days));
      formData.append("organizationname", selectedPet.organizationname);
      const submissionData = {
          image:formData.get("image"),
          date: formData.get('date'),
          days:formData.get('days'),
          food: formData.get('food'),
          medicalsupport: formData.get('medicalsupport'),
          petpickup: formData.get('petpickup'),
          petdropoff: formData.get('petdropoff'),
          vendorlocation: formData.get("vendorlocation"),
          fullname: formData.get('fullname'),
          email:formData.get("email"),
          ownercontact: formData.get("ownercontact"),
          vendorcontact: formData.get("vendorcontact"),
          vendoremail: formData.get("vendoremail"),
          // status: formData.get("status"),
          accommodationType: formData.get("accommodationType"),
          price: formData.get("price"),
          organizationname: formData.get("organizationname"),
          paymentStatus:"cash"
      };

      console.log('Submission data:', submissionData);
      Swal.fire('Success!', 'Your application has been submitted!', 'success');

      try {
          const response = await axios.post("http://localhost:3000/bookhostel",submissionData,{
              headers: {
                  "Content-Type": "application/json",
              },
          })

          if(response.status===200){
                          Swal.fire({
                              icon: 'success',
                              title: "Hostel Service request",
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
  const handleAccommodationChange = (e) => {
    const selectedType = e.target.value;
    const accommodation = selectedPet.accommodationDetails.find(
      (item) => item.type === selectedType
    );
    setSelectedAccommodation(accommodation);
    setPrice(parseFloat(accommodation.price)); // Convert price to a number
  };

  return (
      <div className='w-full max-w-[800px] mx-auto'>
        {initiateEsewa && <EsewaIntegrationHostel amount = {price * parseInt(days)} />}
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Get your hostel now!!!
          </h1>

          {/* Display the selected pet details */}
          {selectedPet ? (
              <div className=" items-center bg-white p-6 rounded-lg shadow-md mb-6">
                   <div>
                  <div className='grid gap-1 mb-2'>
                  <div className="space-y-3">
                  <div className='flex flex'>
                    <h2 className="text-lg font-bold">From: </h2><p className=' text-lg mt-0.5 ml-2'>{selectedPet.organizationname}</p>
                    <div className="flex items-center text-gray-600 ml-32">
                      <MapPin size={20} className="mr-2" />
                      <span className='font-bold text-lg'>{selectedPet.vendorlocation}</span>
                   </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6 mt-4">
                  <div className="flex items-center">
                    <Utensils size={20} className="mr-2" />
                    <span>Food time: {selectedPet.food}</span>
                  </div>
                  <div className="flex items-center">
                    <Ambulance size={20} className="mr-2" />
                    <span>Medical Support: {selectedPet.medicalsupport}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck size={20} className="mr-2" />
                    <span>Pick up: {selectedPet.petpickup}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck size={20} className="mr-2" />
                    <span>Drop Off: {selectedPet.petdropoff}</span>
                  </div>
                  </div>  
                  </div>
                  {selectedPet?.accommodationDetails?.length > 0 ? (
                      selectedPet.accommodationDetails.map((item, index) => (
                        <li key={index}>
                          <strong>Accommodation type:</strong> {item.type}, 
                          <span className='ml-6 mr-4'>
                          <strong> Available seats:</strong> {item.count}</span> 
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          <strong>   Price:</strong> {item.price}</span> per day
                          
                        </li>
                      ))
                    ) : (
                      <p>No accommodation details available</p>
                    )}
                  </div>
                  </div>   
              </div>
                

          ) : (
              <p className="text-center text-gray-500">No pet selected.</p>
          )}

          {/* Reservation Form */}
          <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-2 min-h-[20vh] w-full'>
            <div>
        <div className="flex flex-col gap">
          <div className="flex flex-wrap gap-2">
          <div className="flex-1 w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Book a date
          </label>
          <input
            type="date"
            name="date"
            className="w-full px-4 py-2 border rounded-md"
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex-1 w-1/2">
          <label className="font-medium text-gray-700">No of training days*</label>
          <select
            name="eligibility"
            required
            className="w-full mt-.5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          >
            <option value="" disabled>Select the hostel days</option>
            <option value="7 Days">7 Days</option>
            <option value="14 Days">14 Days</option>
            <option value="30 Days">30 Days</option>
            <option value="45 Days">45 Days</option>
            <option value="60 Days">60 Days</option>
          </select>
        </div>
        </div>
          {selectedPet?.accommodationDetails && selectedPet.accommodationDetails.length > 0 && (
            <div className='flex flex'>
              <div className="flex-1 w-36 mt-8">
                <label className="bold-text-gray-700 text-sm font-bold">Select Accommodation Type</label>
                <select
                  className="border p-1 rounded"
                  onChange={handleAccommodationChange}
                  required
                >
                  <option value="">Select an option</option>
                  {selectedPet.accommodationDetails.map((item, index) => (
                    <option key={index} value={item.type}>
                      {item.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 w-36 mt-4">
                <label className="bold-text-gray-700 text-sm font-bold">Price</label>
                <div className="border p-1 rounded">
                  {price ? `Rs${(price * parseInt(days)).toFixed(0)}` : "Price is autofilled based on selected accommodation"}
                </div>
              </div>
            </div>
          )}
          {/* Submit Button */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Payment Method:</span>
            <button
              type="button"
              onClick={() => setPaymentMode('cash')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                paymentMode === 'cash' 
                  ? 'bg-orange-300 text-white' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              Cash on Service
            </button>
            <button
              type="button"
              onClick={() => setPaymentMode('online')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                paymentMode === 'online' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              Online Payment
            </button>
          </div>
          {paymentMode === 'online' && (
            <p className="mt-2 text-sm text-gray-500">
              Secure online payment via eSewa
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-300 text-white py-3 px-6 rounded-lg font-medium
           hover:bg-orange-400 transition-colors duration-300"
        >
          {paymentMode === 'online' ? 'Proceed to Payment' : 'Confirm Booking'}
        </button>
        </div>
        </div>
      </form>
      </div>
  );
};

export default hostelReservation
