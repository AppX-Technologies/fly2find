import React from 'react';
import { ThemeProvider } from 'react-bootstrap';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ToastContainer autoClose={1500} />
    <BrowserRouter>
      <UserProvider>
        <App />{' '}
      </UserProvider>
    </BrowserRouter>
  </ThemeProvider>
);
