import React from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

function SignIn() {
  return (
    <section className="mt-10">
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-wrap items-center justify-center">
          {/* Right Column with Form */}
          <div className="w-full max-w-md">
            <form>
              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Remember Me and Terms */}
              <div className="mb-6 flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  Remember me
                </label>
                <a
                  href="#!"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Terms and Conditions
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition duration-200"
                >
                  <FaFacebookF />
                  Continue with Facebook
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-400 text-white font-medium rounded-lg hover:bg-blue-500 transition duration-200"
                >
                  <FaTwitter />
                  Continue with Twitter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
