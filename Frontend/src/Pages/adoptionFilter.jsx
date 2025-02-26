import React,{useState} from 'react'

const adoptionFilter = () => {
      const [selectedSpecies, setSelectedSpecies] = useState("");

      const [formData, setFormData]= useState({
        category:"",
        breed:"",
        
      })
    
  return (
    <div>
        <div className="bg-gradient-to-r from-orange-200 to-orange-50 rounded-2xl p-8 mb-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Companion</h1>
          <p className="text-xl mb-6">Give a loving home to a pet in need</p>
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Search by Breed..."
              className="px-4 py-2 rounded-lg text-gray-800 min-w-[200px] flex-1"
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
            className="ml-4 select select-bordered px-4 py-2 border  text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
              Search
            </button>
          </div>
        </div>
      
    </div>
  )
}

export default adoptionFilter
