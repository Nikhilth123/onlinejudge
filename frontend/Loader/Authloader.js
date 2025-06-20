import React from "react";

export async function AuthLoader() {
    const response=await fetch("http://localhost:5000/api/user/me",{
        method: "GET",
        credentials: "include",
    });
    if(!response.ok) return null;
    const data=await response.json();
    return data.user;

}