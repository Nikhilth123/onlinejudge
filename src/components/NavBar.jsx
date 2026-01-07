import { Link } from "react-router-dom"
import { ChevronDown, Menu } from "lucide-react"

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

function Navbar() {
  // TEMP AUTH STATE (replace with Context later)
  const isLoggedIn = true
  const isAdmin = true

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <nav className="mx-auto max-w-6xl h-14 px-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="font-bold text-lg tracking-tight">
          OnlineJudge
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>

          <Button variant="ghost" asChild>
            <Link to="/problems">Problems</Link>
          </Button>

          {isAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Admin
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to="/createproblem">Create Problem</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/editproblem">Edit Problems</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/admindashboard">Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-6 text-lg font-medium">
                  <Link to="/">Home</Link>
                  <Link to="/problems">Problems</Link>

                  {isAdmin && (
                    <>
                      <Link to="/createproblem">Create Problem</Link>
                      <Link to="/editproblem">Edit Problems</Link>
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
                      <Link to="/profile">Profile</Link>
                      <Link to="/submissions">My Submissions</Link>
                      <button className="text-left text-red-500">
                        Logout
                      </button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* DESKTOP USER DROPDOWN */}
          {!isLoggedIn ? (
            <div className="hidden md:flex items-center gap-2">
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
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/submissions">My Submissions</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="text-red-500">
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
