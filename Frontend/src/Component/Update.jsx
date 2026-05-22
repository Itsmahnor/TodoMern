import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const Update = () => {
  let id = sessionStorage.getItem("id");
  const { state } = useLocation();
  const { todo, index } = state || {};
  const [input, setInput] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state)
    if (todo) {
      setInput({ title: todo.title, body: todo.body });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8001/api/list/updatetask/${index}`,
        {
          id: id,
          title: input.title,
          body: input.body,
        }
      );
      toast.success(response.data.message || "Task updated successfully!");
      navigate("/tasks", { state: { successMessage: "Task updated successfully!" } });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-[90%] sm:w-[50%] bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-6">
          ✏️ Update Task
        </h1>
        <form onSubmit={updateTodo} className="flex flex-col gap-6">
          {/* Title Input */}
          <div>
            <label className="block text-lg font-medium text-purple-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              className="w-full p-4 rounded-xl border-2 border-purple-300 shadow focus:outline-none focus:ring-4 focus:ring-purple-200 transition"
              required
            />
          </div>

          {/* Body Textarea */}
          <div>
            <label className="block text-lg font-medium text-purple-700 mb-2">
              Details
            </label>
            <textarea
              name="body"
              value={input.body}
              onChange={handleChange}
              placeholder="Enter task details..."
              className="w-full p-4 rounded-xl border-2 border-purple-300 shadow focus:outline-none focus:ring-4 focus:ring-purple-200 transition"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-[48%] bg-gray-300 text-gray-700 font-bold py-3 rounded-xl shadow-md hover:bg-gray-400 hover:shadow-lg transition-transform"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`w-[48%] bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
