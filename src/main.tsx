/**
 * main.tsx
 * 
 * Application Entry Point
 * React application এর main entry point
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * Render React application
 * 
 * React.StrictMode = Development mode এ extra checks এবং warnings দেয়
 * Production build এ automatic remove হয়ে যায়
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
