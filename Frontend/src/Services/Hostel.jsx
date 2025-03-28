import React, { useState, useEffect, useRef } from 'react';
import { Heart, MapPin,Columns4, Calendar, Info, BadgeAlert,Truck,Ambulance,Utensils } from 'lucide-react';
import Navbar from '../Components/Navbar'
import Footer from "../Components/foot"
import useAuthGuard from "../Context/useAuthGuard.jsx";
import HostelReservation from '../Reservation/hostelReservation.jsx';
import { Navigate,useNavigate } from 'react-router-dom';

const Hostel = () => {
  const navigate = useNavigate()
  const withAuth = useAuthGuard();
  const modalRef = useRef(null);

  const [pets, setPets] = useState([]);
  const [accommodationData, setAccommodationData] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showHostel, setShowHostel] = useState([]);

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
        const response = await fetch('http://localhost:3000/pethostel');
        const result = await response.json();
  
        if (result.success && Array.isArray(result.data)) {
          const userData = JSON.parse(localStorage.getItem('user_data'));
          const userEmail = userData?.user?.email;
  
          // Parse accommodation for EACH PET
          const petsWithAccommodations = result.data.map(pet => {
            try {
              // Parse the accommodation array for THIS pet
              const accommodationDetails = pet.accomodation?.length > 0 
                ? JSON.parse(pet.accomodation[0]) 
                : [];
              return { ...pet, accommodationDetails };
            } catch (error) {
              console.error("Error parsing accommodation:", error);
              return { ...pet, accommodationDetails: [] };
            }
          });
  
          const filteredPets = petsWithAccommodations.filter(pet => 
            pet.status !== "Booked" && (!userEmail || pet.vendoremail !== userEmail)
          );
  
          setPets(filteredPets.reverse());
          setShowHostel(filteredPets);
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };
    fetchPets();
  }, []);

  const handleHostel = (pet) => {
    const { Description, ...petDetails } = pet;
    localStorage.setItem('selectedPet', JSON.stringify(petDetails));

    setTimeout(() => {
      localStorage.removeItem('selectedPet');
  }, 30000);
    openModal();
    setSelectedPet(null);
  };

  const InfoData =()=>{
    navigate("/services/hostel/pethostelinfo")
  }

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-orange-200 to-orange-50 rounded-2xl p-8 mb-12 text-white">
      <h1 className="text-4xl font-bold mb-4 flex items-center justify-between">
          <span>Find Your Perfect Hostel</span>
          <button onClick={InfoData} className="bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-m">
            <Info />
          </button>
        </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(showHostel) && showHostel.length > 0 ? (
            showHostel.map((pet) => (
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
                    <div className='flex'>
                    <Utensils size={20} className="mr-2" />
                    <span className='font-bold'>Food: </span><p className='ml-2'> {pet.food}</p>
                    </div>
                    <div className='flex'>
                      <Ambulance size={20} className="mr-2" />
                      <span className='font-bold'> Medical: </span><p className='ml-2'> {pet.medicalsupport}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {/* {pet.accomodation.type.price} */}i 
                    </span>

                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={20} className="mr-2" />
                      <span className='font-bold text-lg'>{pet.vendorlocation}</span>
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
                      onClick={() => withAuth(() => handleHostel(pet))()}
                      className="flex-1 bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-200"
                    >
                      Book Now
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
            <p>No service available for hostel.</p>
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
                <div className='flex flex'>
                <h2 className="text-lg font-bold mb-4">From: </h2><p className=' text-lg mt-0.5 ml-2'>{selectedPet.organizationname}</p>
                </div>
                <div className='flex flex'>
                <h2 className="text-lg font-bold mb-4">Contact vendor:</h2><p className='mt-1 ml-2'>98*******</p>  
                {/* //{selectedPet.vendorcontact} */}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Utensils size={20} className="mr-2" />
                    <span>Food time: {selectedPet.food}</span>
                  </div>
                  <div className="flex items-center">
                    <Ambulance size={20} className="mr-2" />
                    <span>Medical Support: {selectedPet.medicalsupport}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck size={20} className="mr-2" />
                    <span>Pick up: {selectedPet.petpickup}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck size={20} className="mr-2" />
                    <span>Drop Off: {selectedPet.petdropoff}</span>
                  </div>
                  </div>
                  <div>
                  <div className='grid gap-1 mb-2'>
                  {selectedPet?.accommodationDetails?.length > 0 ? (
                      selectedPet.accommodationDetails.map((item, index) => (
                        <li key={index}>
                          <strong>Accommodation type:</strong> {item.type}, 
                          <strong>Available seats:</strong> {item.count}, 
                          <strong>Price:</strong> {item.price}
                        </li>
                      ))
                    ) : (
                      <p>No accommodation details available</p>
                    )}
                  </div>
                  </div>
                  <div className='flex mt-2'>
                  <h3 className="text-xl font-semibold text-gray-800">Status:</h3>
                      <span className="text-green-500">
                          <p className="font-md mt-1 ml-2">{selectedPet.status}</p>
                      </span>                    
                      </div>
                  <div className="col-span-2 flex mt-2">
                    <h2 className='text-lg font-semibold'>Description:</h2>
                    <p className="text-gray-600">{selectedPet.description}</p>
                  </div>
                </div>
                <div className="flex gap-3 ml-6 mb-6 mr-6">
                <button
                  onClick={() => withAuth(() => handleHostel(selectedPet))()}
                  className=" w-full bg-orange-300 text-white px-6 py-3 rounded-lg hover:bg-orange-200"
                >
                  Book Now
                </button>
                <button
                      onClick={() => setSelectedPet(pet)}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover"
                    >
                      <BadgeAlert  size={20} />
                    </button>
                    </div>
              </div>
            </div>
        )}
    </main>
    {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white shadow-md rounded-lg p-6 min-h-[40vh] w-full max-w-[800px]">
            <HostelReservation onClick={closeModal} />
          </div>
        </div>
      )}
        <footer >
            <Footer />
        </footer>
    </div>
  )
}

export default Hostel
