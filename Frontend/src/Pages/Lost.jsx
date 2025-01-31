import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { ClipLoader } from 'react-spinners';
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/foot.jsx";

const Lost = () => {
  const [formData, setFormData] = useState({
    category: "",
    color: '',
    age: '',
    location: ''
  });

  const [allFoundPets, setAllFoundPets] = useState([]); // State to store all found pets
  const [isLoading, setIsLoading] = useState(false);
  const [petsLoading, setPetsLoading] = useState(true); // Loading state for fetching pets

  // Fetch all found pets from the /petfound endpoint
  useEffect(() => {
    const fetchAllFoundPets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/petfound');
        console.log("Raw API Response:", response.data); // Log the response data
  
        // Extract the pets array from response.data.data
        const petsArray = response.data.data || [];
        console.log("Processed Pets Array:", petsArray);
  
        setAllFoundPets(petsArray);
      } catch (error) {
        console.error('Error fetching found pets:', error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch found pets. Please try again later.",
          icon: "error"
        });
      } finally {
        setPetsLoading(false);
      }
    };
  
    fetchAllFoundPets();
  }, []);;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.color) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in color and category fields before submitting.",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Post lost pet data
      const postResponse = await axios.post('http://localhost:3000/lostpet', {
        Category: formData.category,
        Color: formData.color,
        Age: formData.age,
        Location: formData.location
      });

      if (postResponse.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Pet reported successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });

        // Reset form after submission
        setFormData({
          category: "",
          color: '',
          age: '',
          location: ''
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || error.message,
        icon: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container min-h-screen'>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 py-8'>
        <form onSubmit={handleSubmit} className='mb-12'>
          <div className="bg-gradient-to-r from-orange-200 to-orange-50 rounded-2xl p-8 text-gray-800">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block mb-2 font-medium">Pet Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  placeholder="Enter pet color"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500"
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block mb-2 font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500"
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block mb-2 font-medium">Age</label>
                <select
                  name="age"
                  value={formData.age}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500"
                  onChange={handleChange}
                >
                  <option value="">Select Age</option>
                  <option value="3month">1-3 Months</option>
                  <option value="6-9Months">6-9 Months</option>
                  <option value="1year">1 Year</option>
                  <option value="1-2years">1-2 Years</option>
                  <option value="above2years">2+ Years</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block mb-2 font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  placeholder="Enter location"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-orange-500 text-white px-8 py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-orange-300 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <ClipLoader size={20} color="#ffffff" />
                    Processing...
                  </>
                ) : (
                  "Report & Search"
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Display all found pets */}
        {petsLoading ? (
          <div className="text-center py-8">
            <ClipLoader size={40} color="#F97316" />
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">All Found Pets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(allFoundPets) && allFoundPets.length > 0 ? (
                allFoundPets.map((pet, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-orange-100">
                    {pet.Image && (
                      <img 
                        src={`http://localhost:3000/${pet.Image}`} 
                        alt={pet.Category} 
                        className="w-full h-48 object-cover mb-4 rounded-lg"
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-2 capitalize">{pet.Category || pet.category}</h3>
                    <div className="space-y-1">
                      <p><span className="font-medium">Color:</span> {pet.Color || pet.color}</p>
                      <p><span className="font-medium">Age:</span> {pet.Age || pet.age}</p>
                      <p><span className="font-medium">Location:</span> {pet.Location || pet.location}</p>
                      <p><span className="font-medium">Status:</span> {pet.status || 'Found'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No found pets available.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Lost;