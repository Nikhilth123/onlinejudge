import React, { useState, useContext, useEffect } from "react";
import Authcontext from "../../context/Authcontext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  
const [user,setuser]=useState(null);
  const [solvedproblem, setsolvedproblem] = useState([]);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
const {loading}=useContext(Authcontext)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };
const fetchdata=async()=>{
 try{
    const res=await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/me`,{
      method: "GET",
      credentials: "include", 
    })
    if(res.ok){
      const data=await res.json();
     
      setuser(data.user);

    } 
    else setuser(null);
  }
  catch(err){
    setuser(null);
  }
}
  const uploadProfilePic = async () => {
    if (!selectedFile) {
      toast.error("No image selected.");
      return;
    }

    const form = new FormData();
    form.append("profilepic", selectedFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/profile/picture`, {
        method: "POST",
        credentials: "include",
        body: form,
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Profile picture not uploaded. Try again.");
      } else {
        toast.success("Profile picture uploaded successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error. Try again later.");
    }
  };

  const fetchsolvedproblem = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/solvedproblems`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const result = await res.json();
        setsolvedproblem(result.solvedProblems);
       
      } else {
        const result = await res.json();
        toast.error(result.msg || "Could not fetch solved problems.");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchsolvedproblem();
    fetchdata();
  }, []);

  if (loading) return <div className="text-center mt-10 flex-grow">Loading...</div>;
  if (!user) return <div className="text-center mt-10 flex-grow">Please log in</div>;

  return (
    <div className="flex-grow bg-gray-100 flex flex-col py-6 items-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] md:w-[70%] flex flex-col md:flex-row items-center md:items-start gap-6">
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={preview || user.profilepic || "/default_img.jpg"}
            alt="Profile"
            className="w-48 h-48 object-cover rounded-xl border-2"
          />

          <label className="mt-3 bg-indigo-500 text-white px-3 py-1 rounded cursor-pointer text-sm">
            Change
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <button
            onClick={uploadProfilePic}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Upload
          </button>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col justify-center text-center md:text-left w-full">
          <h1 className="text-3xl font-bold mb-4">Hello {user.name}</h1>
          <h2 className="text-gray-700 text-xl mb-2">Total Questions: {user.totalQuestions}</h2>
          <p className="text-green-600 text-xl">Solved Questions: {solvedproblem.length}</p>
        </div>
      </div>

      {/* Solved Problems */}
      <div className="w-[90%] md:w-[70%] mt-8">
        {solvedproblem.length > 0 ? (
          <>
            <h1 className="text-xl font-bold text-green-600 mb-4">Solved Problems</h1>
            {solvedproblem.map((problem) => (
              <div
                key={problem._id}
                className="flex items-center justify-between bg-gray-200 hover:bg-gray-700 hover:text-white px-4 py-3 rounded-md mb-3 transition duration-200"
              >
                <Link to={`/problems/${problem._id}`} className="w-full text-left">
                  {problem.title}
                </Link>
              </div>
            ))}
          </>
        ) : (
          <h1 className="text-xl text-center mt-4">No problems solved yet.</h1>
        )}
      </div>
    </div>
  );
}
