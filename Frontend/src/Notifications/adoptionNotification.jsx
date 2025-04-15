import React, { useEffect, useState } from "react";
import Aside from "../Components/aside";
import Swal from "sweetalert2";

const AdoptionNotification = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [petListings, setPetListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch adoption data
        const adoptionResponse = await fetch("http://localhost:3000/adoption");
        if (!adoptionResponse.ok) throw new Error("Failed to fetch adoption data");
        const adoptionData = await adoptionResponse.json();

        // Fetch pet listing data
        const petListingResponse = await fetch("http://localhost:3000/petlisting/status");
        if (!petListingResponse.ok) throw new Error("Failed to fetch pet listing data");
        const petListingData = await petListingResponse.json();

        setAdoptions(adoptionData.data || []);
        setPetListings(petListingData.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (!userData) {
  //   return <div className="text-center text-red-500">Please log in to view adoption requests.</div>;
  // }

  const filteredAdoptions = adoptions.filter(
    (adoption) => adoption.vendoremail === userData.user.email
  );

  const handleApprove = async (adoptionPetId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this pet adoption?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
      cancelButtonText: "No, cancel",
    });

    if (!result.isConfirmed) return;

    try {
      // Send adoptionPetId to backend to update petlisting status
      const response = await fetch(`http://localhost:3000/petlisting/status/${adoptionPetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Confirmed" }),
      });

      if (!response.ok) throw new Error("Failed to update pet status");

      // Update local state
      setPetListings((prevPets) =>
        prevPets.map((pet) =>
          pet._id === adoptionPetId ? { ...pet, status: "Confirmed" } : pet
        )
      );

      Swal.fire({
        title: "Updated!",
        text: "The pet status has been updated to 'Confirmed'.",
        icon: "success",
      });
    } catch (err) {
      console.error("Approval error:", err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  if (loading) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-50 flex">
      <aside>
        <Aside />
      </aside>
      <main className="ml-64">
        <div className="w-full md:w-[1200px] mx-auto bg-white rounded-lg shadow-lg min-h-screen">
          <h2 className="text-2xl font-semibold text-gray-800 pt-10 pl-4">
            Your Adoption Notifications
          </h2>
          <div className="flex flex-wrap">
            {filteredAdoptions.map((adoption) => {
              const petFromListing = petListings.find(
                (pet) => pet._id === adoption.petId
              );

              return (
                <div key={adoption._id} className="bg-white shadow-md rounded-lg p-4 w-80 mt-4 ml-4">
                  <img
                    src={`http://localhost:3000/${adoption.image}`}
                    alt={adoption.petname}
                    className="w-64 h-48 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-3">{adoption.petname}</h3>
                  <p className="text-gray-600 mt-2">Booked by: {adoption.fullname}</p>
                  <p className="text-gray-600 mt-2">Email: {adoption.email}</p>
                  <p className="text-gray-600 mt-2">Contact: {adoption.ownercontact}</p>

                  <p className="text-gray-600 mt-2">
                    Status: {petFromListing ? petFromListing.status : "Loading..."}
                  </p>

                  {petFromListing?.status === "Available" && (
                    <button
                      onClick={() => handleApprove(adoption.petId)}
                      className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdoptionNotification;
