import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios'; // Correct import
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authAction } from '../Store';
function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8001/api/viv/signin`, input);
      if (response.status === 200) {
        const { userId, message } = response.data;
        alert(` ${message}`);
        console.log(`User ID: ${userId}`);
        sessionStorage.setItem("id",userId);
        dispatch(authAction.login())
        navigate("/tasks");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Sign in failed. Please try again.");
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-[#C30E59] mb-8">
          Welcome Back
        </h2>
        <form  onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C30E59] transition"
                placeholder="Enter your email"
                name="email"
                value={input.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C30E59] transition"
                placeholder="Enter your password"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#C30E59] to-[#a30e50] text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <a href="/signup" className="text-[#C30E59] font-bold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
