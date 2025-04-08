import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import EsewaIntegration from "../Payment/EsewaIntegrationgroom"

const GroomingReservation = ({ pet, onClick }) => {
  const [date, setDate] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [paymentMode, setPaymentMode] = useState('cash');
  const [initiateEsewa, setInitiateEsewa] = useState(false);

  // useEffect(() => {
  //   const petDetails = JSON.parse(localStorage.getItem('selectedPet(groom)'));
  //   setSelectedPet(petDetails);
  // }, []);

  const userData = JSON.parse(localStorage.getItem("user_data"));
  if (!userData?.user?.email) {
    Swal.fire({
      icon: 'error',
      title: "Authentication error",
      text: "Email not found"
    });
    return;
  }

  useEffect(() => {
    if (date) {
      localStorage.setItem("groomingdate", date);
  
      const timeoutId = setTimeout(() => {
        console.log("Removing date from localStorage...");
        localStorage.removeItem("groomingdate");
      }, 240000); // 2 minutes
  
      return () => clearTimeout(timeoutId); // Cleanup timeout on re-render
    }
  }, [date]);

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
        text: 'Please select a valid future date.',
      });
      return;
    }

    

    // Cash payment processing
    const formData = new FormData(e.target);
    formData.append("image", pet.Image);
    formData.append("date", date);
    formData.append("organizationname", pet.organizationname);
    formData.append("selectedpackage", pet.serviceoffering);
    formData.append("includedservice", pet.includedOfferings);
    formData.append("price", pet.price);
    formData.append("location", pet.vendorlocation);
    formData.append("fullname", userData.user.username);
    formData.append("email", userData.user.email);
    formData.append("ownercontact", userData.user.number);
    formData.append("vendorcontact", pet.vendorcontact);
    formData.append("vendoremail", pet.vendoremail);

    const submissionData = {
      image: formData.get("image"),
      date: formData.get('date'),
      organizationname: formData.get('organizationname'),
      selectedpackage: formData.get("selectedpackage"),
      includedservice: formData.get("includedservice"),
      price: formData.get("price"),
      location: formData.get("location"),
      fullname: formData.get('fullname'),
      email: formData.get("email"),
      ownercontact: formData.get("ownercontact"),
      vendorcontact: formData.get("vendorcontact"),
      vendoremail: formData.get("vendoremail"),
      paymentStatus: 'cash'
    };

    if (paymentMode === 'online') {
      localStorage.setItem('formData', JSON.stringify(formData));
      setInitiateEsewa(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/bookgroom", submissionData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
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
  };

  return (
    <div className='w-full max-w-[800px] mx-auto mb-6'>
      {initiateEsewa && <EsewaIntegration amount={pet.price} />}

      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Get Your Service Now
      </h1>

      {pet && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex gap-6">
            {pet.Image && (
              <img
                src={`http://localhost:3000/${pet.Image}`}
                alt="Service"
                className="w-48 h-48 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4">Service Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Package:</p>
                  <p>{pet.serviceoffering}</p>
                </div>
                <div>
                  <p className="font-medium">Location:</p>
                  <p>{pet.vendorlocation}</p>
                </div>
                <div>
                  <p className="font-medium">Included Services:</p>
                  <p>{pet.includedOfferings}</p>
                </div>
                <div>
                  <p className="font-medium">Price:</p>
                  <p className="text-blues-600 font-bold">Rs {pet.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

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
      </form>
    </div>
  );
};

export default GroomingReservation;