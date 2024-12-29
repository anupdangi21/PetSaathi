import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = ({ closeModal }) => {
    const [username, setName] = useState(''); // Initialize state as empty string
    const [password, setPassword] = useState(''); // Initialize state as empty string
    const navigate = useNavigate(); // Get the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:3000/signin', { username, password });
            console.log(result);
            if (result.status === 200) {
                alert('Login success.');
            }
        } catch (error) {
            alert('Please try again with correct username and password.');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 min-h-[40vh] w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4"> 
                    <div className="relative">
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <i className="fa-solid fa-user absolute right-3 top-3 text-gray-400"></i>
                    </div>

                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className="fa-solid fa-lock absolute right-3 top-3 text-gray-400"></i>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forget Password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?
                            <a href="./register" className="text-blue-500 hover:underline" > Register</a>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signin;