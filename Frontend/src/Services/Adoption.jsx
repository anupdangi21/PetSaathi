import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Calendar, Info } from 'lucide-react';
import Navbar from "../Components/Navbar"
import Footer from "../Components/foot"


// export const AdoptionMain
 function Adoption () {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);


  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3000/petlisting');
        const result = await response.json();
  
        // Ensure we are setting the 'data' array inside pets, not the whole response object
        if (result.success && Array.isArray(result.data)) {
          setPets(result.data);
        } else {
          console.error("Unexpected API response format:", result);
          setPets([]); // Fallback to prevent mapping errors
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
        setPets([]); // Ensure pets is always an array
      }
    };
  
    fetchPets();
  }, []);
  

  const handleAdopt = () => {
    // Handle adoption logic here
    alert(`Adoption request for ${selectedPet.name} submitted!`);
    setSelectedPet(null);
  };
  return (
    <div>
      <header>
        <Navbar />
      </header>
    <main className="max-w-7xl mx-auto px-4 py-8">
      
      <div className="bg-gradient-to-r from-orange-200 to-orange-50 rounded-2xl p-8 mb-12 text-white">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Companion</h1>
        <p className="text-xl mb-6">Give a loving home to a pet in need</p>
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search by location..."
            className="px-4 py-2 rounded-lg text-gray-800 min-w-[200px] flex-1"
          />
          <select className="px-4 py-2 rounded-lg text-gray-800 min-w-[150px]">
            <option value="">Any Species</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
            <option value="other">Other Pets</option>
          </select>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
            Search
          </button>
        </div>
      </div>

       {/* Pet Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {Array.isArray(pets) && pets.length > 0 ? (
      pets.map((pet) => (
      <div key={pet._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={`http://localhost:3000/${pet.Image}`}
                  alt={pet.petname}
                  className="w-full h-64 object-cover"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <Heart size={20} className="text-red-500" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{pet.petname}</h3>
                    <p className="text-gray-600">{pet.Age} years old</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {pet.Category}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2" />
                    {pet.Location}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-200">
                    Adopt Now
                  </button>
                  <button 
                    onClick={() => setSelectedPet(pet)}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Info size={20} />
                  </button>
                </div>
              </div>
          </div>
  ))
) : (
  <p>No pets available for adoption.</p>
)}

        </div>

        {/* Overlay */}
        {selectedPet && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPet(null)}
          >
            <div 
              className="bg-white rounded-xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={`http://localhost:3000/${selectedPet.Image}`}
                alt={selectedPet.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedPet.name}</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <MapPin size={20} className="mr-2" />
                    <span>{selectedPet.Location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-2" />
                    <span>{selectedPet.Age} years old</span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">{selectedPet.Description}</p>
                  </div>
                </div>
                <button 
                  onClick={handleAdopt}
                  className="w-full bg-orange-300 text-white px-6 py-3 rounded-lg hover:bg-orange-200"
                >
                  Adopt Now
                </button>
              </div>
            </div>
          </div>
        )}
      {/* Schedule Visit Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Want to meet in person?</h2>
        <button className="inline-flex items-center gap-2 bg-orange-300 text-white px-6 py-3 rounded-lg hover:bg-orange-200">
          <Calendar size={20} />
          Schedule a Visit
        </button>
      </div>
      
    </main>
    <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default Adoption;