import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8001/api/viv/register`, input);
      alert(response.data.message || "Registration successful!");
      setInput({ name: "", email: "", password: "" });
      navigate("/signin");
    } catch (error) {
      console.error(error);
      alert("Error occurred during registration.");
    }
  };

  return (
    // CHANGED: px-4 py-8 so card doesn't bleed on small screens
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-pink-100 px-4 py-8">
      {/* CHANGED: w-full + max-w-md; p-6 on mobile, p-10 on sm+ */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#C30E59] mb-6 sm:mb-8">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400 text-sm" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C30E59] transition text-sm sm:text-base"
                placeholder="Enter your name"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400 text-sm" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C30E59] transition text-sm sm:text-base"
                placeholder="Enter your email"
                name="email"
                value={input.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-6 sm:mb-8">
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400 text-sm" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C30E59] transition text-sm sm:text-base"
                placeholder="Enter your password"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#C30E59] to-[#a30e50] text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition text-sm sm:text-base"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
          Already have an account?{' '}
          <a href="/signin" className="text-[#C30E59] font-bold hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;