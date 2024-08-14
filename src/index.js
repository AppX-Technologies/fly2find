import React from 'react';
import { ThemeProvider } from 'react-bootstrap';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ToastContainer autoClose={1500} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
