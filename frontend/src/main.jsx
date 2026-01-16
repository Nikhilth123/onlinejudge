import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '../src/Context/AuthcontextProvider'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <ThemeProvider
      attribute="class"   
      defaultTheme="system"
      enableSystem
    >
    
    <App />
    
    </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
