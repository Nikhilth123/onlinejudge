import React from 'react'

function Signup() {
  return (
     <div className="flex items-center justify-center">
  <form className="flex flex-col gap-4 p-4 bg-yellow-200 rounded-lg shadow-lg text-black w-80">
     <label>Name</label>
    <input type="text" className="border p-2 rounded" />
    <label>Email</label>
    <input type="email" className="border p-2 rounded" />

    <label>Password</label>
    <input type="password" className="border p-2 rounded" />

    <button type="button" className="bg-blue-500 p-2 text-white rounded-2xl hover:bg-blue-700 border-2 border-gray-300">
      Login
    </button>
  </form>
  
</div>
  )
}

export default Signup