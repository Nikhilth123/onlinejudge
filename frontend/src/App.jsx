import './App.css'
import { BrowserRouter,Route,Router, Routes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import  Home  from './Pages/Home'
import Problems from './Pages/Problems'
import CreateProblem from './Pages/CreateProblem'
import EditProblem from './Pages/EditProblem'
import AdminDashboard from './Pages/AdminDashboard'
import ProblemDesc2 from './Pages/ProblemDesc2'
import  Drag from './Pages/Drag'
import UserProfile from './Pages/UserProfile'
import { Toaster } from './components/ui/toaster'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ProblemDescLayout from './Layouts/ProblemDescLayout'
import { ToastContainer } from 'react-toastify';
function App() {
  
console.log('hello chacha');
  return (
   <BrowserRouter>
   <Routes>
    <Route element={<MainLayout></MainLayout>}>
    <Route path='/' element={<Home></Home>}/>
    <Route path='/problems' element={<Problems></Problems>}/>
    <Route path='/home'element={<Home></Home>}/>
    
    <Route path='/createproblem' element={<CreateProblem></CreateProblem>}></Route>
    <Route path='problem/edit/:id' element={<EditProblem></EditProblem>}></Route>
    <Route path='/admindashboard' element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path='/drag' element={<Drag></Drag>}></Route>
        <Route path='/profile' element={<UserProfile></UserProfile>}></Route>
    </Route>
    <Route element={<ProblemDescLayout></ProblemDescLayout>}>
        <Route path='/problems/:id' element={<ProblemDesc2></ProblemDesc2>}></Route>
    </Route>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/signup' element={<Signup></Signup>}></Route>
   </Routes>
       <ToastContainer />
   </BrowserRouter>
  )
}

export default App
