import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Aside from "../Components/aside";
import { useNavigate } from 'react-router-dom';


const AddPets = () => {
      const Navigate = useNavigate();
  
  const [petname, setPetname] = useState("");
  const [Categories, setCategories] = useState("");
  const [Description, setDescription] = useState("");
  const [Age, setPetAge] = useState("");
  const [Location, setLocation] = useState("");

  const handlebackButton = () => {
    Navigate("/dashboard/adoption");
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!petname || !Categories || !Description || !Age || !Location) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all required fields.",
      });
      return;
    }

    try {
      const result = await axios.post("http://localhost:3000/petlisting", {
        petname,
        Categories,
        Description,
        Age,
        Location,
      });

      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Pet Added Successfully",
          text: "Your pet has been added to the pet listing.",
        });

        setPetname("");
        setCategories("");
        setDescription("");
        setPetAge("");
        setLocation("");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while uploading the pet!",
      });
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside>
        <Aside />
      </aside>
      <main className="w-full md:w-[800px] mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Upload A New <span className="text-orange-600">Pet</span>
        </h2>

        <div>
          <form onSubmit={handleSubmit}>
            {/* Pet Name */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Pet Name*</span>
              </label>
              <input
                type="text"
                value={petname}
                placeholder="Enter Pet Name"
                className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setPetname(e.target.value)}
              />
            </div>

            {/* Categories and Description */}
            <div className="flex flex-wrap gap-6">
              {/* Categories */}
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Category*</span>
                </label>
                <select
                  className="select select-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={Categories}
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

              {/* Description */}
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Description*</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-[110px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={Description}
                  placeholder="Add pet description here!"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="form-control mb-6 w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Age*</span>
              </label>
              <input
                type="text"
                value={Age}
                placeholder="Enter Pet Age"
                className=" mt-2 input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setPetAge(e.target.value)}
              />
            </div>
            <div className="form-control mb-6 mb-6 w-1/2" >
              <label className="label">
                <span className="label-text font-medium text-gray-700">Location*</span>
              </label>
              <input
                type="text"
                value={Location}
                placeholder="Enter Your location"
                className=" mt-2 input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between mt-6">
              <button
                type="button"  
                onClick={handlebackButton}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-300"
              >
                Back
              </button>
              <button
                type="submit" 
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:outline-none transition duration-300"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddPets;
