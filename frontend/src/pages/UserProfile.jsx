import React, { useState } from "react";

export default function ProfilePage() {
  const [profilePic, setProfilePic] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(100); // replace with actual
  const [solvedQuestions, setSolvedQuestions] = useState(45); // replace with actual

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      // You can upload this image to backend here
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[350px] text-center">
        <div className="relative">
          <img
            src={
              profilePic ||
              "https://via.placeholder.com/150?text=No+Image"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-indigo-500"
          />
          <label className="absolute bottom-2 right-16 bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer text-sm">
            Change
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <h2 className="text-xl font-bold mt-4">Your Profile</h2>
        <div className="mt-4 space-y-2">
          <p className="text-gray-700">Total Questions: {totalQuestions}</p>
          <p className="text-green-600 font-semibold">
            Solved Questions: {solvedQuestions}
          </p>
        </div>
      </div>
    </div>
  );
}
