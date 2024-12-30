import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Regbg from "../Images/rg.png"
import Header from "../Components/Navbar"
import App from "../Main/App"

const RegisterForm = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [username,setUsername]=useState('')
    const [password, setPassword] = useState(''); 
    
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log("pug")
            const result = await axios.post('http://localhost:3000/register', { name,email,username, password });
            console.log(result);
            if (result.status === 200) {
              alert('Registration success.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Please check your db connection');
        }
    };
  return (
    <div className="bg-white shadow-md rounded-lg min-h-[40vh] w-full max-w-md mx-auto">
      
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mt-2" >
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Register here</h1>
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setName(e.target.value)}
            />
            <i className="fa-solid fa-user absolute right-3 top-3 text-gray-400"></i>
          </div>

          <div className="relative">
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
              onClick={() => navigate('/signin')}
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
