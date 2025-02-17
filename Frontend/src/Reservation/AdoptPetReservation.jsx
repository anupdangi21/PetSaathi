import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AdoptPetReservation = () => {
    const [hasFirstPet, setHasFirstPet] = useState('');
    const [hasEnoughSpace, setHasEnoughSpace] = useState('');

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

        // Proceed with form submission
        const formData = new FormData(e.target);
        const submissionData = {
            fullname: formData.get('fullname'),
            date: formData.get('date'),
            firstPet: hasFirstPet,
            spaceAvailable: hasEnoughSpace,
            location: formData.get('location')
        };

        console.log('Submission data:', submissionData);
        Swal.fire('Success!', 'Your application has been submitted!', 'success');
    };

    return (
        <div className='w-full max-w-[800px] mx-auto'>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Get your pet now!!!
            </h1>
            
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-6 min-h-[40vh] w-full'>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-4">
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

                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Book a date
                            </label>
                            <input
                                type="date"
                                name="date"
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* First Pet Question */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Is this your first pet?
                        </label>
                        <select 
                            value={hasFirstPet}
                            onChange={(e) => setHasFirstPet(e.target.value)}
                            className='w-16 h-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 border border-gray-300'
                            required
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    {hasFirstPet === 'Yes' && (
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Do you have enough space for the pet?
                            </label>
                            <select
                                value={hasEnoughSpace}
                                onChange={(e) => setHasEnoughSpace(e.target.value)}
                                className='w-16 h-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 border border-gray-300'
                                required
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    )}

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
                        />
                    </div>

                    {/* Buttons */}
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

export default AdoptPetReservation;