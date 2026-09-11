import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { ServerStatusProvider } from './context/ServerStatusContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <ServerStatusProvider>
          <App />
        </ServerStatusProvider>
      </BrowserRouter>
    </AppErrorBoundary>
  </StrictMode>,
);
