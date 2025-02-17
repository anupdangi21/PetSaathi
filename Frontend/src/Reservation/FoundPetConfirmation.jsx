import React, { useState, useEffect, useRef  } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const FoundPetConfirmation = () => {

    // const Navigate = useNavigate()
    // const [date, setDate] = useState(null);

    //setting the the state variable to store the data in the database

    const [fullname, setFullname]= useState("")
    const [date, setDate]=useState("")
    const [location,setLocation]=useState("")
    const [ownercontact, setContactnumber]=useState("")

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

        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("date", date);
        formData.append("location", location);
        formData.append("ownercontact", ownercontact);
        formData.append("email", userData.user.email);


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
        <div className='w-full max-w-[800px] mx-auto'>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Reunite with your pet
            </h1>
            
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-6 min-h-[40vh] w-full'>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-2">
                        {/* Full Name Field */}
                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Enter your full name
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Full Name"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e)=>setFullname(e.target.value)}
                            />
                        </div>

                        {/* Calendar Field */}
                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
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

                    {/* Location Field */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Enter location where you want to meet
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            required
                            className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e)=>setLocation(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Enter your contact number
                        </label>
                        <input
                            type="text"
                            name="contact"
                            placeholder="contact number"
                            required
                            className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e)=>setContactnumber(e.target.value)}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-row-reverse mt-6">
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