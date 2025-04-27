import React, { useState, useEffect, useRef } from 'react';
import { Heart, MapPin,Timer,PackageOpen,Award, CalendarDays,ShieldAlert, Info, BadgeAlert,Truck,Ambulance,Utensils,Package,PhoneOutgoing } from 'lucide-react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/foot'
import useAuthGuard from "../Context/useAuthGuard.jsx";
import TrainingReservation from '../Reservation/trainingReservation.jsx';
import { Navigate, useNavigate } from 'react-router-dom';


const PetTraining = () => {
  const withAuth = useAuthGuard();
  const modalRef = useRef(null);
  const infoModalRef = useRef(null);
  const navigate = useNavigate()
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTraining, setShowTraining] = useState([]);
  const [bookingPet, setBookingPet] = useState(null);

  const openModal = () => setShowConfirmation(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle booking modal
      if (showConfirmation && modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
      // Handle info modal
      if (selectedPet && infoModalRef.current && !infoModalRef.current.contains(event.target)) {
        setSelectedPet(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showConfirmation, selectedPet]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3000/training');
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const userData = JSON.parse(localStorage.getItem('user_data'));
          const userEmail = userData?.user?.email;

          const filteredPets = result.data.filter(pet => 
            pet.status !== "Booked" && (!userEmail || pet.vendoremail !== userEmail)
          );

          setPets(filteredPets.reverse());
          setShowTraining(filteredPets)
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  const handleTraining = (pet) => {
    localStorage.setItem('selectedPet(training)', JSON.stringify(pet));
    setTimeout(() => {
      localStorage.removeItem('selectedPet(training)');
  }, 60000);
    setBookingPet(pet);
    setShowConfirmation(true);
    setSelectedPet(null); // Close info modal if open
  };

  const closeModal = () => {
    setShowConfirmation(false);
    setBookingPet(null);
  };

  const InfoData =()=>{
    navigate("/services/training/pettraininginfo")
  }

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-orange-200 to-orange-50 rounded-2xl p-8 mb-12 text-white">
      <h1 className="text-4xl font-bold mb-4 flex items-center justify-between">
          <span>Find Your Perfect Trainer</span>
          <button onClick={InfoData} className="bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-m">
            <Info />
          </button>
        </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(showTraining) && showTraining.length > 0 ? (
            showTraining.map((pet) => (
              <div key={pet._id} className="bg-zinc-50 rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={`http://localhost:3000/${pet.Image}`}
                    alt={pet.petname}
                    className="w-full h-64 object-cover"
                  />
                  {/* <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                    <Heart size={20} className="text-red-500" />
                  </button> */}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className='flex'>
                    <Package size={20} className="mr-2" />
                    <span className='font-bold'>Package Type: </span><p className='ml-2'> {pet.serviceoffering}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                     Rs {pet.price}
                    </span>
                  </div>
                  <div className='flex'>
                      <ShieldAlert  size={20} className="mr-2" />
                      <span className='font-bold'> Restrictions: </span><p className='ml-2'> {pet.eligibility}</p>
                    </div>
                    <div className='flex flex'>
                  <div className='flex mt-2'>
                      <Timer  size={20} className="mr-2" />
                      <span className='font-bold'> Duration: </span><p className='ml-2'> {pet.duration}</p>
                    </div>
                    <div className='flex mt-2 ml-12'>
                      <CalendarDays  size={20} className="mr-2" />
                      <span className='font-bold'> Days: </span><p className='ml-2'> {pet.days}</p>
                    </div>
                    </div>
                  <div className="space-y-3 mb-6 mt-2">
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
                      onClick={() => withAuth(() => handleTraining(pet))()}
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
            <p>No service available for training.</p>
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
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <div className='flex flex'>
                    <h2 className="text-lg font-bold mb-4">From: </h2><p className=' text-lg mt-0.5 ml-2'>{selectedPet.organizationname}</p>
                    <h2 className="text-lg font-bold mb-4 ml-32">Contact vendor:</h2><p className='mt-1 ml-2'>98*******</p>  
                {/* //{selectedPet.vendorcontact} */}
                </div>
                <div className='flex flex'>
                  <div className="flex flex items-center">
                    <Award size={20} className="mr-2" />
                    <span className='font-bold text-lg flex'> Trainer Experience:</span>
                    <p className="flex flex-1 ml-1 mt-0.5 text-lg"> {selectedPet.experience}</p>
                  </div>
                  <div className="flex items-center ml-20">
                    <span className='font-bold text-lg flex'> Available Shifts:</span>
                    <p className="flex flex-1 ml-1 text-lg"> {selectedPet.timing}</p>
                  </div>
                  </div>
                  <div className="mb-2 flex mt-2">
                    <PackageOpen size={24} className="" />
                    <span className='font-bold text-lg flex ml-1'> Included Offerings:</span><p className='flex flex-1 ml-1 mt-0.5 text-lg'>{selectedPet.includedOfferings}</p>
                  </div>
                  <div className="col-span-2 mt-4 flex">
                  <span className='font-bold text-lg flex'> Description:</span>
                    <p className="flex flex-1 ml-1 text-lg"> {selectedPet.description}</p>
                  </div>
                  <div className='flex flex mt-2 mb-6'>
                  <h3 className="text-xl font-semibold text-gray-800">Status:</h3>
                      <span className="text-green-500">
                          <p className="font-md mt-1 ml-2">{selectedPet.status}</p>
                      </span>                    
                      </div>
                  
                <div className="flex gap-3">
                <button
                  onClick={() => withAuth(() => handleTraining(selectedPet))()}
                  className="w-full bg-orange-300 text-white px-6 py-3 rounded-lg hover:bg-orange-200"
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
          </div>
        )}
{showConfirmation && bookingPet && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={modalRef} className="bg-white shadow-md rounded-lg p-6 min-h-[40vh] w-full max-w-[800px]">
              <TrainingReservation pet={bookingPet} onClose={closeModal} />
            </div>
          </div>
        )}
    </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default PetTraining
