import { Link, NavLink, useNavigate } from "react-router-dom"
import { ChevronDown, Menu } from "lucide-react"
import { useContext } from "react"

import ThemeToggle from "./ThemeToggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet"
import Authcontext from "@/Context/Authcontext"
import { clearCodeDrafts } from "@/utils/clearcodedraft"
import { clearlanguage } from "@/utils/clearlanguage"
import {toast}from 'react-toastify'

function Navbar() {
  const { user, setUser, loading } = useContext(Authcontext)
  const navigate = useNavigate()
  if(loading)return(
    <div>Loading....</div>
  )
  
console.log("user:",user._id)
  const isLoggedIn = !!user
  const isAdmin = user?.role === "admin"

  const handleLogout = async () => {
    clearCodeDrafts()
    clearlanguage()

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/user/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      )

      const data = await res.json()

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Logout failed",
          description: data.msg || "Something went wrong",
        })
        return
      }

      setUser(null)
      toast({ title: "Logged out successfully" })
      navigate("/")
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Network error",
        description: err.message,
      })
    }
  }

  if (loading) return null

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <nav className="mx-auto max-w-6xl h-14 px-4 flex items-center justify-between">

     
        <Link to="/" className="font-bold text-lg tracking-tight">
          OnlineJudge
        </Link>

     
        <div className="hidden md:flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/problems"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            Problems
          </NavLink>

          {isAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Admin
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to="/createproblem">Create Problem</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/admindashboard">Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

         
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-6 text-lg">
                  <Link to="/">Home</Link>
                  <Link to="/problems">Problems</Link>

                  {isAdmin && (
                    <>
                      <Link to="/createproblem">Create Problem</Link>
                      <Link to="/admindashboard">Dashboard</Link>
                    </>
                  )}

                  {!isLoggedIn ? (
                    <>
                      <Link to="/login">Login</Link>
                      <Link to="/register">Register</Link>
                    </>
                  ) : (
                    <>
                      <Link to={`/profile/${user._id}`}>Profile</Link>
                      <button
                        onClick={handleLogout}
                        className="text-left text-red-500"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          
          {!isLoggedIn ? (
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          ) : (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback>
                      {user?.name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={`/profile/${user?._id}`}>Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
