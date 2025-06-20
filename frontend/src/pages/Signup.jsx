// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Authcontext from "../../context/Authcontext.js";
import {toast} from "react-toastify"

function Signup() {
  const { setUser } = useContext(Authcontext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    role:"user"
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const res = await fetch("http://localhost:8000/api/user/signup", {
      method: "POST",
      credentials: "include", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data);
      toast.success(data.msg);
      navigate("/"); 
    } else {
      const data = await res.json();
      toast.error(data.msg);
    }
  }
  catch(err){
    toast.error("something went wrong please try again")
  }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}


         <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border mb-6 rounded"
          required
        />
        <label htmlFor="role" className="text-bold text-xl">Select  your Role </label>
        <select  name="role" value={formData.role} onChange={handleChange} className="p-2 border mb-6 rounded">
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
        >
          signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
