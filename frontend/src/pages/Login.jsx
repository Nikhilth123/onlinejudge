// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Authcontext from "../../context/Authcontext.js";
import {toast} from "react-toastify"
import {Link} from 'react-router-dom'

function Login() {
  const { setUser } = useContext(Authcontext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/login`, {
      method: "POST",
      credentials: "include", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      toast.success("LOgged in Successfully");
      navigate("/"); 
    } else {
      const data = await res.json();
     toast.error(data.msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-yellow-100 p-8 shadow rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
       

        <button
          type="submit"
          className="bg-gray-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
        >
          Login
        </button>
         <div>Don't have account <Link to='/signup' className="text-blue-600 underline">Signup</Link></div>
      </form>
    </div>
  );
}

export default Login;
