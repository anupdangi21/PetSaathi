import { React, useState, useEffect,useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Aside from "../Components/aside";
import { useNavigate, useLocation } from 'react-router-dom';

const AddPets = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const isEdit = state?.isEdit;
  const petData = state?.petData;

  // State variables
  const [petname, setPetname] = useState("");
  const [Category, setCategory] = useState("");
  const [Description, setDescription] = useState("");
  const [Age, setPetAge] = useState("");
  const [Location, setLocation] = useState("");
  const [Image, setImage] = useState(null);
  const [petId, setPetId] = useState("");
  const fileInputRef = useRef(null);

  // Pre-fill form for edit mode
  useEffect(() => {
    if (isEdit && petData) {
      setPetname(petData.petname || "");
      setCategory(petData.Category || "");
      setDescription(petData.Description || "");
      setPetAge(petData.Age || "");
      setLocation(petData.Location || "");
      setPetId(petData._id || "");
    }
  }, [isEdit, petData]);

  const handlebackButton = () => {
    Navigate("/dashboard/adoption");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user_data'));
    if (!userData?.user?.email && !userData?.user?.organizationname) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "User email not found. Please login again.",
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("petname", petname);
    formData.append("Category", Category);
    formData.append("Description", Description);
    formData.append("Age", Age);
    formData.append("Location", Location);
    formData.append("email", userData.user.email);
    formData.append("organizationname", userData.user.organizationname) 
    
    // Only append new image if it exists
    if (Image) {
      formData.append("Image", Image);
    }
  
    try {
      const url = isEdit 
        ? `http://localhost:3000/petlisting/${petId}`
        : 'http://localhost:3000/petlisting';
  
      const result = await axios({
        method: isEdit ? 'put' : 'post',
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          title: isEdit ? "Pet Updated" : "Pet Added",
          text: isEdit 
            ? "Pet details updated successfully" 
            : "Pet added to listing successfully",
        });

        if (!isEdit) {
          // Reset form for new entries
          setPetname("");
          setCategory("");
          setDescription("");
          setPetAge("");
          setLocation("");
          setImage(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
        
        Navigate("/dashboard/adoption");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: isEdit 
          ? "Failed to update pet details" 
          : "Failed to add pet to listing",
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
          {isEdit ? "Edit" : "Upload A New"} <span className="text-orange-600">Pet</span>
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
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
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

            {/* Age */}
            <div className="form-control mb-6 w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Age*</span>
              </label>
              <select
                value={Age}
                className="select mt-2 select-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setPetAge(e.target.value)}
              >
                <option value="">Select estimated age:</option>
                <option value="3month">1-3 Months</option>
                <option value="6-9Months">6-9 Months</option>
                <option value="1year">1 year</option>
                <option value="1-2years">Between 1-2 years</option>
                <option value="above2years">Above 2 years</option>
              </select>
            </div>

            {/* Location */}
            <div className="form-control mb-6 w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Location*</span>
              </label>
              <input
                type="text"
                value={Location}
                placeholder="Enter Your location"
                className="mt-2 input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Image Upload */}
            <div className="form-control flex-1 w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  {isEdit ? "Update pet image" : "Upload pet image"}
                </span>
              </label>
              <input
                type="file"
                ref={fileInputRef}
                className="mt-2 ml-4 input input-bordered w-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* Submit Buttons */}
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
                {isEdit ? "Update" : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddPets;