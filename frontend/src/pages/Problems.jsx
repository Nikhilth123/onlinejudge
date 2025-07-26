import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Authcontext from '../../context/Authcontext';

function Problems() {
  const {user}=useContext(Authcontext);
  const navigate=useNavigate()
  const [problemData, setProblemData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [page,setPage]=useState(1);
  const [totalpages,settotalpages]=useState(1);

  const handledeleteproblem=async(problemid)=>{
    try{
      const res=await fetch(`${import.meta.env.VITE_BASE_URL}/api/problems/delete/${problemid}`,{
        method:'DELETE',
        credentials:'include'
      })
      if(!res.ok){
        const result=await res.json();
       
        toast.error('problem not deleted successfully')
      }
      else{
         const result=await res.json();
         toast.success('problem deleted successfully');
         navigate('/problems')

      }
    }
    catch(err){
     
      toast.error('server error try again');
    }

  }

  const fetchProblem = async () => {

    

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/problems?page=${page}&limit=5&search=${searchTerm}&difficulty=${difficultyFilter}`);
      if (!res.ok) throw new Error("Failed to fetch problems");
      const data = await res.json();
      setProblemData(data.problems);
      settotalpages(data.totalpages);
     
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  useEffect(() => {
    fetchProblem();
  }, [page,searchTerm,difficultyFilter]);

  

  return (
    <div className="p-4 w-4xl mx-auto flex-col items-center justify-center flex-grow ">
      <h2 className="text-2xl font-bold mb-6">All Problems</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 ">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-1/2"
        />

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-1/3"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      
    {problemData.map((problem) => (
  <div
    key={problem._id}
    className="flex items-center justify-between bg-gray-100 hover:bg-gray-700  hover:text-white text-gray-800 px-4 py-3 rounded-md mb-3 transition duration-200 "
  >
    <Link to={`/problems/${problem._id}`} className="flex-grow text-left">
      {problem.title}
    </Link>

   {user&&user.role=='admin'&&(
    <button
      onClick={() => navigate(`/problems/edit/${problem._id}`)}
      className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Edit
    </button>
   )}
    {user&&user.role=='admin'&&(
    <button
      onClick={()=>handledeleteproblem(problem._id)}
      className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Delete
    </button>
   )}
    
  </div>
))}


      <div className="flex justify-center gap-2 mt-4">
  <button
    onClick={() => setPage((p) => Math.max(p - 1, 1))}
    disabled={page === 1}
    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
  >
    Prev
  </button>
  <span className="px-3 py-1 bg-gray-100 rounded">Page {page}</span>
  <button
    onClick={() => setPage((p) => Math.min(p + 1, totalpages))}
    disabled={page === totalpages}
    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

    </div>
  );
}

export default Problems;
