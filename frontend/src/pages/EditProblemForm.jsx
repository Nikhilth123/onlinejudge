import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditProblemForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setform] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    tags: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    sampleInputOutput: [],
    testCases: []
  });

  // Fetch existing problem data
  async function fetchdata() {
    try {
      const res = await fetch(`http://localhost:8000/api/problems/${id}`);
      const data = await res.json();
      if (!res.ok) toast.error(data.msg);
      else {
        setform({ ...data, tags: data.tags.join(",") });
      }
    } catch (err) {
      toast.error("Failed to fetch problem");
    }
  }

  useEffect(() => {
    fetchdata();
  }, [id]);

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handlefilechange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      setform((prev) => ({ ...prev, testCases: parsed }));
    } catch (err) {
      toast.error("Invalid JSON file");
    }
  };

  const downloadfile = () => {
    const blob = new Blob([JSON.stringify(form.testCases, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "testcases.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSampleChange = (index, field, value) => {
    const updated = [...form.sampleInputOutput];
    updated[index][field] = value;
    setform({ ...form, sampleInputOutput: updated });
  };

  const addSampleCase = () => {
    setform({ ...form, sampleInputOutput: [...form.sampleInputOutput, { input: "", output: "" }] });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      difficulty: form.difficulty,
      tags: form.tags,
      inputFormat: form.inputFormat,
      outputFormat: form.outputFormat,
      constraints: form.constraints,
      sampleInputOutput: form.sampleInputOutput,
      testCases: form.testCases
    };

    try {
      const res = await fetch(`http://localhost:8000/api/problems/edit/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);
        navigate('/problems');
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <form onSubmit={handlesubmit} className="max-w-4xl mx-auto p-6 space-y-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold">Edit Problem</h2>

      <input name="title" value={form.title} onChange={handlechange} placeholder="Title" className="w-full border px-3 py-2 rounded" required />
      <textarea name="description" value={form.description} onChange={handlechange} placeholder="Description" className="w-full border px-3 py-2 rounded" required />
      <select name="difficulty" value={form.difficulty} onChange={handlechange} className="w-full border px-3 py-2 rounded">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <input name="tags" value={form.tags} onChange={handlechange} placeholder="Tags (comma-separated)" className="w-full border px-3 py-2 rounded" required />
      <textarea name="inputFormat" value={form.inputFormat} onChange={handlechange} placeholder="Input Format" className="w-full border px-3 py-2 rounded" required />
      <textarea name="outputFormat" value={form.outputFormat} onChange={handlechange} placeholder="Output Format" className="w-full border px-3 py-2 rounded" required />
      <textarea name="constraints" value={form.constraints} onChange={handlechange} placeholder="Constraints" className="w-full border px-3 py-2 rounded" required />

      <div>
        <h4 className="font-semibold">Sample Input/Output</h4>
        {form.sampleInputOutput.map((tc, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <textarea
              placeholder={`Sample Input ${idx + 1}`}
              value={tc.input}
              onChange={(e) => handleSampleChange(idx, "input", e.target.value)}
              className="border p-2 rounded"
              required
            />
            <textarea
              placeholder={`Sample Output ${idx + 1}`}
              value={tc.output}
              onChange={(e) => handleSampleChange(idx, "output", e.target.value)}
              className="border p-2 rounded"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addSampleCase}
          className="text-blue-600 hover:underline mt-2"
        >
          + Add another sample case
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          type="button"
          onClick={downloadfile}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Download Test Cases as JSON
        </button>

        <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition">
          Upload Test Cases JSON
          <input
            type="file"
            accept=".json"
            onChange={handlefilechange}
            className="hidden"
          />
        </label>
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
      >
        Edit Problem
      </button>
    </form>
  );
}

export default EditProblemForm;
