import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom';
function Submission() {
    const [data,setdata]=useState([]);
 const {id}=useParams();
    const fetchdata=async()=>{

       
        try{
        const res=await fetch(`http://localhost:8000/api/submission/${id}`,{
            method:'GET',
            credentials:'include',
        })
        if(!res.ok){
            const result=await res.json();
            console.log(result.msg);
        }
        else{
            const result=await res.json();
            console.log(result);

            setdata(result);
                toast.error('data loaded successfully');
        }
    }catch(err){
        toast.error(err.msg);
        console.log(err);
    }

    }
    useEffect(()=>{
        fetchdata();
    },[])


    
  return (
       <div style={{ padding: '20px' }}>
      <h2>My Submissions</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={cellStyle}>Time</th>
            <th style={cellStyle}>Language</th>
            <th style={cellStyle}>Verdict</th>
            <th style={cellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s, index) => (
            <tr key={s._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={cellStyle}>{new Date(s.createdAt).toLocaleString()}</td>
              <td style={cellStyle}>{s.language}</td>
              <td style={{...cellStyle ,color: s.status === "Accepted" ? "green" : "red", 
  fontWeight: "bold"} }>{s.status}</td>
              <td style={cellStyle}>
                <Link to={`/submission/code/${s._id}`}>
                  <button style={buttonStyle}>View Code</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  


  )
}
const cellStyle = {
  padding: '12px',
  textAlign: 'left',
};

const buttonStyle = {
  padding: '6px 12px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Submission