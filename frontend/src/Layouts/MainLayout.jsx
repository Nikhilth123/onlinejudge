import {Outlet} from "react-router-dom"
import NavBar from "../components/NavBar.jsx"
import Footer from "../components/Footer.jsx"
function MainLayout(){
  return (
    <div className="h-full flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout;