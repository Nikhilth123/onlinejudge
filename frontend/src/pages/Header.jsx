import React, { useContext } from 'react'
import { Link,NavLink,useNavigate } from 'react-router-dom';
import Authcontext from '../../context/Authcontext';
import {toast} from "react-toastify"
import { clearCodeDrafts } from '../../utils/clearcodedraft';
import { clearlanguage } from '../../utils/clearlanguage';
function Header() {
    
    const {user,setUser,loading}=useContext(Authcontext);
    const navigate=useNavigate();
   
    const handlelogout=async()=>{
        clearCodeDrafts();
        clearlanguage();
      try{
        const res= await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/logout`,{
             method: "POST",
      credentials: "include", 
            })
            const data=await res.json();
          
            if(res.ok){
                toast.success("loggout successfully");
                setUser(null);
                navigate('/');
            }
            else{
                toast.error("logout failed"+ data.msg);
            }
        }catch(err){
            toast.error("Network Error" + err.message);
        }

    }


    
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center font -bold">ONLINE JUDGE
                    </Link>
                    {!user ?(
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/login"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                         <Link
                            to="/signup"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            signup
                        </Link>
                    </div>):(

                     <div className="flex items-center lg:order-2">
                        <button
                           onClick={handlelogout}
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Logout
                        </button>

                        <Link to={`/profile/${user.id}`} className="flex items-center">
            <img
              src={user.profilepic || "/default_img.jpg"}
              alt="profile"
              className="w-10 h-10 object-cover rounded-full border-2"
            />
          </Link>

                    </div>
                    )}

                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to={"/"}
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700":"text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                             <li>
                                <NavLink
                                to={"/problems"}
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700":"text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Problems
                                </NavLink>
                            </li>

                            {user&&
                                      <li>
                                <NavLink
                                to={`/profile/${user?._id}`}
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700":"text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Profile
                                </NavLink>
                            </li>
                        }

                            {user&&user.role=='admin'&&(
                             <li>
                                <NavLink
                                to={"/addproblem"}
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700":"text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    ADDPROBLEM
                                </NavLink>
                            </li>
                            )}
                                 {user&&user.role=='admin'&&(
                             <li>
                                <NavLink
                                to={"/admin/dashboard"}
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700":"text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    ADMIN DASHBOARD
                                </NavLink>
                            </li>
                            )}
                           
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header