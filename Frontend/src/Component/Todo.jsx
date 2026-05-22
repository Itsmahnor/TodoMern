import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';

export const Todo = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  let id = sessionStorage.getItem("id");
  const [input, setInput] = useState({ title: "", body: "" });
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const addTodo = async (e) => {
    e.preventDefault();
    const { title, body } = input;
    if (!title || !body) {
      toast.error("Title and Body must be filled!");
      return;
    }
    try {
      if (id) {
        await axios.post(`http://localhost:8001/api/list/addtask`, {
          id,
          body: input.body,
          title: input.title,
        });
        toast.success("Task added successfully!");
        setRefresh(!refresh);
      } else {
        toast.error("Task is not saved. You must sign in first!");
      }
      setInput({ title: "", body: "" });
    } catch (error) {
      toast.error("Failed to add task. Please try again.");
    }
  };

  const deleteItem = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8001/api/list/deleteTask/${taskId}`, {
        data: { id },
      }).then((res) => console.log(res.data));
      toast.success("Task deleted successfully!");
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const updateItem = (index, id) => {
    navigate("/update", { state: { todo: todos[id], index } });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:8001/api/list/gettask/${id}`);
        setTodos(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        toast.error("Failed to fetch tasks.");
      }
    };
    if (isLoggedIn) fetchTasks();
  }, [refresh, isLoggedIn]);

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      todo.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-pink-100 via-purple-200 to-blue-100 py-6 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-5 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-600 mb-6">
          🌟 My To-Do List 🌟
        </h1>
        <ToastContainer />
        <form onSubmit={addTodo} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Enter a title..."
            value={input.title}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-purple-300 shadow focus:outline-none focus:ring-4 focus:ring-purple-200 transition text-sm sm:text-base"
          />
          <textarea
            name="body"
            placeholder="Enter details..."
            value={input.body}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-purple-300 shadow focus:outline-none focus:ring-4 focus:ring-purple-200 transition text-sm sm:text-base"
            rows="3"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
          >
            ➕ Add To-Do
          </button>
        </form>

        {isLoggedIn && (
          <>
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-6 w-full p-3 sm:p-4 rounded-xl border-2 border-purple-300 shadow focus:outline-none focus:ring-4 focus:ring-purple-200 transition text-sm sm:text-base"
            />

            {filteredTodos.length === 0 && search && (
              <p className="text-center text-gray-400 mt-6">No tasks match your search.</p>
            )}

            <div className="mt-4 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {filteredTodos.map((todo, index) => (
                <div
                  key={todo._id}
                  className="relative bg-gradient-to-r from-blue-50 via-pink-50 to-purple-50 p-4 sm:p-5 pr-16 rounded-2xl border-2 border-purple-300 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-700 break-words">{todo.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base break-words">{todo.body}</p>
                  <div className="absolute top-3 right-3 flex gap-2 sm:gap-3">
                    <FaEdit
                      className="text-purple-500 hover:text-purple-700 cursor-pointer text-lg sm:text-xl transition"
                      title="Edit"
                      onClick={() => updateItem(todo._id, index)}
                    />
                    <FaTrash
                      className="text-red-500 hover:text-red-700 cursor-pointer text-lg sm:text-xl transition"
                      title="Delete"
                      onClick={() => deleteItem(todo._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};