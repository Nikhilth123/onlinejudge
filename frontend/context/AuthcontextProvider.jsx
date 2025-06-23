import React, { useEffect } from "react";
import Authcontext from './Authcontext'
import {useState } from "react";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const fetchuser=async()=>{
    try{
    const res=await fetch(`http://localhost:8000/api/user/me`,{
      method: "GET",
      credentials: "include", 
    })
    if(res.ok){
      const data=await res.json();
      setUser(data);

    } 
    else setUser(null);
  }
  catch(err){
    setUser(null);
  }
  }
  useEffect(()=>{
    fetchuser();
  },[])
  return (
    <Authcontext.Provider value={{ user, setUser}}>
      {children}
    </Authcontext.Provider>
  );
};