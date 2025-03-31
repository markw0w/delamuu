import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/main.css" // Todo SaSS llega a main.scss quien convierte a main.css
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);