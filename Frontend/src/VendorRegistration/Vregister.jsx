import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image1 from "../Images/vendor-register.jpeg"
import Navbar from "../Components/Navbar"

const Vregister = () => {

  const [organizationname, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [username,setUsername]=useState('')
  const [service, setService]=useState('')
    const [password, setPassword] = useState(''); 
    
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3000/registration', { organizationname,email,username, password });
            console.log(result);
            if (result.status === 200) {
              alert('Registration success.');
              navigate('/dashboard')
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Please check your db connection');
        }
    };
  return (
    
    <div className="flex mt-6 ml-8" >
      <img src={Image1} className='w-45'></img>
    <div className="bg-white shadow-md rounded-lg min-h-[40vh] w-full max-w-md mx-auto flex justify-end">
    
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mt-2 " >
      
      <form onSubmit={handleSubmit} className="space-y-6 ">
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
            type="service"
            name="service"
            placeholder="enter your service"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setService(e.target.value)}
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
        
      </form>
      
    </div>
  </div>
  </div>
);

};
export default Vregister
