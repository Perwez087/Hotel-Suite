import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartAndFilterProvider } from './Component/context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartAndFilterProvider>
    <App />
    </CartAndFilterProvider>
  </StrictMode>,
)
