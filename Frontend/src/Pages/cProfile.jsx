import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Navbar from "../Components/Navbar"
import Footer from "../Components/foot"

const cProfile = () => {
const navigate = useNavigate("")

const handleBackbtn =()=>{
  navigate("/")
}

  
    return (
        <div>
          <header>
            <Navbar />
          </header>
          <main className='max-w-7xl mx-auto px-4 py-8'>
          <div>
          <form >
          {/* onSubmit={handleSubmit} */}
            {/* Pet Name */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Pet Name*</span>
              </label>
              <input
                type="text"
                // value={petname}
                placeholder="Enter Pet Name"
                className="mt-4 input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                // onChange={(e) => setPetname(e.target.value)}
              />
            </div>

            {/* Categories and Description */}

            {/* Image Upload */}
            <div className="form-control flex-1 w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  Update your profile
                </span>
              </label>
              <img src=""></img>
              <input
                type="file"
                // ref={fileInputRef}
                className="mt-8 ml-4 input input-bordered w-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                // onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"  
                onClick={handleBackbtn}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-300"
              >
                Back
              </button>
              <button
                type="submit" 
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-300"
              >
                Update
              </button>
            </div>
          </form>
        </div>
          </main>
    
          <footer >
            <Footer />
          </footer>
        </div>
      )
    }

export default cProfile
