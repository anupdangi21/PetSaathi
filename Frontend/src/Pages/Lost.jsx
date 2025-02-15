import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { ClipLoader } from 'react-spinners';
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/foot.jsx";
import { Info } from 'lucide-react';
import useAuthGuard from "../Context/useAuthGuard.jsx"
import FoundPetConfirmation from "../Reservation/FoundPetConfirmation.jsx"

const Lost = () => {
  const [allFoundPets, setAllFoundPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [petsLoading, setPetsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [visible, setVisible] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => setShowConfirmation(true);
  const closeModal = () => setShowConfirmation(false);

  useEffect(() => {
    if (showConfirmation) {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          closeModal();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showConfirmation]);

  const withAuth = useAuthGuard();

  const handleProtectedAction = () => {

      console.log("User is authenticated.");
  };

  const [formData, setFormData] = useState({
    category: "",
    color: '',
    age: '',
    location: ''
  });



  useEffect(() => {
    const fetchAllFoundPets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/petfound');
        setAllFoundPets(response.data.data || []);
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
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmPet = () => {
    withAuth(handleProtectedAction)();
    setShowConfirmation(true); 
  };
  

  const handleFilter = () => {
    const { category, color } = formData;
    
    if (!category && !color) {
      setFilteredPets(null);
      return;
    }

    const filtered = allFoundPets.filter(pet => {
      const categoryMatch = category ? 
        pet.Category.toLowerCase() === category.toLowerCase() : true;
      const colorMatch = color ? 
        pet.Color.toLowerCase().includes(color.toLowerCase()) : true;
      return categoryMatch && colorMatch;
    });

    setFilteredPets(filtered);
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

        setFormData({
          category: "",
          color: '',
          age: '',
          location: ''
        });
        setFilteredPets(null);
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

  const petsToDisplay = filteredPets !== null ? filteredPets : allFoundPets;

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

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleFilter}
                  className="bg-gray-200 text-gray-800 px-8 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Filter
                </button>

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
                    "Report"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Display found pets */}
        {petsLoading ? (
          <div className="text-center py-8">
            <ClipLoader size={40} color="#F97316" />
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {filteredPets !== null ? "Filtered Pets" : "All Found Pets"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {petsToDisplay.length > 0 ? (
                petsToDisplay.map((pet, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-orange-100">
                    {pet.Image && (
                      <img 
                        src={`http://localhost:3000/${pet.Image}`} 
                        alt={pet.Category} 
                        className="w-full h-48 object-cover mb-4 rounded-lg"
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-2 capitalize">Category: {pet.Category}</h3>
                    <div className="space-y-1">
                      <p><span className="font-medium">Color:</span> {pet.Color}</p>
                      <p><span className="font-medium">Age:</span> {pet.Age}</p>
                      <p><span className="font-medium">Location:</span> {pet.Location}</p>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                      onClick={()=>{
                        openModal()
                        handleConfirmPet()
                      }}
                      className="flex-1 bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-200">
                        That's my pet
                      </button>
                      <button 
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Info size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {filteredPets !== null ? 
                    "No matching pets found. Try different filters." : 
                    "No found pets available."
                  }
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" >
          <div ref={modalRef} className="bg-white shadow-md rounded-lg p-6 min-h-[40vh] w-full max-w-[800px]" >
            <FoundPetConfirmation onClick={closeModal} />
          </div>
        </div>
      )}
      <footer>
      <Footer />
    </footer>
    </div>
    
  );
};

export default Lost;