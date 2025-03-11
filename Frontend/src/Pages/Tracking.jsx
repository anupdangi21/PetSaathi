import React, { useEffect, useState } from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/foot";
import Swal from 'sweetalert2';
const Tracking = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [adoptionsLoading, setAdoptionsLoading] = useState(true);
  const [adoptionsError, setAdoptionsError] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [ownerpet, setOwnerpet] = useState([]);

  // useeffcet for displaying the adoption request taken by the user
  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        setAdoptionsLoading(true);
        const response = await fetch('http://localhost:3000/adoption/');
        if (!response.ok) throw new Error('Failed to fetch adoptions');
        
        const result = await response.json();
        const data = Array.isArray(result.data) ? result.data : [];
        const filteredAdoptions = data.filter(adoption => 
          adoption.email === userEmail
        );
        
        setAdoptions(filteredAdoptions);
        setAdoptionsError(null);
      } catch (err) {
        setAdoptionsError(err.message);
        setAdoptions([]);
      } finally {
        setAdoptionsLoading(false);
      }
    };

    if (userEmail) fetchAdoptions();
  }, [userEmail]);

  // Add these handler functions
  const handleConfirm = async (adoptionId) => {
    const result = await Swal.fire({
      title: "Confirm Adoption",
      text: "Are you sure you want to confirm this adoption?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm"
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/adoption/${adoptionId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Confirmed' })
        });

        if (!response.ok) throw new Error('Confirmation failed');

        setAdoptions(prev => prev.map(adoption => 
          adoption._id === adoptionId ? { ...adoption, status: 'Confirmed' } : adoption
        ));

        Swal.fire("Confirmed!", "Adoption has been confirmed.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };


  const handleCancel = async (adoptionId) => {
    const result = await Swal.fire({
      title: "Cancel Adoption",
      text: "Are you sure you want to cancel and delete this adoption?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete"
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/adoption/${adoptionId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!response.ok) throw new Error('Deletion failed');
  
        // Remove the deleted adoption from the local state
        setAdoptions(prev => prev.filter(adoption => adoption._id !== adoptionId));
  
        Swal.fire("Deleted!", "Adoption has been cancelled and deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  // for handling the petfound history 
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

if (!result.isConfirmed) {
    return; 
}

    try {
        const response = await fetch(`http://localhost:3000/petfound/${petId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Reunited' }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Approval failed');

        setPets((prevPets) =>
            prevPets.map((pet) =>
                pet._id === petId ? { ...pet, status: 'Reunited' } : pet
            )
        );

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


  const handleDelete = async (petId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete the found pet",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No, cancel"
  });

  if (!result.isConfirmed) {
      return; 
  }
    try {
      const response = await fetch(`http://localhost:3000/petfound/${petId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Deletion failed');

      // Remove pet from state
      setPets((prevPets) => prevPets.filter((pet) => pet._id !== petId));
    } catch (err) {
      console.error('Deletion error:', err);
    }
  };

  //fetchung the pet ownership data from the db
  useEffect(() => {
    const fetchOwnerPets = async () => {
      try {
        const response = await fetch("http://localhost:3000/petreunite");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        
        // Extract pet data from response
        const petData = Array.isArray(result.data) ? result.data : [];
  
        // Filter pets where ownerEmail matches logged-in user's email
        const filteredPets = petData.filter(pet => 
          pet.email === userEmail
        );
  
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
  const filteredPets = pets.filter((pet) => pet.email === userEmail);

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
      <div className="min-h-screen w-full bg-gradient-to-b from-orange-200 to-orange-100">
          <div className="container ml-24 max-w-screen-xl p-6">
            <h1 className="font-medium text-2xl mb-6">Service Tracking</h1>
            
            {adoptionsLoading ? (
              <p>Loading adoption records...</p>
            ) : adoptionsError ? (
              <p className="text-red-500">{adoptionsError}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adoptions.map(adoption => (
                  <div key={adoption._id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">Adoption Request</h3>
                      <img
                      src={`http://localhost:3000/${adoption.image}`}
                      alt={adoption.petname}
                      className="w-full h-64 object-cover rounded-lg mt-4"
                    />
                    <p className="mt-2 font-medium">Booked by you </p>
                      <p className="mt-2">Vendor Contact: {adoption.vendorcontact}</p>
                      <p className="mt-1">Vendor Email: {adoption.vendoremail}</p>
                      <p className="mt-1">Status: 
                        <span className={`ml-2 px-2 py-1 rounded ${adoption.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-green-100 text-green-800'}`}>
                          {adoption.status}
                        </span>
                      </p>
                    </div>
                    
                    {adoption.status === 'Available' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleConfirm(adoption._id)}
                          className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleCancel(adoption._id)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {adoptions.length === 0 && !adoptionsLoading && (
                  <p>No adoption records found for your account.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* for tracking the found pet post data */}
        <div className="min-h-90 w-full bg-orange-100">
          <div className="container ml-24 max-w-screen-xl bg-orange-100">
            <h1 className="font-medium text-2xl">Found Pet Tracking</h1>

            {loading && <p>Loading pets...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-40 mt-4">
                {filteredPets.map((pet) => (
                  <div key={pet._id} className="border p-8 rounded-lg bg-white shadow-md">
                    <img
                      src={`http://localhost:3000/${pet.Image}`}
                      alt={pet.petname}
                      className="w-full h-64 object-cover"
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
                {filteredPets.length === 0 && !loading && <p>No pets found matching your account.</p>}
              </div>
            )}
          </div>
          <div>

            {/* for tracking the lost pet owner ship */}
          <div className="min-h-screen w-full bg-orange-50 mt-4 bg-gradient-to-b from-orange-100 to-orange-50">
          <div className="container ml-24 max-w-screen-xl">
            <h1 className="font-medium text-2xl mt-4">Your lost pet found</h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-40 mt-4">
      {ownerpet.length > 0 ? (
        ownerpet.map((pet) => (
          <div key={pet._id} className="border p-8 rounded-lg bg-white shadow-md">
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
          </div>
        </div>
        </div>

      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Tracking;
