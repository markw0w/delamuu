import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from "./utils/ScrollToTop.js";
import HeaderComponent from './components/HeaderComponent.js';
import FooterComponent from './components/FooterComponent.js';
import Cart from "./utils/Cart.js";
import HomeView from './views/HomeView.js';
import OrderView from './views/OrderView.js';
import AdminView from './views/AdminView.js';
import LoginView from './views/LoginView.js';
import BriefcaseView from './views/BriefcaseView.js';
import ProtectedRoute from "./routes/ProtectedRoutes.js";
import ToppingsManager from './components/admin/ToppingsManager.js';
import FruitsManager from './components/admin/FruitsManager.js';
import GramajeManager from './components/admin/GramajeManager.js';
import ProductsManager from './components/admin/ProductsManager.js';
import SaucesManager from './components/admin/SaucesManager.js';
import PricesManager from './components/admin/PricesManager.js';

export default function AppRoutes() {
  const location = useLocation();
  const hideCart = ['/auth/delamuu', '/admin/delamuu'].includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <HeaderComponent />
      {!hideCart && <Cart />}

      <main>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/order/:product" element={<OrderView />} />
          <Route path="/carta" element={<BriefcaseView />} />

          <Route path="/auth/delamuu" element={<LoginView />} />
          <Route path="/admin/delamuu" element={<ProtectedRoute><AdminView /></ProtectedRoute>} />
          
          <Route path="/admin/toppings" element={<ToppingsManager />} />
          <Route path="/admin/frutas" element={<FruitsManager />} />
          <Route path="/admin/gramaje" element={<GramajeManager />} />
          <Route path="/admin/productos" element={<ProductsManager />} />
          <Route path="/admin/salsas" element={<SaucesManager />} />
          <Route path="/admin/precios" element={<PricesManager />} />
        </Routes>
      </main>

      <FooterComponent />
    </>
  );
}
