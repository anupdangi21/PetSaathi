import { useRef, useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { Info, X } from 'lucide-react';
import FoundPetConfirmation from "../Reservation/FoundPetConfirmation.jsx";
import useAuthGuard from "../Context/useAuthGuard.jsx";

const PetFilter = ({ pets }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const modalRef = useRef(null);
  const infoModalRef = useRef(null); 
  const [isPopupShown, setIsPopupShown] = useState(false);
  const withAuth = useAuthGuard();

  const handleClaimPet = (pet) => {
    Swal.fire({
      title: "Is this your pet?",
      text: "Are you sure this pet belongs to you?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#5cb85c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedPet(pet);
        setShowConfirmation(true);
      }
    });
  };
  
  // const showPetDetails = (pet) => {
  //   setSelectedPet(pet);
  // };
  

  const closeModal = () => {
    setShowConfirmation(false);
    setIsPopupShown(false);
  };

  useEffect(() => {
    if (showConfirmation) {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          closeModal();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showConfirmation]);

  useEffect(() => {
    if (selectedPet) {
    }
  }, [selectedPet]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Found Pets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.length > 0 ? (
          pets.map((pet, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-orange-100">
              {pet.Image && (
                <img 
                  src={`http://localhost:3000/${pet.Image}`} 
                  alt={pet.Category} 
                  className="w-full h-64 object-cover mb-4 rounded-lg"
                />
              )}
              <h3 className="text-xl font-semibold mb-2 capitalize">Category: {pet.Category}</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Color:</span> {pet.Color}</p>
                <p><span className="font-medium">Age:</span> {pet.Age}</p>
                <p><span className="font-medium">Location:</span> {pet.Location}</p>
                <p className='font-medium'>Status:<span className="text-green-500 ml-2">{pet.status}</span> </p>
              </div>
              <div className="flex gap-3 mt-6">
              <button
                onClick={withAuth(() => handleClaimPet(pet))}
                className="flex-1 bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-200"
              >
                That's my pet
              </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No matching pets found
          </div>
        )}
      </div>
 {showConfirmation && selectedPet && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div ref={modalRef} className="bg-white shadow-md rounded-lg p-6 min-h-[40vh] w-full max-w-[700px]">
      <FoundPetConfirmation pet={selectedPet} onClick={closeModal} />
    </div>
  </div>
)}
    </div>
  );
};

export default PetFilter;