import React, { useState } from "react";
import {toast} from "react-toastify"

const AddProblemForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    tags: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    sampleInput: "",
    sampleOutput: "",
    testCases: [{ input: "", Output: "" }]
  });

  const [testCaseMode, setTestCaseMode] = useState("manual"); // manual or file
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTestCaseChange = (index, field, value) => {
    const updated = [...form.testCases];
    updated[index][field] = value;
    setForm({ ...form, testCases: updated });
  };

  const addTestCase = () => {
    setForm({ ...form, testCases: [...form.testCases, { input: "", Output: "" }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const tagsArray = form.tags.split(",").map((tag) => tag.trim());

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("difficulty", form.difficulty);
    formData.append("tags", tagsArray.join(","));
    formData.append("sampleInput", form.sampleInput);
    formData.append("sampleOutput", form.sampleOutput);
    formData.append("inputFormat", form.inputFormat);
    formData.append("outputFormat", form.outputFormat);
    formData.append("constraints", form.constraints);

    if (testCaseMode === "file") {
      if (!file) return alert("Please upload a test case file.");
      formData.append("testCasesFile", file);
    } else {
      formData.append("testCases", JSON.stringify(form.testCases));
    }

    try {
      const res = await fetch("http://localhost:8000/api/problems/addproblem", {
        method: "POST",
        body: formData,
         credentials: "include", 
      
      });


      const data = await res.json();

      if (res.ok) {
        toast.success(" Problem added successfully!");
      } else {
        toast.error(data.msg + (data.errors ? "\n" + data.errors.join("\n") : ""));
      }
    } catch (err) {
      toast.error("Network Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-4xl mx-auto p-6 space-y-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold">Add New Problem</h2>

      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border px-3 py-2 rounded" required />

      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded" required />

      <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full border px-3 py-2 rounded">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated)" className="w-full border px-3 py-2 rounded" required />

      <textarea name="inputFormat" value={form.inputFormat} onChange={handleChange} placeholder="Input Format" className="w-full border px-3 py-2 rounded" required />
      <textarea name="outputFormat" value={form.outputFormat} onChange={handleChange} placeholder="Output Format" className="w-full border px-3 py-2 rounded" required />
      <textarea name="constraints" value={form.constraints} onChange={handleChange} placeholder="Constraints" className="w-full border px-3 py-2 rounded" required />
      <textarea name="sampleInput" value={form.sampleInput} onChange={handleChange} placeholder="Sample Input" className="w-full border px-3 py-2 rounded" required />
      <textarea name="sampleOutput" value={form.sampleOutput} onChange={handleChange} placeholder="Sample Output" className="w-full border px-3 py-2 rounded" required />

    
      <div>
        <h3 className="font-semibold">How do you want to add test cases?</h3>
        <label className="mr-4">
          <input
            type="radio"
            name="mode"
            value="manual"
            checked={testCaseMode === "manual"}
            onChange={() => setTestCaseMode("manual")}
          />{" "}
          Manual Entry
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="file"
            checked={testCaseMode === "file"}
            onChange={() => setTestCaseMode("file")}
          />{" "}
          Upload File (.json)
        </label>
      </div>

     
      {testCaseMode === "manual" && (
        <div>
          <h4 className="font-semibold">Test Cases</h4>
          {form.testCases.map((tc, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <textarea
                placeholder={`Test Case ${idx + 1} - Input`}
                value={tc.input}
                onChange={(e) => handleTestCaseChange(idx, "input", e.target.value)}
                className="border p-2 rounded"
                required
              />
              <textarea
                placeholder={`Test Case ${idx + 1} - Output`}
                value={tc.Output}
                onChange={(e) => handleTestCaseChange(idx, "Output", e.target.value)}
                className="border p-2 rounded"
                required
              />
            </div>
          ))}
          <button type="button" onClick={addTestCase} className="text-blue-600 hover:underline mt-2">
            + Add another test case
          </button>
        </div>
      )}

    
      {testCaseMode === "file" && (
        <div>
          <input
            type="file"
            accept=".json"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full"
            required
          />
        </div>
      )}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Problem
      </button>
    </form>
  );
};

export default AddProblemForm;
