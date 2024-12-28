import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from './providers/ClerkProvider';
import { Router } from './router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider>
      <Router />
    </ClerkProvider>
  </StrictMode>
);