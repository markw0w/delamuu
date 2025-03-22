import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from "./utils/CartContext";
import HomeView from './views/HomeView';
import OrderView from './views/OrderView';
import AdminView from './views/AdminView';
import LoginView from './views/LoginView';
import ScrollToTop from "./utils/ScrollToTop";
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import Cart from "./utils/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop/>
        <HeaderComponent />
        <Cart/>
          <main>
            <Routes id="routes">
              <Route id="route" path="/" element={<HomeView/>}/>
              <Route path="/order/:product" element={<OrderView />} />
              <Route path="/admin/delamuu" element={<AdminView />} />
              <Route path="/auth/delamuu" element={<LoginView />} />
            </Routes>
          </main>
        <FooterComponent />
      </Router>
    </CartProvider>
  );
}

export default App;