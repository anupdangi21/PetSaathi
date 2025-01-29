import { useNavigate } from "react-router-dom"
import Aside from "../Components/aside"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    BadgePlus,
    Star,
    TrendingUp,
    DogIcon,
    CatIcon,
} from 'lucide-react';

const Adoption = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleEditPet = (pet, event) => {
      event.preventDefault();  // Prevents the default action of the button
      navigate("/dashboard/addpet", { 
        state: { 
          petData: pet,
          isEdit: true 
        } 
      });
    };
    

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
    
          const response = await fetch('http://localhost:3000/petlisting', {
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
            pet.email === userData.user.email
          );
    
          setPets(userPets);
          setLoading(false);
    
        } catch (err) {
          console.error('Fetch error:', err);
          setError(err.message || 'Failed to fetch pets');
          setLoading(false);
        }
      };
    
      fetchPets();
    }, []);

    const handleAddPet = () => {
        navigate("/dashboard/addpet");
    }

    return (  
        <div className="min-h-screen bg-gray-50 flex">
            <aside>
                <Aside />
            </aside>

            <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 ">Welcome to Adoption Dashboard</h2>
                    <h3 className=" grid ml text-2xl font-semibold text-gray-800 place-items-end mr-12">Upload a pet
                    <button
                    onClick={handleAddPet}
                    className=" grid bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 place-items-end m-8">
                        <BadgePlus /> 
                    </button>
                    </h3>
                    <p className="mt-2 text-gray-600 ">Click on the + button to start listing your pets.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Uploads */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">Recent uploads</h2>
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
                                    <div>
                                      <p className="font-medium text-gray-800">{pet.petname}</p>
                                      <p className="text-sm text-gray-500">Age: {pet.Age}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                      <button className="text-blue-500 hover:text-blue-700"
                                      onClick={(e) => handleEditPet(pet, e)}>
                                          Edit
                                      </button>
                                      <button className="text-red-500 hover:text-red-700">
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
    );
}

export default Adoption;
