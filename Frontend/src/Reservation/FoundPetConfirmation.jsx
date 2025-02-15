import React, { useState,  } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

const FoundPetConfirmation = () => {

    const Navigate = useNavigate()
    const [date, setDate] = useState(null);
    const formattedDate = date ? date.toDateString() : "";

    const cancelButton=()=>{
        Navigate("/lostfound/lost")
    } 

    return (
        <div className='w-full max-w-[800px] mx-auto'>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Reunite with your pet
            </h1>
            
            <form className='bg-white shadow-md rounded-lg p-6 min-h-[40vh] w-full'>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-4">
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
                            />
                        </div>

                        {/* Calendar Field */}
                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Book a date
                            </label>
                            <input
                                type="text"
                                value={formattedDate}
                                readOnly
                                placeholder="Select a date"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <Calendar className="mt-4" onChange={setDate} value={date} />
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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