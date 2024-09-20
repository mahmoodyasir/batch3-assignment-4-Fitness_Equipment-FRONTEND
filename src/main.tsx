import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StyledEngineProvider } from "@mui/material";
import { GlobalStateProvider } from './state/Provider.tsx';

createRoot(document.getElementById('root')!).render(
  <GlobalStateProvider>
    <StrictMode>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </StrictMode>
  </GlobalStateProvider>

)
