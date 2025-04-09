import { useState, useEffect } from "react";
import React from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/foot";
import Tick from "../Images/Tick.png";
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const SuccessTraining = () => {
    const [selectedPet, setSelectedPet] = useState(null);
    const [pettiming , setPetTiming] = useState("")
    const [date, setDate] = useState("");
    const navigate = useNavigate();
    const [search] = useSearchParams();
    const info = search.get('data');
    let decodeinfo = atob(info);
    let newInfo = JSON.parse(decodeinfo);

    useEffect(() => {
        const petDetails = JSON.parse(localStorage.getItem('selectedPet(training)'));
        setSelectedPet(petDetails);
        const petDate = (localStorage.getItem('trainingdate'));
        setDate(petDate);
        const petTiming = (localStorage.getItem('selectedtiming'))
        setPetTiming(petTiming)
    }, []);

    const handleOk = async () => {
        const petDetails = JSON.parse(localStorage.getItem('selectedPet(training)'));
        const userData = JSON.parse(localStorage.getItem('user_data'));
        const petDate = (localStorage.getItem('trainingdate'));
        const petTiming = (localStorage.getItem('selectedtiming'))

        console.log("heram hau", petDetails, userData, petDate, petTiming);

        if (!petDetails || !userData) {
            Swal.fire({
                title: 'Error!',
                text: 'Missing booking or user data',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        const submissionData = {
            image: petDetails.Image,
            date: petDate,
            organizationname: petDetails.organizationname,
            selectedpackage: petDetails.serviceoffering,
            includedservice: petDetails.includedOfferings.join(', '),
            price: petDetails.price,
            Restriction: petDetails.Restriction,
            Duration: petDetails.Duration,
            SelectedTiming: petTiming,
            location: petDetails.vendorlocation,
            fullname: userData.user.username,
            email: userData.user.email,
            ownercontact: userData.user.number,
            vendorcontact: petDetails.vendorcontact,
            vendoremail: petDetails.vendoremail,
            days: petDetails.days,
            paymentStatus: 'Online Paid'
        };

        try {
            const response = await axios.post("http://localhost:3000/booktrain", submissionData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                const result = await Swal.fire({
                    title: 'Success!',
                    text: 'Training booking successfully completed',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });

                if (result.isConfirmed) {
                    localStorage.removeItem('selectedPetHostel');
                    localStorage.removeItem('trainingdate');
                    navigate("/");
                }
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
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-1 bg-white">
                <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-8">
                    <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl shadow-lg p-8 w-full max-w-md mx-4">
                        <form>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 text-center">
                                    Payment Success
                                </h1>
                                <img src={Tick} alt="Success" className='w-64 h-64 mx-auto'/>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        <h1 className='text-lg text-center'>Payment Status: {newInfo.status}</h1>
                                        <h1 className='mt-4 text-lg text-center'>Payment Amount: {newInfo.total_amount}</h1>
                                    </label>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={handleOk} 
                                    className='block mx-auto px-10 py-2 bg-orange-200 hover:bg-orange-300'
                                >
                                    Done
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SuccessTraining;