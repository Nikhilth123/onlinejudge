import {Outlet} from "react-router-dom"
import NavBar from "../components/NavBar.jsx"
import Footer from "../components/Footer.jsx"
function MainLayout(){
    return(
    <div  className="min-h-screen flex flex-col">
    <NavBar></NavBar>
    <main className="flex-1">
        <Outlet></Outlet>
    </main>
    <Footer></Footer>
    </div>
    )
}
export default MainLayout;