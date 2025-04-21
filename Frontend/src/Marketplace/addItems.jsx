import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Footer from "../Components/foot";
import Image1 from "../Images/additemmarket.jpeg";
import Image2 from "../Images/additemmarket1.jpeg";
import Image3 from "../Images/additemmarket2.png";
import Swal from 'sweetalert2';
import axios from 'axios';

const AddItems = () => {
  const images = [Image1, Image2, Image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const isEdit = state?.isEdit;
  const itemData = state?.itemData;

  // State variables
  const [itemtype, setItemtype] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [address, setAddress] = useState('')
  const [usedtime, setUsedtime] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);

  // Pre-fill form for edit mode
  useEffect(() => {
    if (isEdit && itemData) {
      setItemtype(itemData.itemtype || "");
      setCategory(itemData.category || "");
      setCondition(itemData.condition || "");
      setUsedtime(itemData.usedtime || "");
      setPrice(itemData.price || "");
      setDescription(itemData.description || "");
      setExistingImages(itemData.Image || []);
    }
  }, [isEdit, itemData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem('user_data'));
    if (!userData?.user?.email) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please login to continue",
      });
      navigate('/');
      return;
    }

    const formData = new FormData();
    formData.append('itemtype', itemtype);
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('usedtime', usedtime);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('sellername', userData.user.username);
    formData.append('sellercontact', userData.user.number);
    formData.append('selleremail', userData.user.email);
    formData.append('selleraddress', address);

    // Append existing images if in edit mode
    if (isEdit) {
      formData.append('existingImages', JSON.stringify(existingImages));
    }

    // Append new files
    selectedFiles.forEach((file) => {
      formData.append("Image", file);
    });

    try {
      const url = isEdit 
        ? `http://localhost:3000/marketplacelisting/${itemData._id}`
        : 'http://localhost:3000/marketplacelisting';

      const method = isEdit ? 'put' : 'post';
      
      const result = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          title: isEdit ? "Item Updated" : "Item Listed",
          text: isEdit 
            ? "Item updated successfully" 
            : "Item listed successfully",
        });

        if (!isEdit) {
          resetForm();
        }
        navigate("/marketplace");
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "An error occurred",
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setItemtype("");
    setCategory("");
    setCondition("");
    setUsedtime("");
    setPrice("");
    setDescription("");
    setExistingImages([]);
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle new image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files) {
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  // Remove existing image
  const handleRemoveExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  // Remove new image
  const handleRemoveNewImage = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header>
        <Navbar />
      </header>

      <main className="flex flex-col lg:flex-row mx-16 px-2 py-6 gap-6">
        {/* Back Button (Mobile) */}
        <div className="w-full lg:hidden mb-4">
          <button 
            onClick={() => navigate('/marketplace')}
            className="flex items-center text-orange-500 hover:text-orange-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Marketplace
          </button>
        </div>

        {/* Left Image Slider */}
        <div className="w-full lg:w-[55%] overflow-hidden rounded-xl shadow-lg relative">
          <button 
            onClick={() => navigate('/marketplace')}
            className="absolute top-4 left-4 z-10 hidden lg:flex items-center bg-white bg-opacity-80 px-3 py-1 rounded-lg text-orange-500 hover:text-orange-600 transition shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <img
            src={images[currentImageIndex]}
            alt="Slideshow"
            className="w-full h-[650px] object-cover transition duration-500 ease-in-out rounded-xl"
          />
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-[45%] bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center lg:text-left">
            {isEdit ? "Edit Item Listing" : "Add Marketplace Item"}
          </h2>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">Item Type</label>
                <input 
                  type="text" 
                  value={itemtype}
                  onChange={(e) => setItemtype(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" 
                  placeholder="e.g., Pet Accessory" 
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                  required
                >
                  <option value="">Select</option>
                  <option value="Bowl">Bowl</option>
                  <option value="Belt">Belt</option>
                  <option value="Toys">Toys</option>
                  <option value="Grooming stuffs">Grooming stuffs</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">Item Condition</label>
                <input 
                  type="text" 
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" 
                  placeholder="e.g., New, Used" 
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block mb-1 text-sm font-medium text-gray-700">Item Used Time</label>
                <input 
                  type="text" 
                  value={usedtime}
                  onChange={(e) => setUsedtime(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" 
                  placeholder="e.g., 5-6 months" 
                  required
                />
              </div>
            </div>
            <div className='flex items-center gap-4'>
            <div className='w-full sm:w-1/2'>
              <label className="block mb-1 text-sm font-medium text-gray-700">Price (NPR)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" 
                placeholder="e.g., 500" 
                required
              />
            </div>
            <div className='w-full sm:w-1/2'>
              <label className="block mb-1 text-sm font-medium text-gray-700">Location</label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" 
                placeholder="e.g., Kaushaltar, bhaktapur" 
                required
              />
            </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea 
                rows="4" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300" 
                placeholder="Write a short description..." 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="mt-2 block w-full text-sm"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              {(existingImages.length > 0 || selectedFiles.length > 0) && (
                <p className="text-sm text-gray-600 mt-2">
                  {existingImages.length} existing image(s) - {selectedFiles.length} new image(s) selected
                </p>
              )}
            </div>

            {(existingImages.length > 0 || selectedFiles.length > 0) && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {/* Existing images */}
                {existingImages.map((imageUrl, index) => (
                  <div key={`existing-${index}`} className="relative border rounded-lg overflow-hidden group">
                    <img
                      src={imageUrl}
                      alt={`Existing preview ${index}`}
                      className="h-32 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 text-xs hover:bg-opacity-80 transition"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* New images */}
                {selectedFiles.map((file, index) => (
                  <div key={`new-${index}`} className="relative border rounded-lg overflow-hidden group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="h-32 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 text-xs hover:bg-opacity-80 transition"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition font-medium"
            >
              {isEdit ? "Update Item" : "Submit Item"}
            </button>
          </form>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AddItems;