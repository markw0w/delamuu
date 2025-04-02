import React from "react";
import { logos } from "../utils/Images.js";
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
            to="/carta"
          >
            Nuestra carta
          </Link>
        </li>
        <img
          src={logos.shortDark}
          alt="Logo Delamuu"
        />
      </ul>
      <span>Web creada por <Link className="socialLink" to="https://www.linkedin.com/in/marcos-damian-escandar-6b5a57196/">Marcos Escandar</Link> & <Link className="socialLink" to="https://www.linkedin.com/in/estanislaosprevite/">Estanis Salinas</Link></span>
    </section>
  );
}

export default MenuBurguer;
