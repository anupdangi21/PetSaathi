import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image1 from "../Images/vendor-register.jpeg";
import Swal from "sweetalert2";

const Vregister = () => {
  const [organizationname, setName] = useState(''); 
  const [services, setServices] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [experience , setExperience] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (userData?.user?.email && userData?.user?.number) {
      setEmail(userData.user.email ); 
      setNumber(userData.user.number); // Set to state
      console.log("Fetched email:", userData.user.email); 
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'http://localhost:3000/registration', 
        { organizationname, email, services, username,location, password,number,experience }, 
        { withCredentials: true }
      );
      console.log("Submission data:", { // Add this to verify
        organizationname,
        email,
        services,
        username,
        password,
        experience
      });

      if (result.status === 200) {
        Swal.fire({
          title: "Vendor Registered Successfully",
          icon: "success",
          text: "You are successfully registered to PetSaathi.",
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);

      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while registering!",
        });
      }
    }
  };

  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <div className="flex mt-6 ml-8">
      <img src={Image1} className="w-45" alt="Vendor Register" />
      <div className="bg-white shadow-md rounded-lg min-h-[40vh] w-full max-w-md mx-auto flex justify-end">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mt-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center">Join us now!!!</h1>

            <div className="relative">
              <input
                type="text"
                name="organizationname"
                placeholder="Name of the organization"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setName(e.target.value)}
              />
              <i className="fa-solid fa-user absolute right-3 top-3 text-gray-400"></i>
            </div>


            <div className="relative">
              <select
                name="service"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={services}
                onChange={(e) => setServices(e.target.value)}
              >
                <option value="" disabled>
                  Choose your service
                </option>
                <option value="Hostel">Hostel</option>
                <option value="Pet-training">Pet Training</option>
                <option value="Pet-grooming">Pet Grooming</option>
              </select>
              <i className="fa-solid fa-envelope absolute right-3 top-3 text-gray-500"></i>
            </div>
            {services === "Pet-training" && (
                <div className="form-control flex-1">
                  <label className="label">
                  <span className="label-text font-medium text-gray-700">Select Experience*</span>
                </label>
                <select
                  className="mt-4 select select-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="">Select Based on your experience</option>
                  <option value="6 Months">6 Months</option>
                  <option value="1 Year">1 Year</option>
                  <option value="1.5 Year">1.5 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="Above 2 Years">Above 2 Years</option>
                </select>
                </div>
              )}
            <div className="relative">
              <input
                type="text"
                name="Location"
                placeholder="Enter your organization location"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setLocation(e.target.value)}
              />
              <i className="fa-solid fa-user absolute right-3 top-3 text-gray-400"></i>
            </div>
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setUsername(e.target.value)}
              />
              <i className="fa-solid fa-user absolute right-3 top-3 text-gray-400"></i>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fa-solid fa-lock absolute right-3 top-3 text-gray-400"></i>
            </div>

            <div className="flex">
              <button
                onClick={handleBackButton}
                className="w-20 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Back
              </button>
              <button
                type="submit"
                className="ml-64 w-20 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Vregister;
