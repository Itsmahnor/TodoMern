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
        setRefresh(!refresh); // Trigger re-fetch
      } else {
        toast.error("Task is not saved. You must sign in first!");
      }

      setInput({ title: "", body: "" });
    } catch (error) {
      toast.error("Failed to add task. Please try again.");
    }
  };
console.log("todo is", todos);
  const deleteItem = async (taskId) => { // Renamed Cardid to taskId for clarity
    try {
      await axios.delete(`http://localhost:8001/api/list/deleteTask/${taskId}`, {
        data: { id: id }, // User ID
      }).then((res)=>console.log(res.data));
      toast.success("Task deleted successfully!");
      setRefresh(!refresh); // Trigger re-fetch
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete task. Please try again.");
    }
  };
  
  

  const updateItem = (index,id) => {
    navigate("/update", { state: { todo: todos[id], index } });
  };

  // Fetch tasks
  useEffect(() => {
   
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:8001/api/list/gettask/${id}`);
       setTodos(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        toast.error("Failed to fetch tasks.");
      }
    };
    {isLoggedIn&&  fetchTasks();}
  }, [refresh, isLoggedIn]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-pink-100 via-purple-200 to-blue-100 py-10">
      <div className="w-[90%] sm:w-[60%] bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-6">
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
            className="w-full p-4 rounded-xl border-2 border-purple-300 shadow focus:outline-none focus:ring-4 focus:ring-purple-200 transition"
          />
          <textarea
            name="body"
            placeholder="Enter details..."
            value={input.body}
            onChange={handleChange}
            className="w-full p-4 rounded-xl border-2 border-purple-300 shadow focus:outline-none focus:ring-4 focus:ring-purple-200 transition"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform"
          >
            ➕ Add To-Do
          </button>
        </form>
{isLoggedIn&&
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {todos.map((todo, index) => (
            <div
              key={todo._id} 
              className="relative bg-gradient-to-r from-blue-50 via-pink-50 to-purple-50 p-5 rounded-2xl border-2 border-purple-300 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-purple-700">{todo.title}</h3>
              <p className="text-gray-600 mt-2">{todo.body}</p>

              <div className="absolute top-3 right-3 flex gap-3">
                <FaEdit
                  className="text-purple-500 hover:text-purple-700 cursor-pointer text-xl transition"
                  title="Edit"
                  onClick={() => updateItem(todo._id,index)}
                />
                <FaTrash
                  className="text-red-500 hover:text-red-700 cursor-pointer text-xl transition"
                  title="Delete"
                  onClick={() => deleteItem(todo._id)}
                />
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};
