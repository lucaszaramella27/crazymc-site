import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/sora';
import App from './App';
import { ServerStatusProvider } from './context/ServerStatusContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ServerStatusProvider>
      <App />
    </ServerStatusProvider>
  </StrictMode>,
);
