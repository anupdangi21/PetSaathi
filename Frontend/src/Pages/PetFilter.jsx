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

  const openModal = () => {
    if (!isPopupShown) {
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
          setShowConfirmation(true);
        }
        setIsPopupShown(false);
      });
    }
  };

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

  //useeffect for displaying the data in overlay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (infoModalRef.current && !infoModalRef.current.contains(event.target)) {
        setSelectedPet(null);
      }
    };

    if (selectedPet) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedPet]);

  const showPetDetails = (pet) => {
    setSelectedPet(pet);
  };

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
                  onClick={withAuth(openModal)}
                  className="flex-1 bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-200"
                >
                  That's my pet
                </button>
                <button
                onClick={() => showPetDetails(pet)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Info size={20} />
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

      {selectedPet && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={infoModalRef} className="bg-white rounded-lg p-6 max-w-2xl w-full relative">
            <button
              onClick={() => setSelectedPet(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold mb-4">{selectedPet.Category} Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedPet.Image && (
                <img
                  src={`http://localhost:3000/${selectedPet.Image}`}
                  alt={selectedPet.Category}
                  className="w-full h-80 object-cover rounded-lg"
                />
              )}
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Posted by:</h3>
                  <ul className="mt-2 space-y-2">
                    <li><span className="font-medium">Username:</span> {selectedPet.username}</li>
                    <li><span className="font-medium">Email:</span> {selectedPet.email}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Basic Information</h3>
                  <ul className="mt-2 space-y-2">
                    <li><span className="font-medium">Color:</span> {selectedPet.Color}</li>
                    <li><span className="font-medium">Age:</span> {selectedPet.Age}</li>
                    <li><span className="font-medium">Location Found:</span> {selectedPet.Location}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Description of lost pet:</h3>
                  <p className="mt-2 text-gray-600">
                    {selectedPet.Description || "No additional description provided"}
                  </p>
                </div>
                <button
                  onClick={withAuth(openModal)}
                  className="flex-1 bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-200"
                >
                  That's my pet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Existing confirmation modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white shadow-md rounded-lg p-6 min-h-[40vh] w-full max-w-[800px]">
            <FoundPetConfirmation onClick={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PetFilter;