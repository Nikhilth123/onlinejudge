import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProblemDescription() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [leftWidth, setLeftWidth] = useState(60);
  const [showTags, setShowTags] = useState(false);
  const [language, setLanguage] = useState('cpp'); // default language
  const containerRef = useRef();

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/problems/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.msg);
      } else {
        setData(result);
        toast.success(result.msg);
      }
    } catch (err) {
      toast.error('Failed to fetch problem');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const startDragging = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);
  const handleDragging = (e) => {
    if (!isDragging || !containerRef.current) return;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const newLeftWidth = (e.clientX / containerWidth) * 100;
    if (newLeftWidth > 30 && newLeftWidth < 70) setLeftWidth(newLeftWidth);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleDragging);
    window.addEventListener('mouseup', stopDragging);
    return () => {
      window.removeEventListener('mousemove', handleDragging);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="h-screen flex" style={{ backgroundColor: '#f7f8fc' }}>
      {/* Left Section: Problem Description */}
      <div
        className="overflow-y-auto p-6"
        style={{ width: `${leftWidth}%`, backgroundColor: '#ffffff' }}
      >
        <h2 className="text-sm text-gray-500 uppercase mb-2">{data.difficulty}</h2>
        <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
        <p className="mb-4 whitespace-pre-wrap">{data.description}</p>
        <p className="mb-2 whitespace-pre-wrap"><strong>Input Format:</strong> {data.inputFormat}</p>
        <p className="mb-2 whitespace-pre-wrap"><strong>Output Format:</strong> {data.outputFormat}</p>
        <p className="mb-2 whitespace-pre-wrap"><strong>Sample Input:</strong> {data.sampleInput}</p>
        <p className="mb-2 whitespace-pre-wrap"><strong>Sample Output:</strong> {data.sampleOutput}</p>
        <p className="mb-2 whitespace-pre-wrap"><strong>Constraints:</strong> {data.constraints}</p>

        {/* Toggle Tags */}
        <div className="mt-6">
          <button
            onClick={() => setShowTags(!showTags)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {showTags ? 'Hide Tags' : 'Show Tags'}
          </button>

          {showTags && data.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div
        onMouseDown={startDragging}
        className="w-1 bg-gray-300 cursor-col-resize hover:bg-gray-500"
      />

      {/* Right Section: Code Editor */}
      <div className="flex-1 p-4 bg-gray-50 flex flex-col">
        {/* Language Dropdown */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Code Editor</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-2 py-1 border rounded bg-white"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <textarea
          className="flex-1 p-4 font-mono text-sm resize-none border rounded bg-white outline-none"
          placeholder={`Write your ${language.toUpperCase()} code here...`}
        />

        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 self-end">
          Run Code
        </button>
      </div>
    </div>
  );
}

export default ProblemDescription;
