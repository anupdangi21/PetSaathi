import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Aside from "../Components/aside";
import { useNavigate, useLocation } from 'react-router-dom';

const AddHostel = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const isEdit = state?.isEdit;
  const petData = state?.petData;

  // State variables
  const [accommodations, setAccommodations] = useState([]);
  const [counts, setCounts] = useState({
    Cage: "",
    "Open Space": "",
    "Private Room": "",
  });
  const [numberofdays, setNumberofdays] = useState("");
  const [pettype, setPettype] = useState("");
  const [food, setFood] = useState("");
  const [playtime, setPlaytime] = useState("");
  const [description, setDescription] = useState("");
  const [medicalsupport, setMedicalsupport] = useState("");
  const [Image, setImage] = useState(null);
  const [totalnumberofseats, setTotalnumberofseats] = useState("");
  const [petpickup, setPetpickup] = useState("");
  const [petdropoff, setPetdropoff] = useState("");
  const [petId, setPetId] = useState("");
  const fileInputRef = useRef(null);

  // Pre-fill form for edit mode
  useEffect(() => {
    if (isEdit && petData) {
      const accoms = JSON.parse(petData.accomodation);
      const initialAccommodations = accoms.map(item => item.type);
      const initialCounts = accoms.reduce((acc, item) => {
        acc[item.type] = item.count;
        return acc;
      }, {});

      setAccommodations(initialAccommodations);
      setCounts(initialCounts);
      setNumberofdays(petData.numberofdays || "");
      setPettype(petData.pettype || "");
      setFood(petData.food || "");
      setPlaytime(petData.playtime || "");
      setDescription(petData.description || "");
      setMedicalsupport(petData.medicalsupport || "");
      setTotalnumberofseats(petData.totalnumberofseats || "");
      setPetpickup(petData.petpickup || "");
      setPetdropoff(petData.petdropoff || "");
      setPetId(petData._id || "");
    }
  }, [isEdit, petData]);

  const handlebackButton = () => {
    Navigate("/dashboard/hostel");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user_data'));
    if (!userData?.user?.email && !userData?.user?.organizationname && !userData?.user?.location) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "User email not found. Please login again.",
      });
      return;
    }

    // Create structured accommodation data
    const accommodationData = accommodations.map(type => ({
      type: type,
      count: counts[type]
    }));

    const formData = new FormData();
    formData.append("organizationname", userData.user.organizationname);
    formData.append("vendorcontact", userData.user.number);
    formData.append("vendoremail", userData.user.email);
    formData.append("vendorlocation", userData.user.location);
    formData.append("accomodation", JSON.stringify(accommodationData));
    formData.append("numberofdays", numberofdays);
    formData.append("pettype", pettype);
    formData.append("food", food);
    formData.append("playtime", playtime);
    formData.append("description", description);
    formData.append("medicalsupport", medicalsupport);
    formData.append("totalnumberofseats", totalnumberofseats);
    formData.append("petpickup", petpickup);
    formData.append("petdropoff", petdropoff);

    // Only append new image if it exists
    if (Image) {
      formData.append("Image", Image);
    }

    try {
      const url = isEdit
        ? `http://localhost:3000/pethostel/${petId}`
        : 'http://localhost:3000/pethostel';

      const result = await axios({
        method: isEdit ? 'put' : 'post',
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result,"vayo ta khai?")

      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          title: isEdit ? "Service Updated" : "Service Added",
          text: isEdit
            ? "Service updated successfully"
            : "Service added to listing successfully",
        });

        if (!isEdit) {
          // Reset form for new entries
          setAccommodations([]);
          setCounts({
            Cage: "",
            "Open Space": "",
            "Private Room": "",
          });
          setNumberofdays("");
          setPettype("");
          setFood("");
          setPlaytime("");
          setDescription("");
          setMedicalsupport("");
          setTotalnumberofseats("");
          setPetpickup("");
          setPetdropoff("");
          setImage(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }

        Navigate("/dashboard/hostel");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: isEdit
          ? "Failed to update service"
          : "Failed to add service to listing",
      });
    }
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setAccommodations((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleCountChange = (event, type) => {
    setCounts({ ...counts, [type]: event.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside>
        <Aside />
      </aside>
      <main className="w-full md:w-[800px] mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isEdit ? "Edit" : "Upload A New"} <span className="text-orange-600">Hostel service</span>
        </h2>

        <div>
          <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-6">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Accommodation*</span>
                </label>

                <div className="flex gap-8 mt-2">
                  {["Cage", "Open Space", "Private Room"].map((type) => (
                    <div key={type} className="flex flex-col">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={type.toLowerCase().replace(" ", "-")}
                          value={type}
                          checked={accommodations.includes(type)}
                          onChange={handleCheckboxChange}
                          className="checkbox"
                        />
                        <label htmlFor={type.toLowerCase().replace(" ", "-")} className="ml-2">
                          {type}
                        </label>
                      </div>

                      {accommodations.includes(type) && (
                        <input
                          type="number"
                          placeholder={`No. of ${type}s`}
                          value={counts[type] || ""}
                          onChange={(event) => handleCountChange(event, type)}
                          className="mt-2 input input-bordered border border-gray-300 rounded-md w-48 h-8"
                          min="1"
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

 <div className="form-control flex-1 mt-2">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Fooding*</span>
                </label>
                <select
                  className="mt-2 select select-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                >
                  <option value="">Select fooding option</option>
                  <option value="Userchoice">User choice</option>
                  <option value="Fixed">Fixed</option>
                </select>
              </div>

            <div className="flex flex-wrap gap-6">
              {/* Categories */}
              <div className="form-control flex-1 mt-4">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Playtime*</span>
                </label>
                <select
                  className="mt-2 select select-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={playtime}
                  onChange={(e) => setPlaytime(e.target.value)}
                >
                  <option value="">Select a playtime option</option>
                  <option value="Include">Include</option>
                  <option value="Exclude">Exclude</option>
                </select>
              </div>
              <div className="form-control flex-1 mt-4">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Medical Support*</span>
                </label>
                <select
                  className="mt-2 select select-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={medicalsupport}
                  onChange={(e) => setMedicalsupport(e.target.value)}
                >
                  <option value="">Medical support available?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            

            <div className="flex flex-wrap gap-6">
<div className="form-control flex-1 mt-2">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Description*</span>
                </label>
                <textarea
                  className="mt-2 textarea textarea-bordered w-full h-[100px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={description}
                  placeholder="Add pet description here!"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
            <div className="form-control flex-1 mt-2">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Pet Pickup*</span>
                </label>
                <select
                  className="mt-2 select select-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={petpickup}
                  onChange={(e) => setPetpickup(e.target.value)}
                >
                  <option value="">Pet pickup available?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="form-control flex-1 mt-4">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Pet dropoff*</span>
                </label>
                <select
                  className="mt-2 select select-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={petdropoff}
                  onChange={(e) => setPetdropoff(e.target.value)}
                >
                  <option value="">Pet dropoff available?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            {/* Image Upload */}
            <div className="form-control flex-1 w-1/2">
              <label className="label">
                <span className="label-text font-medium text-gray-700">
                  {isEdit ? "Update thumbnail" : "Upload thumbnail"}
                </span>
              </label>
              <input
                type="file"
                ref={fileInputRef}
                className="mt-4 ml-4 input input-bordered w-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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

export default AddHostel;