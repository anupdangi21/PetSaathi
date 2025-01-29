import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from "../Components/foot"
import { useNavigate } from 'react-router-dom';


const Found = () => {
    const Navigate = useNavigate();

    const handlebackButton = () => {
        Navigate("/services/lostfound");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
  return (
    <div className='container'>
        <header>
            <Navbar />
        </header>
        <main className="w-full md:w-[800px] mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Report <span className="text-orange-600">Found</span> Pet
        </h2>

        <div>
          <form onSubmit={handleSubmit}>
            {/* Categories and Description */}
            <div className="flex-wrap gap-6">
              {/* Categories */}
              <div className="flex gap-6">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Category*</span>
                  </label>
                  <select
                    className="mt-2 ml-4 select select-bordered w-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  //   value={Categories}
                    onChange={(e) => setCategories(e.target.value)}
                  >
                    <option disabled value="">
                      Select a category
                    </option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Other">Other Pets</option>
                  </select>
                </div>

                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Upload pet image*</span>
                  </label>
                    <input type='file'
                      className=" mt-2 ml-4  input input-bordered w-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    ></input>
                </div>
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Description*</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-[110px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                //   value={Description}
                  placeholder="Add pet description here!"
                //   onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
            </div>
            <div className="form-control mb-6 w-1/2" >
              <label className="label">
                <span className="label-text font-medium text-gray-700">Pet Color*</span>
              </label>
              <input
                type="text"
                // value={Location}
                placeholder="Enter the color of the pet"
                className=" mt-2 input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                // onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-control mb-6 w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Pet Estimated Age*</span>
              </label>
              <select
                  className="select mt-2 select-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                //   value={Categories}
                placeholder="Select age:"
                  onChange={(e) => setCategories(e.target.value)}
                >
                  <option value="text-color-white-50" disabled >
                    Select estimated age: 
                  </option>
                  <option value="3month">3Months</option>
                  <option value="">6-9Months</option>
                  <option value="1year">1 year</option>
                  <option value="">Between 1-2 years</option>
                  <option value="">Above 2 years</option>

                </select>
            </div>
            <div className="form-control mb-6 mb-6 w-1/2" >
              <label className="label">
                <span className="label-text font-medium text-gray-700">Location*</span>
              </label>
              <input
                type="text"
                // value={Location}
                placeholder="Enter location where you found pet"
                className=" mt-2 input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                // onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex justify-between mt-6">
            <button
                onClick={handlebackButton}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-300"
            >
                Back
            </button>
            <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-300"
            >
                Post
            </button> 
            </div>
          </form>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Found
