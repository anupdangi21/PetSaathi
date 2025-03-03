import { React, useState, useEffect,useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Aside from "../Components/aside";
import { useNavigate, useLocation } from 'react-router-dom';

const AddTraining = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const isEdit = state?.isEdit;
  const petData = state?.petData;

    const [serviceoffering, setServiceoffering] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [timing, setTiming]=useState("")
    const [eligibility , setEligibility] = useState("");
  const [Image, setImage] = useState(null);
  const [petId, setPetId] = useState("");
  const fileInputRef = useRef(null);

  const [selectedServices, setSelectedServices] = useState([]);
    const [includedOfferings, setIncludedOfferings] = useState([]);

  // Pre-fill form for edit mode
  useEffect(() => {
    if (isEdit && petData) {
    setServiceoffering(petData.serviceoffering);
    setSelectedServices(petData.includedOfferings || []);
    setDescription(petData.description);
    setPrice(petData.price);
    setDuration(petData.duration);
    setTiming(petData.timing);
    setEligibility(petData.eligibility);
    setPetId(petData._id || "");
    }
  }, [isEdit, petData]);

  const handlebackButton = () => {
    Navigate("/dashboard/pet-training");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Geting user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user_data'));
    if (!userData?.user?.email && !userData?.user?.organizationname && !userData?.user?.location) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "User email not found. Please login again.",
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("serviceoffering", serviceoffering);
    selectedServices.forEach(service => {
      formData.append('includedOfferings', service);
    });   
     formData.append("description", description);
    formData.append("price", price);
    formData.append("duration", duration);
    formData.append("timing", timing);
    formData.append("eligibility", eligibility);
    formData.append("vendorlocation", userData.user.location);
    formData.append("experience",userData.user.experience)
    formData.append("vendoremail", userData.user.email);
    formData.append("organizationname", userData.user.organizationname) 
    formData.append("vendorcontact", userData.user.number)

    // Only append new image if it exists
    if (Image) {
      formData.append("Image", Image);
    }
  
    try {
      const url = isEdit 
        ? `http://localhost:3000/training/${petId}`
        : 'http://localhost:3000/training';
  
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
          title: isEdit ? "Pet-training Updated" : "Pet training service Added",
          text: isEdit 
            ? "Pet details updated successfully" 
            : "Pet added to listing successfully",
        });

        if (!isEdit) {
          // Reset form for new entries
          setSelectedServices("");
          setServiceoffering("");
          setDescription("");
          setPrice("");
          setDuration("")
          setTiming("")
          setEligibility("");
          setImage(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
        
        Navigate("/dashboard/pet-training");
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

  const handleServiceChange = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside>
        <Aside />
      </aside>
      <main className="w-full md:w-[800px] mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isEdit ? "Edit" : "Upload A New"} <span className="text-orange-600">Pet Training Service</span>
        </h2>

        <div>
          <form onSubmit={handleSubmit}>
            {/* Pet Name */}
            <div className="flex flex-wrap gap-6">
        <div className="form-control flex-1">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Service Package*</span>
          </label>
          <select
            className="mt-4 select select-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={serviceoffering}
          onChange={(e) => setServiceoffering(e.target.value)}
          >
            <option value="">Please select package</option>
            <option value="Basic">Basic Package</option>
            <option value="Standard">Standard Package</option>
          </select>
        </div>
      </div>
      

      {/* Checkboxes for Basic & Standard Packages */}
      {["Bathing and Drying", "Haircut and Style", "Nail Trimming", "Ear Cleaning"].map((service) => (
        <div key={service} className="form-control flex">
          <label className="label cursor-pointer">
            <span className="label-text">{service}</span>
            <input
              type="checkbox"
              className="checkbox checkbox-orange-500 ml-2"
              checked={selectedServices.includes(service)}
              onChange={() => handleServiceChange(service)}
            />
          </label>
        </div>
      ))}



        {/* Extra Checkboxes for Standard Package */}
        {serviceoffering === "Standard" &&
        ["Teeth Brushing", "Vaccination", "Pet Dropoff"].map((service) => (
          <div key={service} className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">{service}</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => handleServiceChange(service)}
              />
            </label>
          </div>
        ))}

      {/* Included Offering Section */}
      <div className="form-control mt-4">
        <label className="label">
          <span className="label-text">Included Offering</span>
        </label>
        <div className="p-3 border rounded-lg bg-gray-100">
          {selectedServices.length > 0 ? (
            <ul className="list-disc pl-4">
              {selectedServices.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          ) : (
            <span>No offerings selected</span>
          )}
        </div>
      </div>
      <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Description*</span>
                </label>
                <textarea
                  className="mt-4 textarea textarea-bordered w-full h-[70px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={description}
                  placeholder="Add pet description here!"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-16">
              <div className="form-control mb-6 mt-4">
              <label className="label">
                <span className="label-text font-medium text-gray-700 ">Price*</span>
              </label>
              <input
                type="text"
                value={price}
                placeholder="Enter price....."
                className="flex flex mt-2 input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-control mb-6 mt-4">
              <label className="label">
                <span className="label-text font-medium text-gray-700 ">Training Duration*</span>
              </label>
              <input
                type="text"
                value={duration}
                placeholder="Enter duration....."
                className="flex flex mt-2 input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="form-control mb-6 mt-4">
              <label className="font-medium text-gray-700">Shift</label>
            <select
                name="eligibility"
                required
                className="flex flex mt-2 input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
              >
                <option value="" disabled>
                  Select shift for training
                </option>
                <option value="Morning">Morning Shift</option>
                <option value="Evening">Evening Shift</option>
                <option value="Both">Both Shift</option>
              </select>
              <i className="fa-solid fa-envelope absolute right-3 top-3 text-gray-500 w-full"></i>
            </div>
            </div>
            <div className="relative">
              <select
                name="eligibility"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
              >
                <option value="" disabled>
                  Select eligibility for training
                </option>
                <option value="Age:Above 6 months">Age:Above 6 months</option>
                <option value="Healthy pet">Healthy pet</option>
                <option value="Any pet">Any pet</option>
              </select>
              <i className="fa-solid fa-envelope absolute right-3 top-3 text-gray-500"></i>
            </div>
            <div className="form-control flex-1 w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  {isEdit ? "Update thumbnail" : "Upload new thumbnail"}
                </span>
              </label>
              <input
                type="file"
                ref={fileInputRef}
                className="mt-8 ml-4 input input-bordered w-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setImage(e.target.files[0])}
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
                {isEdit ? "Update" : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddTraining;