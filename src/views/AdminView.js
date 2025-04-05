import React, { useState } from "react";
import ToppingsManager from "../components/admin/ToppingsManager.js";
import SaucesManager from "../components/admin/SaucesManager.js";
import FruitsManager from "../components/admin/FruitsManager.js";
import GramajeManager from "../components/admin/GramajeManager.js";
import ProductsManager from "../components/admin/ProductsManager.js";
import PricesManager from "../components/admin/PricesManager.js";
import OrdersHistory from "../components/admin/OrdersHistory.js";
import FlavorsManager from "../components/admin/FlavorsManager.js";
import BriefcaseManager from "../components/admin/BriefcaseManager.js";
import '../styles/admin.css'
import '../styles/alert.css';

function AdminView() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <section className="adminContainer">
      <h1>Panel administrativo</h1>
      <span>Aquí podrás administrar todo tu inventario.</span>

      <section className="actionsContainer">
        <h2>¿Qué deseas realizar?</h2>
        <ul className="flex gap-3">
          <button onClick={() => setActiveSection("toppings")}>Toppings</button>
          <button onClick={() => setActiveSection("salsas")}>Salsas</button>
          <button onClick={() => setActiveSection("frutas")}>Frutas</button>
          <button onClick={() => setActiveSection("envases")}>Gramaje</button>
          <button onClick={() => setActiveSection("productos")}>Productos</button>
          <button onClick={() => setActiveSection("precios")}>Precios</button>
          <button onClick={() => setActiveSection("ordenes")}>Ordenes</button>
          <button onClick={() => setActiveSection("sabores")}>Sabores</button>
          <button onClick={() => setActiveSection("carta")}>Carta</button>
        </ul>
      </section>

      <section className="adminContent mt-6">
        {activeSection === "toppings" && <ToppingsManager />}
        {activeSection === "salsas" && <SaucesManager />}
        {activeSection === "frutas" && <FruitsManager />}
        {activeSection === "envases" && <GramajeManager />}
        {activeSection === "productos" && <ProductsManager />}
        {activeSection === "precios" && <PricesManager />}
        {activeSection === "ordenes" && <OrdersHistory />}
        {activeSection === "sabores" && <FlavorsManager />}
        {activeSection === "carta" && <BriefcaseManager />}
      </section>
    </section>
  );
}

export default AdminView;
