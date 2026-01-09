import './App.css'
import { BrowserRouter,Route,Router, Routes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import  Home  from './Pages/Home'
import NavBar from './components/NavBar.jsx'
import Problems from './Pages/Problems'
import ProblemDesc from './Pages/ProblemDesc'
import CreateProblem from './Pages/CreateProblem'
import EditProblem from './Pages/EditProblem'
import AdminDashboard from './Pages/AdminDashboard'
function App() {
  
console.log('hello chacha');
  return (
   <BrowserRouter>
   <Routes>
    <Route element={<MainLayout></MainLayout>}>
    <Route path='/problem' element={<Problems></Problems>}/>
    <Route path='/home'element={<Home></Home>}/>
    <Route path='/problemdesc' element={<ProblemDesc></ProblemDesc>}></Route>
    <Route path='/createproblem' element={<CreateProblem></CreateProblem>}></Route>
    <Route path='/editproblem' element={<EditProblem></EditProblem>}></Route>
    <Route path='/admindashboard' element={<AdminDashboard></AdminDashboard>}></Route>
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
