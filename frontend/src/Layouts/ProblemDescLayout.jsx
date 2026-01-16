import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar.jsx"

function ProblemDescLayout() {
  return (
    <div className="h-[100dvh] flex flex-col">
      {/* Navbar = 56px */}
      <NavBar />

      {/* Remaining screen */}
      <main className="h-[calc(100dvh-56px)] overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}

export default ProblemDescLayout
