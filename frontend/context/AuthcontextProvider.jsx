import React from "react";
import Authcontext from './Authcontext'
import {useState } from "react";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <Authcontext.Provider value={{ user, setUser}}>
      {children}
    </Authcontext.Provider>
  );
};