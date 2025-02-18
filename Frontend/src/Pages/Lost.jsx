import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { ClipLoader } from 'react-spinners';
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/foot.jsx";
import PetFilter from '../Pages/PetFilter.jsx';

const Lost = () => {
  const [allFoundPets, setAllFoundPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [petsLoading, setPetsLoading] = useState(true);

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
        setFilteredPets(response.data.data || []);
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

  const handleFilter = () => {
    const { category, color } = formData;
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
      await axios.post('http://localhost:3000/lostpet', {
        Category: formData.category,
        Color: formData.color,
        Age: formData.age,
        Location: formData.location
      });

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
        <form className='mb-12'>
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
                  onClick={handleSubmit}
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

        {petsLoading ? (
          <div className="text-center py-8">
            <ClipLoader size={40} color="#F97316" />
          </div>
        ) : (
          <PetFilter pets={filteredPets} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Lost;