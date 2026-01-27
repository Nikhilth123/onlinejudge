import './App.css'
import { BrowserRouter,Route,Router, Routes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import  Home  from './pages/Home'
import Problems from './pages/Problems'
import CreateProblem from './pages/CreateProblem'
import EditProblem from './pages/EditProblem'
import AdminDashboard from './pages/AdminDashboard'
import ProblemDesc2 from './pages/ProblemDesc2'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProblemDescLayout from './Layouts/ProblemDescLayout'

function App() {
  
  return (
   <BrowserRouter>
   <Routes>
    <Route element={<MainLayout></MainLayout>}>
    <Route path='/' element={<Home></Home>}/>
    <Route path='/problems' element={<Problems></Problems>}/> 
    <Route path='/createproblem' element={<CreateProblem></CreateProblem>}></Route>
    <Route path='problem/edit/:id' element={<EditProblem></EditProblem>}></Route>
    <Route path='/admindashboard' element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path='/profile/:id' element={<UserProfile></UserProfile>}></Route>
    </Route>
    <Route element={<ProblemDescLayout></ProblemDescLayout>}>
        <Route path='/problems/:id' element={<ProblemDesc2></ProblemDesc2>}></Route>
    </Route>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/signup' element={<Signup></Signup>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
