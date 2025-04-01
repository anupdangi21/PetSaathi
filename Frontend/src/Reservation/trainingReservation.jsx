import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import EsewaIntegration from "../Payment/EsewaIntegrationgroom"

const trainingReservation = ({pet, onClick}) => {
    const [date, setDate]=useState("")
    const [selectedTiming, setSelectedTiming]= useState("")
    const [selectedPet, setSelectedPet] = useState(null);
    const [paymentMode, setPaymentMode]=useState("cash");
    const [initiateEsewa, setInitiateEsewa]=useState(false)
  
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

        useEffect(() => {
          if (date) {
            localStorage.setItem('trainingdate', date);
          }
          setTimeout(() => {
            localStorage.removeItem('trainingdate');
        }, 120000);
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
                  text: 'The selected date has already passed. Please enter a valid date.',
              });
              return;
          }

          if(paymentMode === "online"){
            setInitiateEsewa(true)
            return
          }
          
          const formData = new FormData(e.target);
          formData.append("image", pet.Image);
          formData.append("date", date);
          formData.append("organizationname",pet.organizationname)
          formData.append("selectedpackage", pet.serviceoffering);
          formData.append("includedservice", pet.includedOfferings);
          formData.append("price", pet.price);
          formData.append("Restriction",pet.eligibility);
          formData.append("Duration",pet.duration)
          formData.append("SelectedTiming",selectedTiming)
          formData.append("location", pet.vendorlocation);
          formData.append("fullname", userData.user.username);
          formData.append("email", userData.user.email);
          formData.append("ownercontact", userData.user.number);
          formData.append("vendorcontact", pet.vendorcontact);
          formData.append("vendoremail", pet.vendoremail);
          formData.append("days",pet.days)
        //   formData.append("status", pet.status);
          // payment mode baaki xa
  
          const submissionData = {
              image: formData.get("image"),
              date: formData.get('date'),
              organizationname: formData.get('organizationname'),
              selectedpackage: formData.get("selectedpackage"),
              includedservice: formData.get("includedservice"),
              price: formData.get("price"),
              Restriction: formData.get("Restriction"),
              Duration: formData.get("Duration"),
              SelectedTiming: formData.get("SelectedTiming"),
              location: formData.get("location"),
              fullname: formData.get('fullname'),
              email: formData.get("email"),
              ownercontact: formData.get("ownercontact"),
              vendorcontact: formData.get("vendorcontact"),
              vendoremail: formData.get("vendoremail"),
              days: formData.get("days"),
              paymentStatus: 'cash'
            //   status: formData.get("status"),
          };
      
          console.log('Submission data:', submissionData);
          Swal.fire('Success!', 'Your application has been submitted!', 'success');
      
          try {
              const response = await axios.post("http://localhost:3000/booktrain", submissionData, {
                  headers: {
                      "Content-Type": "application/json",
                  },
              });
      
              if (response.status === 200) {
                  Swal.fire({
                      icon: 'success',
                      title: "Pet training service request",
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
        <div className='w-full max-w-[800px] mx-auto'>
            {initiateEsewa && <EsewaIntegration amount={pet.price}/>}
            <h1 className="text-2xl font-bold text-gray-800 text-center ">
                Get your service now!!!
            </h1>
            {/* Display the selected pet details */}
            {pet && Object.keys(pet).length > 0 ? (
            <div className="flex gap-6 mt-8">
                {/* Image Section - Left Side */}
                {pet.Image && (
                <div className="w-1/2">
                    <img
                    src={`http://localhost:3000/${pet.Image}`}
                    alt={pet.Category}
                    className="w-full h-64 object-cover rounded-lg"
                    />
                </div>
                )}

                    <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">Selected Service Details:</h3>
                        <div className="flex items-center gap-2">
                        <p className="text-lg font-bold">Price:</p>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            Rs {pet.price}
                        </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <p className="mb-2">
                            <strong>Selected Package:</strong><br />
                            {pet.serviceoffering}
                        </p>
                        <p>
                            <strong>Organization Location:</strong><br />
                            {pet.vendorlocation}
                        </p>
                        </div>
                        
                        <div>
                        <p>
                            <strong>Services Included:</strong><br />
                            {pet.includedOfferings}
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                ) : (
                <p className="text-center text-gray-500">No pet selected.</p>
                )}
  
            {/* Reservation Form */}
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-6 w-full'>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-2">
                        <div className="flex-1 w-36">
                            <label className="block text-gray-700 text-sm font-bold w-96">
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
                        <div className="flex-1 w-36">
                        <label className="bold-text-gray-700 text-sm font-bold">Select Shift</label>
                        <select className="border p-1 rounded"
                            onChange={(e)=>setSelectedTiming(e.target.value)}
                        >
                            {pet.timing === "Morning" && <option>Morning</option>}
                            {pet.timing === "Evening" && <option>Evening</option>}
                            {pet.timing === "Both" && (
                            <>
                                <option>Morning</option>
                                <option>Evening</option>
                            </>
                            )}
                        </select>
                    </div> 
                    </div>
                <div className="p-4 bg-gray-50 rounded-lg">
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
            </form>
        </div>
    );
  };

export default trainingReservation
