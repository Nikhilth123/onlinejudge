import React, { useState } from 'react';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/setadmin`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error('Failed to update role');
      } else {
        toast.success('Admin role granted successfully');
        setEmail('');
      }
    } catch (err) {
      toast.error('Server error try again!');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-200 px-4">
      <div className="bg-yellow-100 shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Grant Admin Access</h2>

        <label className="block text-gray-600 text-sm mb-2">User Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter user email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gray-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
        >
          Make Admin
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
