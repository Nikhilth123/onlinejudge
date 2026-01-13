import { Link } from "react-router-dom"
import { Github } from "lucide-react"

function Footer() {
  return (
    <footer className="border-t bg-background">
      {/* Changed w-screen to w-full. Added container & mx-auto for better centering on large screens */}
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:py-0 flex flex-col sm:flex-row items-center justify-between gap-y-4 text-sm text-muted-foreground sm:h-24">
        
        {/* Left - Copyright */}
        <span className="order-3 sm:order-1">
          © {new Date().getFullYear()} Online Judge
        </span>

        {/* Center - Navigation */}
        <div className="flex gap-6 order-1 sm:order-2">
          <Link to="/problems" className="transition-colors hover:text-foreground">
            Problems
          </Link>
          <Link to="/profile" className="transition-colors hover:text-foreground">
            Profile
          </Link>
        </div>

        {/* Right - Socials */}
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition-colors hover:text-foreground order-2 sm:order-3"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </a>

      </div>
    </footer>
  )
}

export default Footer