import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import './styles/global.css';
import App from './App.jsx';

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AnalyticsProvider>
          <App />
        </AnalyticsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
