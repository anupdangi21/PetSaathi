import { useNavigate } from 'react-router-dom';

import "./App.css";
import Navbar from "../Components/Navbar"; // Importing Navbar component
import Foot from "../Components/foot"; // Importing foot component
import Dog from "../Images/Dog.png"; // Importing Dog image
import pet from "../Images/display-main1.png"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { PawPrint, Heart, MapPin, Calendar } from 'lucide-react';




function App() {
  const navigate = useNavigate();
  const recentPets = [
    {
      id: 1,
    name: "lucky",
    breed: "Golden Retriever",
    age: "2 years",
    location: "lalitput",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
    description: "Friendly and energetic Golden Retriever looking for an active family."
  },
  {
    id: 2,
    name: "Rocky",
    breed: "Domestic Shorthair",
    age: "1 year",
    location: "kathmandu, buddhanagar",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    description: "Sweet and playful cat who loves cuddles and window watching."
  },
    {
      id: 3,
      name: 'Maxer',
      type: 'Dog',
      breed: 'Beagle',
      age: '3 years',
      location: 'imadole',
      image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=500'
    }
  ];

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
      <div className="min-h-screen w-full bg-orange-100">
      <div className="container ml-24 max-w-screen-xl">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-6">
              <PawPrint className=" mb-16 w-10 h-10 text-orange-500" />
              <span className="text-6xl mb-16 font-bold text-white-500">Pet</span><span className="text-7xl mb-16  font-bold text-orange-500">Saathi</span>
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
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300" 
            onClick={() => navigate('/services/adoption')}>
              Explore Available Pets
              
            </button>
          </div>
          <div className="lg:w-1/2">
            <img src={pet} className=" mt-16"
            />
          </div>
        </div>
      </div>

      {/* Recent Pets Section */}
      <div className="bg-orange-50">
        <div className="container ml-24 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 mt-16">Recently Added Pets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <img 
                    src={pet.image} 
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-orange-50 transition-colors duration-300">
                    <Heart className="w-5 h-5 text-orange-500" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                    <span className="text-orange-500 font-semibold">{pet.type}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{pet.breed}</p>
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{pet.age}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{pet.location}</span>
                    </div>
                  </div>
                  <button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                    onClick={() => alert(`Booking appointment to meet ${pet.name}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer>
        <Foot />
      </footer> 
    
      </div>

      </main>
    </div>
    
  );
}

export default App;
