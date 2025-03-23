import React, { useState } from "react";
import ToppingsManager from "../components/admin/ToppingsManager";
import SaucesManager from "../components/admin/SaucesManager";
import FruitsManager from "../components/admin/FruitsManager";
import GramajeManager from "../components/admin/GramajeManager";
import ProductsManager from "../components/admin/ProductsManager";
import ConfigurationManager from "../components/admin/ConfigurationManager";

function AdminView() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <section className="adminContainer">
      <h1>Panel administrativo</h1>
      <span>Aquí podrás administrar todo tu inventario.</span>

      <div className="actionsContainer">
        <h2>¿Qué deseas realizar?</h2>
        <div className="flex gap-3">
          <button onClick={() => setActiveSection("toppings")}>Toppings</button>
          <button onClick={() => setActiveSection("salsas")}>Salsas</button>
          <button onClick={() => setActiveSection("frutas")}>Frutas</button>
          <button onClick={() => setActiveSection("envases")}>Gramaje</button>
          <button onClick={() => setActiveSection("productos")}>Productos</button>
          <button onClick={() => setActiveSection("configuration")}>Otro</button>
        </div>
      </div>

      <div className="adminContent mt-6">
        {activeSection === "toppings" && <ToppingsManager />}
        {activeSection === "salsas" && <SaucesManager />}
        {activeSection === "frutas" && <FruitsManager />}
        {activeSection === "envases" && <GramajeManager />}
        {activeSection === "productos" && <ProductsManager />}
        {activeSection === "configuration" && <ConfigurationManager />}
      </div>
    </section>
  );
}

export default AdminView;
