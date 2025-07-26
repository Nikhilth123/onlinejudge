import React, { useContext } from 'react';
import Authcontext from '../../context/Authcontext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { user } = useContext(Authcontext); 

  return (
    <div className="flex-grow bg-gray-100 flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Welcome, {user?.name || 'User'} 
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Practice coding problems and become better every day.
      </p>
      <Link
        to="/problems"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium"
      >
        View Problems
      </Link>
    </div>
  );
}
