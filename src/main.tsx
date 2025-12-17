import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MDayApp } from './MDayApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MDayApp />
  </StrictMode>,
)
