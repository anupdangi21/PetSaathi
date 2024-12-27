import React from 'react';

const RegisterForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <form action="/register" method="post" className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Register here</h1>
          
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              Already have an account?
              <a href="./signin" className="text-blue-500 hover:underline"> Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
