import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { BankProvider } from './context/BankContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BankProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </BankProvider>
  </StrictMode>,
)
