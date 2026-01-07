import { Link } from "react-router-dom"
import { Github } from "lucide-react"

function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        
        {/* Left */}
        <span>
          © {new Date().getFullYear()} Online Judge
        </span>

        {/* Center */}
        <div className="flex gap-4">
          <Link to="/problems" className="hover:text-foreground">
            Problems
          </Link>
          <Link to="/profile" className="hover:text-foreground">
            Profile
          </Link>
        </div>

        {/* Right */}
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>

      </div>
    </footer>
  )
}

export default Footer
