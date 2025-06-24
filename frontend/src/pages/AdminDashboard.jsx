import React, { useState } from 'react'
import { toast } from 'react-toastify'
function AdminDashboard() {
      const [Email,setEmail]=useState('')
  const handlesubmit=async()=>{
    const payload={
      email:Email
    }
    try{
     const res= await fetch(`http://localhost:8000/api/admin/setadmin`,{
        method:'PUT',
        credentials: "include", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      })
      if(!res.ok){
        const data=await res.json();
        toast.error(data.error);
      }
      else {
        const data=await res.json();
        toast.success("role updated successfully");
      }
    }
    catch(err){
      toast.error("server error",err.msg);
    }
  }
  return (
    <div>
      <h1>MAKE ADMIN</h1>
      <input type='email' name='email' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}></input>
      <button onClick={handlesubmit} className='bg-blue-500'>submit</button>
    </div>
  )
}

export default AdminDashboard;