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
import ToppingsManager from './components/admin/ToppingsManager';
import FruitsManager from './components/admin/FruitsManager';
import GramajeManager from './components/admin/GramajeManager';
import ProductsManager from './components/admin/ProductsManager';
import SaucesManager from './components/admin/SaucesManager';
import PricesManager from './components/admin/PricesManager';
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
              
              <Route path="/auth/delamuu" element={<LoginView />} />

              <Route path="/admin/delamuu" element={<AdminView />} />
              <Route path="/admin/toppings" element={<ToppingsManager />} />
              <Route path="/admin/frutas" element={<FruitsManager />} />
              <Route path="/admin/gramaje" element={<GramajeManager />} />
              <Route path="/admin/productos" element={<ProductsManager />} />
              <Route path="/admin/salsas" element={<SaucesManager />} />
              <Route path="/admin/precios" element={<PricesManager />} />
            </Routes>
          </main>
        <FooterComponent />
      </Router>
    </CartProvider>
  );
}

export default App;