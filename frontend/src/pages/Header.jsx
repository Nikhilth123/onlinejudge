import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left Section: Logo or Brand Name */}
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">OnlineJudge</Link>
      </div>

      {/* Middle Section: Navigation Links */}
      <div className="space-x-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/problems" className="hover:text-blue-600 transition">Problems</Link>
      </div>

      {/* Right Section: Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden cursor-pointer">
        <img
          src="https://i.pravatar.cc/100" 
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </nav>
  );
}
