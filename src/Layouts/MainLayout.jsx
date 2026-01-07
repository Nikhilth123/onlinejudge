import {Outlet} from "react-router-dom"
import NavBar from "../components/NavBar.jsx"
import Footer from "../components/Footer.jsx"
function MainLayout(){
    return(
    <div>
    <NavBar></NavBar>
    <main>
        <Outlet></Outlet>
    </main>
    <Footer></Footer>
    </div>
    )
}
export default MainLayout;