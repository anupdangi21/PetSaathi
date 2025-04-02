import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddService = () => {
  const [services, setServices] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [experience, setExperience]= useState("")
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user_data"));
    if (!storedUserData?.user?.email || !storedUserData?.user?.organizationname) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "User email not found. Please login again.",
      });
    } else {
      setUserData(storedUserData);
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!services) {
      Swal.fire({
        icon: "warning",
        title: "Service Selection Required",
        text: "Please choose a service before submitting.",
      });
      return;
    }

    try {
      const result = await axios.post("http://localhost:3000/addservice", { email: userData?.user?.email,  // Add email to payload
        services: [services] , experience: experience});

      if (result.status === 200) {
        Swal.fire({
          title: "Service Extended Successfully",
          icon: "success",
          text: "Your service has been added successfully!",
        });
        setServices("");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "An error occurred while adding the service. Please try again.",
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Adding service for: {userData?.user?.username}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mt-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Extend your service!!!
          </h1>

          <div className="relative">
            <label className="font-medium ml-2">Organization name:</label>
            <input
              type="text"
              name="organizationname"
              placeholder="Name of the organization"
              required
              value={userData?.user?.organizationname}
              readOnly // ⬅ Prevent user from modifying it
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
            />
          </div>

          <div className="relative">
            <label className="ml-2 font-medium">
              Service you already had: {userData?.user?.services}
            </label>
            <select
              name="service"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
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

          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-28 w-20 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
