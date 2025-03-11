import React, { useState, useEffect, useRef } from 'react';
import { Heart, MapPin, Calendar, Info } from 'lucide-react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/foot";
import useAuthGuard from "../Context/useAuthGuard.jsx";
import AdoptPetReservation from "../Reservation/AdoptPetReservation.jsx";

function Adoption() {
  const withAuth = useAuthGuard();
  const modalRef = useRef(null);

  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAdopt, setShowAdopt] = useState([]);

  const [formData, setFormData]= useState({
          category:"",
          breed:"",
          
        })

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

  useEffect(() => {
    const fetchPets = async () => {
        try {
            const response = await fetch('http://localhost:3000/petlisting');
            const result = await response.json();

            if (result.success && Array.isArray(result.data)) {
                const userData = JSON.parse(localStorage.getItem('user_data'));
                const userEmail = userData?.user?.email;


                const filteredPets = result.data.filter(pet => 
                    pet.status !== "Booked" && (!userEmail || pet.email !== userEmail)
                );

                setPets(filteredPets.reverse());
                setShowAdopt(filteredPets)
            } else {
                console.error("Unexpected API response format:", result);
                setPets([]);
            }
        } catch (error) {
            console.error('Error fetching pets:', error);
            setPets([]);
        }
    };

    fetchPets();
}, []);


const handleChange = (e) =>{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  })
}


const handleFilter = () => {
  const { breed } = formData;
  
  const filtered = pets.filter(pet => {
    const speciesMatch = selectedSpecies 
      ? pet.Category.toLowerCase() === selectedSpecies.toLowerCase()
      : true;
      
    const breedMatch = breed
      ? pet.Breed.toLowerCase().startsWith(breed.toLowerCase())
      : true;

    return speciesMatch && breedMatch;
  });

  setShowAdopt(filtered);
};

  const handleAdopt = (pet) => {
    const { Description, ...petDetails } = pet;
    localStorage.setItem('selectedPet', JSON.stringify(petDetails));

    setTimeout(() => {
      localStorage.removeItem('selectedPet');
  }, 30000);
    openModal();

    setSelectedPet(null);
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
      <form onSubmit={(e) => {
        e.preventDefault(); // Prevent page refresh
        handleFilter();
      }}>
        <div className="bg-gradient-to-r from-orange-200 to-orange-50 rounded-2xl p-8 mb-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Companion</h1>
          <p className="text-xl mb-6">Give a loving home to a pet in need</p>
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Search by Breed..."
              name="breed"
              value={formData.breed}
              className="px-4 py-2 rounded-lg text-gray-800 min-w-[200px] flex-1"
              onChange={handleChange}
            />
            <select
        className="px-4 py-2 rounded-lg text-gray-800 min-w-[150px] border border-gray-300"
        onChange={(e) => setSelectedSpecies(e.target.value)}
        value={selectedSpecies}
      >
        <option value="">Any Species</option>
        <option value="dog">Dogs</option>
        <option value="cat">Cats</option>
        <option value="other">Other Pets</option>
      </select>

      {/* Breed Dropdown - Only visible when 'Dog' is selected */}
      {selectedSpecies === "dog" && (
        <div className="form-control flex-1 mt-2 ml-8">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Choose breed*</span>
          </label>
          <select
          name="breed"
          value={formData.breed}
            className="ml-4 select select-bordered px-4 py-2 border  text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={handleChange}
          >
            <option value="">Select a Breed</option>
            <option value="German Shepherd">German Shepherd</option>
            <option value="Labrador">Labrador</option>
            <option value="Golden Retriever">Golden Retriever</option>
            <option value="Pug">Pug</option>
            <option value="Japanese Spitz">Japanese Spitz</option>
            <option value="Husky">Husky</option>
            <option value="Other">Other</option>
          </select>
        </div>
      )}
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50"
              onClick={handleFilter}
            >
              Search
            </button>
          </div>
        </div>
        </form>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(showAdopt) && showAdopt.length > 0 ? (
            showAdopt.map((pet) => (
              <div key={pet._id} className="bg-zinc-50 rounded-xl shadow-lg overflow-hidden">
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
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {pet.Breed}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={18} className="mr-2" />
                      {pet.Location}
                    </div>
                    <div className='flex flex'>
                    <h3 className="text-xl font-semibold text-gray-800">Status:</h3>
                      <span className="text-green-500">
                          <p className="font-md mt-1 ml-2">{pet.status}</p>
                      </span>                    
                      </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => withAuth(() => handleAdopt(pet))()}
                      className="flex-1 bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-200"
                    >
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
                <h2 className="text-2xl font-bold mb-4">{selectedPet.petname}</h2>
                <div className='flex flex'>
                <h2 className="text-lg font-bold mb-4">From: </h2><p className=' text-lg mt-0.5 ml-2'>{selectedPet.organizationname}</p>
                </div>
                <div className='flex flex'>
                <h2 className="text-lg font-bold mb-4">Contact vendor:</h2><p className='mt-1 ml-2'>98*******</p>  
                {/* //{selectedPet.vendorcontact} */}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <MapPin size={20} className="mr-2" />
                    <span>{selectedPet.Location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-2" />
                    <span>{selectedPet.Age} years old</span>
                  </div>
                  <div className='flex flex'>
                  <h3 className="text-xl font-semibold text-gray-800">Status:</h3>
                      <span className="text-green-500">
                          <p className="font-md mt-1 ml-2">{selectedPet.status}</p>
                      </span>                    
                      </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">{selectedPet.Description}</p>
                  </div>
                </div>
                <button
                  onClick={() => withAuth(() => handleAdopt(selectedPet))()}
                  className="w-full bg-orange-300 text-white px-6 py-3 rounded-lg hover:bg-orange-200"
                >
                  Adopt Now
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white shadow-md rounded-lg p-6 min-h-[40vh] w-full max-w-[800px]">
            <AdoptPetReservation onClick={closeModal} />
          </div>
        </div>
      )}
      <footer >
        <Footer />
      </footer>
    </div>
  );
}

export default Adoption;