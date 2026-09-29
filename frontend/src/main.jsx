import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </AuthContextProvider>
)
