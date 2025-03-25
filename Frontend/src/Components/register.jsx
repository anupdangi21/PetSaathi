import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegistrationImage from "../Images/user-registration.jpeg";
import Swal from 'sweetalert2';

const RegisterForm = () => { 
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [number, setNumber] = useState(''); 
    
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/register', { email, username, password, number }, { withCredentials: true });
      console.log(result);
      if (result.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registration Complete",
          text: "Please login using your username and password.",
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Please check your db connection');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Image Section */}
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <img src={RegistrationImage} alt="Registration" className="w-50 rounded-lg h-auto object-cover" />
      </div>

      {/* Form Section */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Register here</h1>

          <div className="relative">
           <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter your valid email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fa-solid fa-envelope absolute right-3 top-3 text-gray-400"></i>
          </div>
          <div className="relative">
           <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter your contact number:
            </label>
            <input
              type="text"
              name="email"
              placeholder="Contact number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setNumber(e.target.value)}
            />
            <i className="fa-solid fa-envelope absolute right-3 top-3 text-gray-400"></i>
          </div>

          <div className="relative mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter your username
            </label>
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

          <div className="relative mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Set your password
            </label>
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

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate('/')}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;