import React from 'react';

const UserProfile = ({ user }) => {
  const solved = user?.questionsSolved;
  const total = user?.totalQuestions;
  const solvedPercent = Math.min((solved / total) * 100, 100);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-md flex flex-row gap-8">
      {/* Left - Profile Picture */}
      <div className="w-1/3 bg-gray-100 rounded-xl p-4 flex justify-center items-start">
        <img
          src={user?.profilePic || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-xl object-cover border"
        />
      </div>

      {/* Right - Stats */}
      <div className="w-2/3 grid grid-cols-2 gap-6">
        {/* Question Solved - Circle */}
        <div className="flex flex-col items-center justify-center bg-green-100 rounded-xl p-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-300"
                stroke="currentColor"
                strokeWidth="3.8"
                fill="none"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-green-600"
                stroke="currentColor"
                strokeWidth="3.8"
                strokeDasharray={`${solvedPercent}, 100`}
                fill="none"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-center text-green-700 font-semibold">
              {solved} Solved
            </div>
          </div>
        </div>

        {/* Total Questions - Square Box */}
        <div className="flex flex-col items-center justify-center bg-blue-100 rounded-xl p-6">
          <div className="w-24 h-24 bg-blue-300 rounded-lg flex items-center justify-center text-white text-xl font-bold">
            {total}
          </div>
          <p className="mt-2 text-blue-700 font-medium">Total Questions</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
