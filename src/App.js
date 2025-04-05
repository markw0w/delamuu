import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from "./utils/CartContext.js";
import AppRoutes from './AppRoutes.js'; 

function App() {
  return (
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;