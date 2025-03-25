import React, { useState, useEffect, useRef  } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const FoundPetConfirmation = ({ pet, onClick }) => {

    //setting the the state variable to store the data in the database

    const [date, setDate]=useState("")
    const [location,setLocation]=useState("")

    const handleSubmit =async (e)=>{
        e.preventDefault();

        //at first getting the pet reporter data

        //gettting the email from the localstorage
        const userData = JSON.parse(localStorage.getItem("user_data"))
        if(!userData?.user?.email){
            Swal.fire({
                icon: 'error',
                title: "Authentication error",
                text: "email not found"
            })
            return ;
        }
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

        const formData = new FormData();
        formData.append("date", date);
        formData.append("location", location);
        formData.append("fullname",userData.user.username)
        formData.append("ownercontact", userData.user.number);
        formData.append("email", userData.user.email);
         // Adding pet details
        formData.append("petCategory", pet.Category || "");
        formData.append("petColor", pet.Color || "");
        formData.append("petAge", pet.Age || "");
        formData.append("petLocationFound", pet.Location || "");
        formData.append("finderUsername", pet.username || "");
        formData.append("finderEmail", pet.email || "");
        formData.append("finderContact", pet.findercontact || "");

        if (pet.Image) {
            formData.append("petImage", pet.Image); 
        }

        console.log(formData)


        try {
            const response = await axios.post("http://localhost:3000/petreunite", formData,{
                headers: {
'Content-Type': 'application/json',   
                 'Accept': 'application/json'
                    }
            })

            if(response.status===200){
                Swal.fire({
                    icon: 'success',
                    title: "Pet reunite request",
                    text: "Your request has been submitted successfully"
                    })
            }
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "Error",
                text: "Error in sending data"
            })
        }
    }

    return (
        <div className='w-full mx-auto'>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6 ">
                Reunite with your pet
            </h1>
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
  {pet && Object.keys(pet).length > 0 ? (
    <>
      {/* Image Section */}
      {pet.Image && (
        <img
          src={`http://localhost:3000/${pet.Image}`}
          alt={pet.Category}
          className="w-40 h-40 object-cover rounded-lg mr-6"
        />
      )}

      {/* Pet Details */}
      <div className="flex flex-col justify-between w-full">
      <div>
                  <h3 className="font-semibold text-md">Posted by:</h3>
                  <ul className="mt-2 space-y-2">
                    <li><span className="font-medium">Username:</span> {pet.username}</li>
                    <li><span className="font-medium">Email:</span> {pet.email}</li>
                    {/* //<li><span className="font-medium">Contact Number:</span> {pet.findercontact}</li> */}
                  </ul>
                </div>
        <h2 className="text-xl font-bold text-gray-800 mt-2">{pet.Category}</h2>
        <p className="text-gray-600 "><strong>Color:</strong> {pet.Color}</p>
        <p className="text-gray-600"><strong>Age:</strong> {pet.Age}</p>
        <p className="text-gray-600"><strong>Location Found:</strong> {pet.Location}</p>
      </div>
    </>
  ) : (
    <p className="text-center text-gray-500">No pet selected</p>
  )}
</div>

             <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-6 min-h-[40vh] w-full flex items-center justify-center'>
                <div className="flex flex-col gap-6">
                    <div className="flex-flex">
                        <div>
                        <label className="block text-gray-700 text-md font-bold mb-2">
                            Enter location where you want to meet
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            required
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e)=>setLocation(e.target.value)}
                        />
                    </div>

                        {/* Calendar Field */}
                        <div className="flex-1 mt-4 ">
                            <label className="block text-gray-700 text-md font-bold mb-2">
                                Book a date
                            </label>
                            <input
                                type="date"
                                name="date"
                                className="w-full px-3 py-2 border rounded-md"
                                required
                                onChange={(e)=>setDate(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex mt-6">
                        <button
                            type="submit"
                            className=" bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FoundPetConfirmation;