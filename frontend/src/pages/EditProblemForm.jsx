import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from "react-router-dom"
import {toast }from "react-toastify"
function EditProblemForm() {
   const {id}=useParams();
     const navigate=useNavigate();

    const [form,setform]=useState({
      title: "",
    description: "",
    difficulty: "Easy",
    tags: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    sampleInput: "",
    sampleOutput:"",
    testCases: []
    })



  async function fetchdata(){
   try{
    const res=await fetch(`http://localhost:8000/api/problems/${id}`);
    const data=await res.json();
    if(!res.ok)toast.error(data.msg);
      else{
        setform({...data,tags:data.tags.join(",")});
      }

    }
    catch(err){
      toast.error("failed to fetch problem");
    }
  }
  
   

    useEffect(()=>{
      fetchdata();
    },[id])

     const handlechange=(e)=>{
      setform({...form,[e.target.name]:e.target.value})
     }
     const handlefilechange=async(e)=>{
     const  file=e.target.files[0];
      if(!file)return ;
      const text=await file.text();
      try{
        const  parsed=JSON.parse(text);
        setform((prev)=>({...prev,testCases:parsed}));
      }
      catch(err){
        toast.error("invalid json file ");
      }
     };

     const downloadfile=()=>{
        const blob=new Blob([JSON.stringify(form.testCases,null,2)],{type:'application/json'})
        const url=URL.createObjectURL(blob);
        const link = document.createElement("a");
  link.href = url;
  link.download = "testcases.json";
  link.click();
  URL.revokeObjectURL(url);
     };
     

     const handlesubmit=async(e)=>{
        e.preventDefault();
        const payload={
            title: form.title,
    description:form.description,
    difficulty: form.difficulty,
    tags: form.tags,
    inputFormat: form.inputFormat,
    outputFormat:  form.outputFormat,
    constraints: form.constraints,
    sampleInput: form.sampleInput,
    sampleOutput: form.sampleOutput,

    testCases: form.testCases

        }
        try{
        const res=await fetch(`http://localhost:8000/api/problems/edit/${id}`,{
                method: "PUT",
      credentials: "include", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
        })

        if(!res.ok){
          const data=await res.json()
          toast.error(data.msg);
        }
        else{
          const data=await res.json();
          toast.success("problem edited successfully: ",data.msg);
          navigate('/problems')
        }
      }
      catch(err){
        toast.error(err);
      }


     }

  
  
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
      <textarea name="sampleInput" value={form.sampleInput} onChange={handlechange} placeholder="Sample Input" className="w-full border px-3 py-2 rounded" required />
      <textarea name="sampleOutput" value={form.sampleOutput} onChange={handlechange} placeholder="Sample Output" className="w-full border px-3 py-2 rounded" required />

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
<button type='submit' onClick={handlesubmit} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">Edit problem </button>
    </form>
  );
};




export default EditProblemForm 