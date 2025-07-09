import React from "react";
import { useState } from "react";


const AiOptionsDropdown = ({ code, error, language, onResponse }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = async (task) => {
    try {
      const res = await fetch('http://localhost:5000/api/ai/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task,
          code,
          ...(task === 'Fix Code' && { error }),
          language,
        }),
      });

      const data = await res.json();
      console.log('AI Response:', data);

      // ✅ Send response back to parent
      if (onResponse) {
        onResponse(data.result || 'No result');
      }
    } catch (err) {
      console.error('AI Error:', err);
      if (onResponse) {
        onResponse('Error talking to AI.');
      }
    }

    setIsOpen(false);
  };

  const options = ['Boilerplate', 'Explain Code', 'Fix Code', 'Optimize Code', 'Ask for Hint'];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        AI Options
        <ChevronDown size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white border rounded-md shadow-lg">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
