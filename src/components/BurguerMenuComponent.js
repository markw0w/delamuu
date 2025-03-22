import React from "react";
import { logos } from "../utils/Images";
import { Link } from "react-router-dom";

function MenuBurguer({ isOpen }) {
  return (
    <section
      className={`base-burguerMenuContainer ${isOpen ? "open" : "close"}`}
    >
      <ul>
        <li>
          <Link
            className="navLinks"
            to="/"
          >
            Inicio
          </Link>
        </li>

        <li>
          <Link
            className="navLinks"
            to="/"
          >
            Nosotros
          </Link>
        </li>

        <li>
          <Link
            className="navLinks"
            to="/"
          >
            Hacer pedido
          </Link>
        </li>
        <img
          src={logos.shortDark}
          alt="Logo Delamuu"
        />
      </ul>
      <span>Web creada por Marcos Escandar</span>
    </section>
  );
}

export default MenuBurguer;
