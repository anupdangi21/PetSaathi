import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from "../Components/foot";
import axios from 'axios';
import Swal from "sweetalert2";

const Found = () => {
  const [Category, setCategory] = useState('');
  const [Image, setImage] = useState(null);
  const [Description, setDescription] = useState('');
  const [Color, setColor] = useState('');
  const [Age, setAge] = useState('');
  const [Location, setLocation] = useState('');

  const fileInputRef = useRef(null); // ✅ Using ref to reset file input
  const Navigate = useNavigate();

  const handlebackButton = () => {
    Navigate("/services/lostfound");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Category || !Image || !Description || !Color || !Age || !Location) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields before submitting.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("Category", Category);
    formData.append("Image", Image);
    formData.append("Description", Description);
    formData.append("Color", Color);
    formData.append("Age", Age);
    formData.append("Location", Location);

    try {
      const result = await axios.post('http://localhost:3000/petfound', formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      if (result.status === 200) {
        Swal.fire({
          title: "Pet reported successfully",
          icon: "success",
          text: "Found pet successfully reported",
        });

        // ✅ Correct way to reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Reset state
        setCategory('');
        setImage(null);
        setDescription('');
        setColor('');
        setAge('');
        setLocation('');
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while uploading!",
      });
    }
  };

  return (
    <div className="bg-orange-100">
      <header>
        <Navbar />
      </header>
      <main className="Container rounded-lg bg-orange-50 max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Report <span className="text-orange-600">Found</span> Pet
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex-wrap gap-6">
            <div className="flex gap-6">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Category*</span>
                </label>
                <select
                  value={Category}
                  className="mt-2 ml-4 select select-bordered w-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Other">Other Pets</option>
                </select>
              </div>

              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Upload pet image*</span>
                </label>
                <input
                  type="file"
                  ref={fileInputRef} // ✅ Using ref to reset
                  className="mt-2 ml-4 input input-bordered w-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setImage(e.target.files[0])} // ✅ Correct file handling
                />
              </div>
            </div>

            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Description*</span>
              </label>
              <textarea
                value={Description}
                className="textarea textarea-bordered w-full h-[110px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Add pet description here!"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-control mb-6 w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Pet Color*</span>
              </label>
              <input
                type="text"
                value={Color}
                placeholder="Enter the color of the pet"
                className="mt-2 input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className="form-control mb-6 w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Pet Estimated Age*</span>
              </label>
              <select
                value={Age}
                className="select mt-2 select-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="">Select estimated age:</option>
                <option value="3month">1-3 Months</option>
                <option value="6-9Months">6-9 Months</option>
                <option value="1year">1 year</option>
                <option value="1-2years">Between 1-2 years</option>
                <option value="above2years">Above 2 years</option>
              </select>
            </div>

            <div className="form-control mb-6 w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Location*</span>
              </label>
              <input
                type="text"
                value={Location}
                placeholder="Enter location where you found pet"
                className="mt-2 input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

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
                Post
              </button>
            </div>
          </div>
        </form>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Found;
