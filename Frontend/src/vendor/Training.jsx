import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Aside from "../Components/aside"
import { 
    BadgePlus,
    TrendingUp,
} from 'lucide-react';
import Swal from 'sweetalert2';


const TrainingAdmin = () => {
         const navigate = useNavigate()
         
        const [isSidebarOpen, setIsSidebarOpen] = useState(true);
        const [pets, setPets] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        const handleEditPet = (pet, event) => {
          event.preventDefault();
          navigate("/dashboard/addtraining", { 
            state: { 
              petData: pet,
              isEdit: true 
            } 
          });
        };

        // delete function
        const handleDeletePet = async (_id) => {
              Swal.fire({
                  title: "Are you sure?",
                  text: "This action cannot be undone!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Yes, delete it!"
              }).then(async (result) => {
                  if (result.isConfirmed) {
                      try {
                          const response = await fetch(`http://localhost:3000/training/${_id}`, {
                              method: "DELETE",
                              headers: {
                                  "Content-Type": "application/json"
                              }
                          });
          
                          if (!response.ok) {
                              throw new Error(`HTTP error! Status: ${response.status}`);
                          }
          
                          const result = await response.json();
          
                          Swal.fire("Deleted!", result.message || "Pet has been deleted.", "success");
          
                          setPets((prevPets) => prevPets.filter((pet) => pet._id !== _id));
          
                      } catch (err) {
                          console.error("Error deleting pet:", err);
        
                          Swal.fire("Error", "Failed to delete pet. Please try again.", "error");
                      }
                  }
              });
          };
        //   api opetaion

        useEffect(() => {
              const fetchPets = async () => {
                try {
                  const userDataString = localStorage.getItem('user_data');
                  if (!userDataString) {
                    setError('User not logged in');
                    return;
                  }
            
                  const userData = JSON.parse(userDataString);
                  if (!userData?.user?.email) {
                    setError('Email not found in user data');
                    return;
                  }
            
                  const response = await fetch('http://localhost:3000/training', {
                    headers: {
                      'Authorization': `Bearer ${userData.userToken}`
                    }
                  });
            
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
            
                  const result = await response.json();
                  console.log('API Response:', result);
            
                  const petsArray = Array.isArray(result) ? result : 
                                    result.pets ? result.pets : 
                                    result.data ? result.data : 
                                    [];
            
                  if (!Array.isArray(petsArray)) {
                    setError('Invalid data format from API');
                    return;
                  }
            
                  const userPets = petsArray.filter(pet => 
                    pet.vendoremail === userData.user.email
                  );
                  const reversedPets = [...userPets].reverse();
                  setPets(reversedPets);
                  setLoading(false);
            
                } catch (err) {
                  console.error('Fetch error:', err);
                  setError(err.message || 'Failed to fetch pets');
                  setLoading(false);
                }
              };
            
              fetchPets();
            }, []);

            const handleAddPet=()=>{
              navigate("/dashboard/addtraining")
            }
  return (
    <div className="min-h-screen bg-gray-50 flex">
            <aside>
                <Aside />
            </aside>
            <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center">
                                      <h2 className="text-2xl font-semibold text-gray-800">Welcome to Pet Training Dashboard</h2>
                    
                                      <div className="flex items-center gap-4">
                                        <h3 className="text-2xl font-semibold text-gray-800">Upload your service</h3>
                                        <button
                                          onClick={handleAddPet}
                                          className="bg-zinc-50 text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 flex items-center"
                                        >
                                          <BadgePlus />
                                        </button>
                                      </div>
                                    </div>
                    <p className="mt-6 text-gray-600 ">Click on the + button to start listing your pet training service.</p>
                </div>

                {/* recent uploads section */}

                <div className="flex flex-col lg:flex-row gap-6">
                      {/* Recent Uploads Section */}
                      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-lg font-semibold text-gray-800">Recent Uploads</h2>
                          <TrendingUp className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                          {loading ? (
                            <p>Loading...</p>
                          ) : error ? (
                            <p className="text-red-500">{error}</p>
                          ) : pets.length === 0 ? (
                            <p>No recent uploads found</p>
                          ) : (
                            pets.map((pet, index) => (
                              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center justify-between">
                                  <img
                                    src={`http://localhost:3000/${pet.Image}`}
                                    alt={pet.petname}
                                    className="w-24 h-24 object-cover rounded-lg"
                                  />
                                    <p className="font-medium text-gray-800 ml-8">Service Offering: {pet.serviceoffering}</p>
                                    <p className="text-medium text-gray-800 ml-8">Offerings: {pet.includedOfferings}</p>
                                    <p className="text-medium text-gray-800 ml-8">Price: {pet.price}</p>
                                    <p className="text-medium text-gray-800 ml-8">Timing: {pet.timing}</p>                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                                    onClick={(e) => handleEditPet(pet, e)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-300"
                                    onClick={() => handleDeletePet(pet._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                
                    </div>
            </main>
    </div>
  )
}

export default TrainingAdmin









