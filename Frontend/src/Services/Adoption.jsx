import React from 'react';
import { Heart, MapPin, Calendar, Info } from 'lucide-react';
import Navbar from "../Components/Navbar"
import Footer from "../Components/foot"

const pets = [
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
  }
];
// export const AdoptionMain
 function Adoption () {
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
        {pets.map(pet => (
          <div key={pet.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src={pet.image} 
                alt={pet.name}
                className="w-full h-64 object-cover"
              />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                <Heart size={20} className="text-red-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{pet.name}</h3>
                  <p className="text-gray-600">{pet.breed}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {pet.age}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  {pet.location}
                </div>
                <p className="text-gray-600">{pet.description}</p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-200">
                  Adopt Now
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Info size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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