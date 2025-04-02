import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import "./App.css";
import Navbar from "../Components/Navbar"; // Importing Navbar component
import Foot from "../Components/foot"; // Importing foot component
import pet from "../Images/display-main1.png";
import { PawPrint, Heart, MapPin, } from 'lucide-react';
import useAuthGuard from "../Context/useAuthGuard.jsx"


function App() {
  const withAuth = useAuthGuard();

  const handleProtectedAction = () => {
      console.log("user is logged in");
  };

  const navigate = useNavigate();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3000/petlisting');
        const result = await response.json();
  
        if (result.success && Array.isArray(result.data)) {
          // Get current user's email from localStorage
          const userData = JSON.parse(localStorage.getItem('user_data'));
          const userEmail = userData?.user?.email;

          const filteredPets = result.data.filter(pet => {
            const isAvailable = pet.status === "Available";
            const isNotOwnPet = !userEmail || pet.email !== userEmail;
            return isAvailable && isNotOwnPet;
          });
  
          setPets(filteredPets);
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
  
  const viewAll=()=>{
    navigate('/services/adoption')
 }
  return (
    <div className="w-full bg-orange-100">
    <header>
      <Navbar />
    </header>
    <main>
      <div className="w-full bg-orange-100">
        <div className="container ml-24 max-w-screen-xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-6">
                <PawPrint className="mb-16 w-10 h-10 text-orange-500" />
                <span className="text-6xl mb-16 font-bold text-white-500">Pet</span>
                <span className="text-7xl mb-16 font-bold text-orange-500">Saathi</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                Find Your Perfect
                <span className="text-orange-500"> Companion</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Every pet deserves a loving home. By adopting, you're not just getting a pet – you're
                saving a life and gaining an unconditional friend. Our adoption process is simple,
                supportive, and focused on making perfect matches.
              </p>
              <button
                className="bg-gradient-to-r from-orange-500 to-orange-300 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300"
                onClick={() => navigate('/services/adoption')}
              >
                Explore Available Pets
              </button>
            </div>
            <div className="lg:w-1/2">
              <img src={pet} alt="Pet adoption" className="mt-16 ml-8" />
            </div>
          </div>
        </div>

        {/* Recent Pets Section */}
        <div className="bg-orange-50">
          <div className="container ml-24 max-w-screen-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 mt-16">Recently Added Pets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(pets) && pets.length > 0 ? (
              pets.slice(-3).map((pet) => ( // 
                <div key={pet._id} className="bg-white rounded-xl shadow-lg overflow-hidden h-auto mb-8">
                  <div className="relative h-80">
                    <img 
                      src={`http://localhost:3000/${pet.Image}`}
                      alt={pet.petname}
                      className="w-full h-80 object-cover"
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
                      <button
                      onClick={() => {
                        withAuth(handleProtectedAction)()
                        viewAll()    
                    }}
                      className="flex-1 bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-200">
                        View more details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No pets available for adoption.</p>
            )}
          </div>
          </div>
        </div>
      </div>
    </main>
    <footer>
          <Foot />
        </footer> 
  </div>
  );
}

export default App;
