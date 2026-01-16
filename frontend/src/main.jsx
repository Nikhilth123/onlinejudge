import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '../src/Context/AuthcontextProvider'
import { ToastProvider } from './components/ui/toast'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <ThemeProvider
      attribute="class"   // 🔥 THIS enables .dark
      defaultTheme="system"
      enableSystem
    >
      <ToastProvider>
    <App />
    </ToastProvider>
    </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
