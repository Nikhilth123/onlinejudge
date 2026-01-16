import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import  Authcontext  from "../Context/Authcontext" // adjust path if needed
import { useToast } from "@/hooks/use-toast";

function Signup() {
  const { setUser } = useContext(Authcontext)
  const navigate = useNavigate()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    try {
      setLoading(true)

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/user/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: data.msg || "Something went wrong",
        })
        return
      }

      setUser(data.user)

      toast({
        title: "Account created 🎉",
        description: data.msg || "Welcome to the platform",
      })

      navigate("/")
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md transition-all hover:shadow-xl">

        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            Create an account
          </CardTitle>
          <CardDescription>
            Sign up to start solving coding problems
          </CardDescription>
        </CardHeader>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">

            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>

          </CardContent>
        </form>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?
          </p>
          <Button variant="link" asChild className="p-0">
            <Link to="/login">
              Login here
            </Link>
          </Button>
        </CardFooter>

      </Card>
    </div>
  )
}

export default Signup
