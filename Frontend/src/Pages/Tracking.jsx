import React, { useEffect, useState } from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/foot";
import Swal from 'sweetalert2';
import AdoptionTracking from "../Tracking/trackingAdoption.jsx"
import TrainingTracking from "../Tracking/trackingTraining.jsx"
import GroomingTracking from "../Tracking/trackingGrooming.jsx"
import HostelTracking   from "../Tracking/trackingHostel.jsx"

const Tracking = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [ownerpet, setOwnerpet] = useState([]);
  // State for dropdown visibility
  const [showAdoptions, setShowAdoptions] = useState(false);
  const [showFoundPets, setShowFoundPets] = useState(false);
  const [showLostPets, setShowLostPets] = useState(false);
  // Fetch found pets
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    if (userData && userData.user.email) {
      setUserEmail(userData.user.email);
    }

    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3000/petfound');
        if (!response.ok) throw new Error('Failed to fetch pets');
  
        const result = await response.json();
        const petData = Array.isArray(result.data) ? result.data : [];
  
        setPets(petData);
      } catch (err) {
        console.error('Error fetching pets:', err);
        setPets([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Handle approve found pet
  const handleApprove = async (petId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure the pet owner was genuine?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update status!",
      cancelButtonText: "No, cancel"
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/petfound/${petId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Reunited' }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Approval failed');

      setPets(prevPets => prevPets.map(pet => 
        pet._id === petId ? { ...pet, status: 'Reunited' } : pet
      ));

      Swal.fire({
        title: "Updated!",
        text: "The pet status has been updated to 'Reunited'.",
        icon: "success"
      });
    } catch (err) {
      console.error('Approval error:', err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error"
      });
    }
  };

  // Handle delete found pet
  const handleDelete = async (petId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete the found pet?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No, cancel"
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/petfound/${petId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Deletion failed');

      setPets(prevPets => prevPets.filter(pet => pet._id !== petId));
    } catch (err) {
      console.error('Deletion error:', err);
    }
  };

  // Fetch owner pets
  useEffect(() => {
    const fetchOwnerPets = async () => {
      try {
        const response = await fetch("http://localhost:3000/petreunite");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        
        const petData = Array.isArray(result.data) ? result.data : [];
        const filteredPets = petData.filter(pet => pet.email === userEmail);
  
        setOwnerpet(filteredPets);
      } catch (err) {
        setError(err.message);
        setOwnerpet([]);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchOwnerPets();
    } else {
      setLoading(false);
      setOwnerpet([]);
    }
  }, [userEmail]);

  // Filter pets by matching email
  const filteredPets = pets.filter(pet => pet.email === userEmail);

  return (
    <div className="flex flex-col min-h-screen bg-orange-100">
      <header>
        <Navbar />
      </header>
      <main className="flex-1 overflow-y-auto p-6 bg-orange-100">
        {/* Service Tracking Dropdown */}
        <div className="mb-6">
          <button 
            onClick={() => setShowAdoptions(!showAdoptions)}
            className="w-64 p-4 bg-orange-200 rounded-lg hover:bg-orange-300 transition-colors flex justify-between items-center"
          >
            <h1 className="font-medium text-l">Service Tracking</h1>
            <span className="text-xl">{showAdoptions ? '▲' : '▼'}</span>
          </button>
          
          {showAdoptions && (
            <div className="mt-4 flex flex-wrap gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
              <AdoptionTracking userEmail={userEmail} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
              <TrainingTracking userEmail={userEmail} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
              <GroomingTracking userEmail={userEmail} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
              <HostelTracking   userEmail={userEmail} />
              </div>
            </div>
          )}
        </div>

        {/* Found Pet Tracking Dropdown */}
        <div className="mb-6">
          <button 
            onClick={() => setShowFoundPets(!showFoundPets)}
            className="w-80 p-4 bg-orange-200 rounded-lg hover:bg-orange-300 transition-colors flex justify-between items-center"
          >
            <h1 className="font-medium text-l">Found Pet Tracking</h1>
            <span className="text-xl">{showFoundPets ? '▲' : '▼'}</span>
          </button>

          {showFoundPets && (
            <div className="mt-4 bg-orange-100 rounded-lg shadow-md">
              {loading && <p>Loading pets...</p>}
              {error && <p className="text-red-500">Error: {error}</p>}

              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPets.map(pet => (
                    <div key={pet._id} className="border p-8 rounded-lg bg-orange-100 shadow-md">
                      <img
                        src={`http://localhost:3000/${pet.Image}`}
                        alt={pet.petname}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <h3 className="text-xl font-semibold mb-2">{pet.petname}</h3>
                      <p className="text-gray-600 mt-2">Age: {pet.Age}</p>
                      <p className="text-gray-600 mt-2">Status: {pet.status}</p>
                      <p className="text-gray-600 mt-2">Found Location: {pet.Location}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(pet._id)}
                          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDelete(pet._id)}
                          className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredPets.length === 0 && !loading && <p className=' mt-6 mb-6 ml-6'>No pets found matching your account.</p>}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lost Pet Ownership Dropdown */}
        <div className="mb-6">
          <button 
            onClick={() => setShowLostPets(!showLostPets)}
            className="w-96 p-4 bg-orange-200 rounded-lg hover:bg-orange-300 transition-colors flex justify-between items-center"
          >
            <h1 className="font-medium text-l">Your Lost Pet Found</h1>
            <span className="text-xl">{showLostPets ? '▲' : '▼'}</span>
          </button>

          {showLostPets && (
            <div className="mt-4 bg-orange p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ownerpet.length > 0 ? (
                  ownerpet.map(pet => (
                    <div key={pet._id} className="border p-8 rounded-lg bg-orange shadow-md">
                      <img
                        src={`http://localhost:3000/${pet.petImage}`}
                        alt={pet.petname}
                        className="w-full h-64 object-cover"
                      />
                      <h3 className="text-xl font-semibold mb-2">
                        Pet found by: {pet.finderUsername}
                      </h3>
                      <p className="text-gray-600 mt-2">Finder contact: {pet.finderContact}</p>
                      <p className="text-gray-600 mt-2">Found Location: {pet.petLocationFound}</p>
                      <p className="text-gray-600 mt-2">Reunite date: {pet.date}</p>
                      <p className="text-gray-600 mt-2">Owner {pet.fullname}</p>
                    </div>
                  ))
                ) : (
                  <p>No pets were found for your ownership</p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Tracking;