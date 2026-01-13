import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const cardHover =
  "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl"

function Home() {
  // 🔐 Replace this later with real auth state
  const user = { name: "Nikhil" } // set to null if not logged in

  const displayName = user ? user.name : "Coder"
  const fullText = `Hello ${displayName} 👋`

  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // ✨ Infinite typing animation
  useEffect(() => {
    let timeout

    if (!isDeleting && index < fullText.length) {
      // typing
      timeout = setTimeout(() => {
        setText(fullText.slice(0, index + 1))
        setIndex(index + 1)
      }, 80)
    } else if (!isDeleting && index === fullText.length) {
      // pause after typing
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 1200)
    } else if (isDeleting && index > 0) {
      // deleting
      timeout = setTimeout(() => {
        setText(fullText.slice(0, index - 1))
        setIndex(index - 1)
      }, 50)
    } else if (isDeleting && index === 0) {
      // restart typing
      setIsDeleting(false)
    }

    return () => clearTimeout(timeout)
  }, [index, isDeleting, fullText])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-14">

      {/* HERO */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight min-h-[3rem]">
          {text}
          <span className="animate-pulse">|</span>
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          A modern Online Judge to practice coding problems,
          improve problem-solving skills, and prepare for interviews.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Button asChild className="px-8">
            <Link to="/problems">Solve Problems</Link>
          </Button>

          {!user && (
            <Button variant="outline" asChild className="px-8">
              <Link to="/login">Login / Signup</Link>
            </Button>
          )}
        </div>
      </section>

      {/* ABOUT PLATFORM */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className={cardHover}>
          <CardHeader>
            <CardTitle>Practice</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Solve curated coding problems covering data structures,
            algorithms, and core computer science concepts.
          </CardContent>
        </Card>

        <Card className={cardHover}>
          <CardHeader>
            <CardTitle>Track Progress</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            View your submissions, accepted solutions,
            and problem-solving history in one place.
          </CardContent>
        </Card>

        <Card className={cardHover}>
          <CardHeader>
            <CardTitle>Stay Consistent</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Build consistency by solving problems regularly
            and improving step by step.
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Card className={cardHover}>
          <CardContent className="py-10 space-y-4">
            <h2 className="text-2xl font-semibold">
              Ready to start coding?
            </h2>
            <p className="text-muted-foreground">
              Jump into problems and begin your journey today.
            </p>
            <Button asChild className="px-10">
              <Link to="/problems">Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

    </div>
  )
}

export default Home
