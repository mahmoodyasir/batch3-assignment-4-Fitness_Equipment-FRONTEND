import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StyledEngineProvider } from "@mui/material";
import { GlobalStateProvider } from './state/Provider.tsx';
import { Provider } from 'react-redux';
import { store } from './Redux/app/store.ts';

createRoot(document.getElementById('root')!).render(
  <GlobalStateProvider>
    <StrictMode>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <App />
        </Provider>
      </StyledEngineProvider>
    </StrictMode>
  </GlobalStateProvider>

)
