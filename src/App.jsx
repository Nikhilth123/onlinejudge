import './App.css'
import { BrowserRouter,Route,Router, Routes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import  Home  from './Pages/Home'
import NavBar from './components/NavBar.jsx'
import Problems from './Pages/Problems'
import ProblemDesc from './Pages/ProblemDesc'
function App() {
  
console.log('hello chacha');
  return (
   <BrowserRouter>
   <Routes>
    <Route element={<MainLayout></MainLayout>}>
    <Route path='/problem' element={<Problems></Problems>}/>
    <Route path='/home'element={<Home></Home>}/>
    <Route path='/problemdesc' element={<ProblemDesc></ProblemDesc>}></Route>
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
