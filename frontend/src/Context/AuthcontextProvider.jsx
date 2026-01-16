import React, { useEffect } from "react";
import Authcontext from './Authcontext'
import {useState } from "react";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setloading]=useState(true)
  const fetchuser=async()=>{
    try{
    const res=await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/me`,{
      method: "GET",
      credentials: "include", 
    })
    if(res.ok){
      const data=await res.json();
     
      setUser(data.user);

    } 
    else setUser(null);
  }
  catch(err){
    setUser(null);
  }
  setloading(false)
  }
  useEffect(()=>{
    fetchuser();
  },[])
  return (
    <Authcontext.Provider value={{ user, setUser,loading}}>
      {children}
    </Authcontext.Provider>
  );
};